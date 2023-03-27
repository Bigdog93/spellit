import { useState, useContext } from 'react'
// import { WebSocketContext } from '../../utils/WebsocektProvider'
// import { sessionActions } from "@/store/session"
// import { useDispatch, useSelector } from 'react-redux'
import { WebSocketContext } from '@/store/websocket';

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "@/store"
import { costActions } from "@/store/cost"
import { attackActions } from "@/store/attack"

function TextInputBox() {
  const [message, setMessage] = useState("");
  const { send } = useContext(WebSocketContext);
  // const ws = useContext(WebSocketContext);
  // const dispatch = useDispatch();
  const handleChangeText = (e: any) => {
    setMessage(e.target.value);
  }

  const cost = useSelector((state: RootState) => state.cost.currentCost);

  const handleClickSubmit = () => {
    // ws.current.send(JSON.stringify({
    //   event: 'test',
    //   data: message 
    // }))
    // dispatch(sessionActions.send({
    //   event: 'test',
    //   data: message,
    // }));
    send(
      {
        event: 'test',
        data: message 
      }
    );
    console.log("메시지 보냄");
    setMessage('');
  }

  return (
    <div>
      <div>{cost}</div>
      <input type="text" value={message} onChange={handleChangeText}></input>
      <button type="button" onClick={handleClickSubmit}>Send!</button>
    </div>
  )
}

export default TextInputBox