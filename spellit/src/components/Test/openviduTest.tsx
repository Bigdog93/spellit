import { useRef, useState, useContext } from "react"
import { OpenviduContext } from '@/store/openvidu';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "@/store"
import OvVideo from '@/components/Test/OvVideo'
import { Subscriber } from 'openvidu-browser';

const OpenViduVideo = () => {
    const myVideo = useRef(null);
    const otherVideo = useRef(null);
    const { OV, joinSession, publisher, subscribers, componentDidMount, componentWillUnmount } = useContext(OpenviduContext);
    // joinSession().then(() => {
    //     console.log(openviduState);
    //     openviduState.mainStreamManager.addVideoElement(myVideo.current);
    //     openviduState.subscribers[0].addVideoElement(otherVideo.current);
    // });
    joinSession();
    componentDidMount();
    componentWillUnmount();

    return (
        <div>
            {publisher && <OvVideo streamManager={publisher}></OvVideo>}
            {subscribers.map((sub:any, idx:number) => {
                <div
                    key={idx}
                >
                    {<OvVideo streamManager={sub}></OvVideo>}
                </div>
            })}
        </div>
    )
}

export default OpenViduVideo;