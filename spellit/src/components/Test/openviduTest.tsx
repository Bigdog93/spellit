import { useRef, useState, useContext, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "@/store"
import OvVideo from '@/components/Test/OvVideo'
import { ExceptionEvent, OpenVidu, Publisher, Session, StreamEvent, StreamManager, Subscriber } from 'openvidu-browser';
import axios from "axios";

import React, { Component } from 'react';


export interface IProps {
    mainStreamManager: StreamManager,
    subscribers: Array<Subscriber>,
    sub: Subscriber,
}


const OpenViduVideo = () => {
    
    const openviduUrl = `http://localhost:8080/api/sessions`
    const APPLICATION_SERVER_URL = `http://localhost:8080/api/`;
    let test = 0;
    // type openviduType = {
    //     mySessionId: string,
    //     myUserName: string,
    //     session: Session | null | undefined,
    //     mainStreamManager: Publisher | undefined,  // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    //     publisher: StreamManager | undefined,
    //     subscribers: Array<StreamManager>,
    //     currentVideoDevice: any,
    // }
    let mySessionId: string = "0";
    let myUserName: string = "default" + Math.random().toString();
    let session: Session | null | undefined = undefined;
    // let mainStreamManager: Publisher | undefined = undefined;  // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    const [mainStreamManager, setMainStreamManager] = useState<Publisher | undefined>(undefined)
    let [publisher, setPublisher] = useState<StreamManager | undefined>(undefined);
    // let subscribers: Array<StreamManager> = [];
    const [subscribers, setSubscribers] = useState<Array<StreamManager>>([]);
    let currentVideoDevice: any = null;
    // let openviduState :openviduType = {
    //     mySessionId: '0',
    //     myUserName: 'Participant' + Math.floor(Math.random() * 100),
    //     session: Session.prototype,
    //     mainStreamManager: undefined,  // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    //     publisher: undefined,
    //     subscribers: [],
    //     currentVideoDevice: undefined,
    // }
    let OV :OpenVidu | null = null;
    const componentDidMount = () => {
        window.addEventListener('beforeunload', onbeforeunload);
    }

    const componentWillUnmount = () => {
        window.removeEventListener('beforeunload', onbeforeunload);
    }

    const onbeforeunload = (event :any) => {
        leaveSession();
    }

    const handleChangeSessionId = (e :any) => {
        mySessionId = e.target.value;
    }

    const handleChangeUserName = (e :any) => {
        myUserName = e.target.value;
    }

    const handleMainVideoStream = (stream :any) => {
        if (mainStreamManager !== stream) {
            // mainStreamManager = stream
            setMainStreamManager(stream);
        }
    }

    const deleteSubscriber = (streamManager :StreamManager) => {
        let tmpSubscribers = [...subscribers];
        let index = tmpSubscribers.indexOf(streamManager, 0);
        if (index > -1) {
            tmpSubscribers.splice(index, 1);
            setSubscribers(tmpSubscribers);
        }
    }

    const joinSession = async () => {
        // --- 1) Get an OpenVidu object --
        OV = new OpenVidu();
        console.log("joinSession");

        // --- 2) Init a session ---

        session = OV.initSession();
        var mySession = session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event :StreamEvent) => {
            // Subscribe to the Stream to receive it. Second parameter is undefined
            // so OpenVidu doesn't create an HTML video by its own
            var subscriber = mySession.subscribe(event.stream, undefined);
            var tmpSubscribers = [...subscribers];
            tmpSubscribers.push(subscriber);
            console.log(subscribers);
            // Update the state with the new subscribers
            setSubscribers(tmpSubscribers);
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event : StreamEvent) => {

            // Remove the stream from 'subscribers' array
            deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception :ExceptionEvent) => {
            console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        const token: string = await getToken();
        console.log("token : " + token);
        await mySession.connect(token, { clientData: myUserName });
        // --- 5) Get your own camera stream ---

        // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
        // element: we will manage it on our own) and with the desired properties
        let newPublisher = await OV?.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '0x0', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
        });
        console.log("newPublisher : ", newPublisher);

        // --- 6) Publish your stream ---
        if (!newPublisher) return;
        mySession.publish(newPublisher);

        // Obtain the current video device in use
        if (!OV) return;
        var devices = await OV.getDevices();
        var videoDevices = devices.filter(device => device.kind === 'videoinput');
        var currentVideoDeviceId = newPublisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
        // var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);
        // var currentVideoDeviceId = newPublisher.stream.getMediaStream().getAudioTracks()[0].getSettings().deviceId;
        currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

        // Set the main video in the page to display our webcam and store our Publisher
        // currentVideoDevice = currentVideoDevice;
        // mainStreamManager = newPublisher;
        setMainStreamManager(newPublisher);
        setPublisher(newPublisher);

        // getToken().then((token: string) => {
        //     console.log("token : " + token);
        //     // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
        //     // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        //     mySession.connect(token, { clientData: openviduState.myUserName })
        //         .then(async () => {

        //             // --- 5) Get your own camera stream ---

        //             // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
        //             // element: we will manage it on our own) and with the desired properties
        //             let publisher = await OV?.initPublisherAsync(undefined, {
        //                 audioSource: undefined, // The source of audio. If undefined default microphone
        //                 videoSource: undefined, // The source of video. If undefined default webcam
        //                 publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        //                 publishVideo: true, // Whether you want to start publishing with your video enabled or not
        //                 resolution: '640x480', // The resolution of your video
        //                 frameRate: 30, // The frame rate of your video
        //                 insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        //                 mirror: false, // Whether to mirror your local video or not
        //             });

        //             // --- 6) Publish your stream ---
        //             if (!publisher) return;
        //             mySession.publish(publisher);

        //             // Obtain the current video device in use
        //             if (!OV) return;
        //             var devices = await OV.getDevices();
        //             var videoDevices = devices.filter(device => device.kind === 'videoinput');
        //             var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
        //             var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

        //             // Set the main video in the page to display our webcam and store our Publisher
        //             openviduState.currentVideoDevice = currentVideoDevice;
        //             openviduState.mainStreamManager = publisher;
        //             openviduState.publisher = publisher;
        //         }).catch((error :any) => {
        //             console.log('There was an error connecting to the session:', error.code, error.message);
        //         });
        // });
    }

    const leaveSession = () => {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        OV = null;
        session = undefined;
        setSubscribers([]);
        mySessionId = '0';
        myUserName = 'Participant' + Math.floor(Math.random() * 100);
        // mainStreamManager = undefined;
        setMainStreamManager(undefined);
        setPublisher(undefined);
        currentVideoDevice = undefined;
    }

    const switchCamera = async () => {
        try {
            if (OV == null) return;
            const devices = await OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    if (!session || !mainStreamManager) return;
                    await session.unpublish(mainStreamManager)

                    await session.publish(newPublisher)
                    currentVideoDevice = newVideoDevice[0];
                    // mainStreamManager = newPublisher;
                    setMainStreamManager(newPublisher);
                    setPublisher(newPublisher);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    const getToken = async () => {
        const sessionId = await createSession(mySessionId);
        return await createToken(sessionId);
    }

    const createSession = async (sessionId :string) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'ov/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The sessionId
    }

    const createToken = async (sessionId : number) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'ov/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }

    useEffect(() => {
        // joinSession();
        // componentDidMount();
        // componentWillUnmount();
    })
    const showSubs = () => {
        console.log(subscribers);
        console.log(publisher);
        console.log(mainStreamManager);
    }

    return (
        <>
            {mainStreamManager && <OvVideo {...mainStreamManager}></OvVideo>}
            {subscribers.map((sub:any, idx:number) => {
                <div key={idx}>
                    <OvVideo {...sub}></OvVideo>
                </div>
            })}
            <button onClick={joinSession}>joinSession</button>
            <button onClick={showSubs}>showSubs</button>
        </>
    )
}

export default OpenViduVideo;