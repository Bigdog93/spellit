import Chatting from "@/components/Test/Chatting";
import TextInputBox from "@/components/Test/TextInputBox";
// import WebsocektProvider from '../../utils/WebsocektProvider'
import OpenViduVideo from '@/components/Game/OpenVidu/OpenVidu'
import VoiceRec from '@/components/Test/VoiceRec'
// import { OpenviduProvider } from '@/store/openvidu'

const OpenViduTest = () => {
  return (
    <div>
      {/* <WebsocektProvider> */}
      {/* <OpenviduProvider> */}
        {/* <Chatting/>
      <TextInputBox /> */}
      <VoiceRec/>
      <OpenViduVideo />
        {/* </OpenviduProvider> */}
      {/* </WebsocektProvider> */}
    </div>
  )
};
export default OpenViduTest;