import { useRef, useState, useContext } from "react"
import { OpenviduContext } from '@/store/openvidu';
import { useDispatch, useSelector } from 'react-redux'
import { Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';


const OvVideo = (streamManager :any) => {
    const video = useRef(HTMLVideoElement.prototype);
    // let { OV, openviduState, joinSession, test } = useContext(OpenviduContext);
    // let { OV, openviduState, joinSession, subscribers } = useContext(OpenviduContext);
    streamManager.addVideoElement(video.current);
    
    return (
        <div>
            <video autoPlay={true} ref={video}></video>
        </div>
    )
}

export default OvVideo;