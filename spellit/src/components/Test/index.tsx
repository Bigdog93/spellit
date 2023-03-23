import Chatting from "../../components/Test/Chatting";
import TextInputBox from "../../components/Test/TextInputBox";
import WebsocektProvider from '../../utils/WebsocektProvider'

const Test = () => {
  return (
    <div>
      {/* <WebsocektProvider> */}
        <Chatting/>
        <TextInputBox/>
      {/* </WebsocektProvider> */}
    </div>
  )
};
export default Test;