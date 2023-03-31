
import { useState, useContext, useEffect } from "react"
import { useSelector } from 'react-redux'
import { RootState } from "@/store"
import OvVideo from '@/components/Game/OpenVidu/OvVideo'
import { ExceptionEvent, OpenVidu, Publisher, Session, StreamEvent, StreamManager, Subscriber } from 'openvidu-browser';
import axios from "axios";
import { WebSocketContext } from '@/store/websocket'
import room from "@/store/room";


const OpenViduVideo = () => {
    
    // const openviduUrl = `http://localhost:8080/api/sessions`
    const APPLICATION_SERVER_URL = `https://j8d201.p.ssafy.io/api/`;
    // const APPLICATION_SERVER_URL = `http://localhost:8080/api/`;
    // let test = 0;
    // type openviduType = {
    //     mySessionId: string,
    //     myUserName: string,
    //     session: Session | null | undefined,
    //     mainStreamManager: Publisher | undefined,  // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    //     publisher: StreamManager | undefined,
    //     subscribers: Array<StreamManager>,
    //     currentVideoDevice: any,
    // }
    const roomId = useSelector((state: RootState) => state.room.roomId);
    const nickname = useSelector((state: RootState) => state.user.nickname);
    console.log('roomId', roomId)
    console.log('nickname', nickname)
    let mySessionId: string = 'session' + roomId.toString();
    let myUserName: string = nickname;
    const [OV, setOV] = useState<OpenVidu | null>(new OpenVidu());
    const [session, setSession] = useState<Session | undefined>(OV?.initSession());
    const [mainStreamManager, setMainStreamManager] = useState<Publisher | undefined>(undefined) // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
    const [subscribers, setSubscribers] = useState<Array<StreamManager>>([]);
    const [token, setToken] = useState<string | null>(null);
    const { send } = useContext(WebSocketContext);
    const myTurn = useSelector((state: RootState) => (state.game.myAttackTurn));
    const attackTurn = useSelector((state:RootState) => state.game.attackTurn)
    // const [mute, setMute] = useState<boolean>(true);
    let currentVideoDevice: any = null;
    const onbeforeunload = (event :any) => {
        leaveSession();
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
        // setOV(new OpenVidu());
        console.log("joinSession");

        console.log(session);
        // --- 2) Init a session ---
        // setSession(OV?.initSession());

        console.log(session);
        // console.log("session is not undefined", session);
        var mySession = session;

        // --- 3) Specify the actions when events take place in the session ---

        if (session === undefined) {
            console.log(session);
            return;
        }
        // On every new Stream received...
        session.on('streamCreated', (event :StreamEvent) => {
            // Subscribe to the Stream to receive it. Second parameter is undefined
            // so OpenVidu doesn't create an HTML video by its own
            var subscriber = session.subscribe(event.stream, undefined);
            var tmpSubscribers = [...subscribers];
            tmpSubscribers.push(subscriber);
            console.log("누군가 들어옴 : ", subscribers);
            // Update the state with the new subscribers
            setSubscribers(tmpSubscribers);
        });

        // On every Stream destroyed...
        session.on('streamDestroyed', (event : StreamEvent) => {

            // Remove the stream from 'subscribers' array
            deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        session.on('exception', (exception :ExceptionEvent) => {
            console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        const token: string = await getToken();
        console.log("token : " + token);
        setToken(token);
        await session.connect(token, { clientData: myUserName });
        // --- 5) Get your own camera stream ---

        // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
        // element: we will manage it on our own) and with the desired properties
        let newPublisher = await OV?.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: false, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: false, // Whether you want to start publishing with your video enabled or not
            resolution: '0x0', // The resolution of your video
            frameRate: 60, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
        });
        console.log("newPublisher : ", newPublisher);

        // --- 6) Publish your stream ---
        if (!newPublisher || mySession === undefined) return;
        mySession.publish(newPublisher);

        // Obtain the current video device in use
        if (!OV) return;
        var devices = await OV.getDevices();
        var videoDevices = devices.filter(device => device.kind === 'videoinput');
        var currentVideoDeviceId = newPublisher.stream.getMediaStream().getAudioTracks()[0].getSettings().deviceId;
        currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

        // streamPlaying 이벤트가 발생하면(published 되면) 바로 뮤트 시켜버림!
        // 그전에 하면 안먹히거나 영원히 뮤트됨..
        newPublisher.on("streamPlaying", () => {
            newPublisher?.publishAudio(false);
        })
        // Set the main video in the page to display our webcam and store our Publisher
        setMainStreamManager(newPublisher);
        setPublisher(newPublisher);
        console.log("publisher : ", publisher);
        console.log("newPublisher : ", newPublisher);
    }

    const leaveSession = () => {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        setOV(null);
        setSession(undefined);
        setSubscribers([]);
        mySessionId = '0';
        myUserName = 'Participant' + Math.floor(Math.random() * 100);
        // mainStreamManager = undefined;
        setMainStreamManager(undefined);
        setPublisher(undefined);
        currentVideoDevice = undefined;
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
        console.log("getToken run");
        const sessionId = await createSession(mySessionId);
        return await createToken(sessionId);
    }

    const createSession = async (sessionId :string) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'ov/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        console.log(response);
        return response.data; // The sessionId
    }

    const createToken = async (sessionId : number) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'ov/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }



    useEffect(() => {
        window.addEventListener('beforeunload', leaveSession);
        joinSession();
        console.log("publisher***************** : " , publisher);
        // publisher?.publishAudio(mute);
        return () => {
            leaveSession();
            // componentDidMount();
            // componentWillUnmount();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const showSubs = () => {
        console.log(subscribers);
        console.log(publisher);
        console.log(mainStreamManager);
    }
    function testFunction() {
        send({
            event: 'test',
            memberId: 0,
            data: '바람의 칼날이여'
        })
    }
    function muteOn() {
        console.log("publisher : " + publisher);
        if (publisher === undefined) return;
        // setMute(!mute);
        publisher.publishAudio(false);
    }
    function muteOff() {
        publisher?.publishAudio(true);
    }
    useEffect(() => {
      if(attackTurn) {
        if (myTurn) {
          muteOff();
          console.log('내 차례라서 뮤트 해제함')
        } else {
          muteOn();
          // muteOff();
          console.log('상대방 차례라서 뮤트함')
        }
      } else {
        muteOn();
        console.log('공격턴 아니라서 뮤트함')
      }
      return () => {

      }
    }, [attackTurn, myTurn])

    return (
      <>
        {mainStreamManager && <OvVideo streamManager={mainStreamManager}></OvVideo>}
        {/* <button onClick={joinSession}>joinSession</button> */}
        {/* <button onClick={showSubs}>showSubs</button> */}
        {/* <button onClick={testFunction}>testFunction</button> */}
        <button onClick={muteOn}>muteOn</button>
        <button onClick={muteOff}>muteOff</button>
        {subscribers.map((sub:any, idx:number) => {
            return (
                <div key={idx}>
                    <OvVideo streamManager={sub}></OvVideo>
                </div>
            )
        })}
      </>
    )
}

export default OpenViduVideo;
