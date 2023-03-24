import { useRef, useState, useContext, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { IProps } from '@/components/Test/openviduTest'

const OvVideo = ({ streamManager } :{streamManager:StreamManager}) => {
    const video = useRef(HTMLVideoElement.prototype);
    // let { OV, openviduState, joinSession, test } = useContext(OpenviduContext);
    // let { OV, openviduState, joinSession, subscribers } = useContext(OpenviduContext);
    useEffect(() => {
        if (streamManager !== undefined) {
            console.log(streamManager);
            streamManager.addVideoElement(video.current);
        }
        return () => {

        }
    }, [streamManager])
    
    return (
        <div>
            <video autoPlay={true} ref={video}></video>
        </div>
    )
}

export default OvVideo;