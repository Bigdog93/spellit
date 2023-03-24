import Chatting from "../../components/Test/Chatting";
import TextInputBox from "../../components/Test/TextInputBox";
import WebsocektProvider from '../../utils/WebsocektProvider'
import OpenViduVideo from './openviduTest'
import { OpenviduProvider } from '@/store/openvidu'

const Test = () => {
  return (
    <div>
      {/* <WebsocektProvider> */}
      <OpenviduProvider>
        {/* <Chatting/>
      <TextInputBox /> */}
        <OpenViduVideo />
        </OpenviduProvider>
      {/* </WebsocektProvider> */}
    </div>
  )
};
export default Test;