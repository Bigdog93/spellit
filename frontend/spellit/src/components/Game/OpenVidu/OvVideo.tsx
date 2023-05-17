import { useRef, useState, useContext, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';

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
            <audio autoPlay={true} ref={video}></audio>
        </div>
    )
}

export default OvVideo;