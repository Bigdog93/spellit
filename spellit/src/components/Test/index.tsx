import Chatting from "@/components/Test/Chatting";
import TextInputBox from "@/components/Test/TextInputBox";
// import WebsocektProvider from '../../utils/WebsocektProvider'
import OpenViduVideo from '@/components/Game/OpenVidu/OpenVidu'
import VoiceRec from '@/components/Test/VoiceRec'
// import { OpenviduProvider } from '@/store/openvidu'
import {useEffect} from 'react'

const OpenViduTest = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // 인스턴스 생성
  const recognition = new SpeechRecognition();
  useEffect(()=> {
    recognition.start();
    console.log('보이스레코그니션 스타트')
  },[])

  return (
    <div>
      여긴가..?
      {/* <WebsocektProvider> */}
      {/* <OpenviduProvider> */}
        {/* <Chatting/>
      <TextInputBox /> */}
      {/* <VoiceRec/> */}
      <OpenViduVideo />
        {/* </OpenviduProvider> */}
      {/* </WebsocektProvider> */}
    </div>
  )
};
export default OpenViduTest;