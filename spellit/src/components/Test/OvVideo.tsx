import { useRef, useState, useContext } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { IProps } from '@/components/Test/openviduTest'

const OvVideo = (streamManager :IProps['mainStreamManager'], sub: IProps['sub']) => {
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