import Chatting from "@/components/Test/Chatting";
import TextInputBox from "@/components/Test/TextInputBox";
// import WebsocektProvider from '../../utils/WebsocektProvider'
import OpenViduVideo from '@/components/Game/OpenVidu/OpenVidu'
import VoiceRec from '@/components/Test/VoiceRec'
import SoundTest from "./soundTest";
// import { OpenviduProvider } from '@/store/openvidu'
import {useEffect, useState} from 'react'

const OpenViduTest = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // 인스턴스 생성
  const recognition = new SpeechRecognition();
  const [testScript, setTestScript] = useState<string>('');

  useEffect(()=> {
    recognition.start();
    console.log('보이스레코그니션 스타트')
    recognition.addEventListener("result", (e) => {
      console.log("말하는 중이잖아요?");
      console.log(e)
      let transcript = e.results[0][0].transcript; // 인식된 음성 글자
      transcript = transcript.replaceAll(" ", ""); // 띄어쓰기 제거한 음성 인식 글자
      setTestScript(transcript);
  });
  },[])

  return (
    <div>
      {testScript}
    
      {/* <WebsocektProvider> */}
      {/* <OpenviduProvider> */}
        {/* <Chatting/>
      <TextInputBox /> */}
      {/* <VoiceRec/> */}
      <SoundTest/>
      {/* <OpenViduVideo /> */}
        {/* </OpenviduProvider> */}
      {/* </WebsocektProvider> */}
    </div>
  )
};
export default OpenViduTest;