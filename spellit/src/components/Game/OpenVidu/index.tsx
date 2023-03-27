import Chatting from "../../Test/Chatting";
import TextInputBox from "../../Test/TextInputBox";
// import WebsocektProvider from '../../utils/WebsocektProvider'
import OpenViduVideo from '@/components/Game/OpenVidu/OpenVidu'
// import { OpenviduProvider } from '@/store/openvidu'

const OpenViduTest = () => {
  return (
    <div>
      {/* <WebsocektProvider> */}
      {/* <OpenviduProvider> */}
        {/* <Chatting/>
      <TextInputBox /> */}
        <OpenViduVideo />
        {/* </OpenviduProvider> */}
      {/* </WebsocektProvider> */}
    </div>
  )
};
export default OpenViduTest;