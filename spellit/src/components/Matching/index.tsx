import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { WebSocketContext } from '@/store/websocket'
import { RootState } from "@/store/";
// import { matchingActions } from "@/store/matching";

import './index.css'
import Versus from "./Versus"
import Loading from "./Loading"

const Matching = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { send } = useContext(WebSocketContext);

  const connected = useSelector((state: RootState) => state.matching.connected);
  const memberId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    console.log(memberId)
    send({
      event: 'matchStart',
			memberId: memberId,
      data: ''
		})
    return () => {

    }
  }, []);

  
  const p1Loading = useSelector((state: RootState) => state.matching.p1Loading);
  const p2Loading = useSelector((state: RootState) => state.matching.p2Loading);
  const roomId = useSelector((state: RootState) => state.room.roomId);
  // p1, p2 모두 동전 던지기가 끝났을 때 stored의 game 업뎃
  useEffect(() => {
    if(p1Loading && p2Loading) {
      // dispatch(matchingActions.startGame())
      console.log('if문 안이야')
      send({
        event: 'readyTurn',
        memberId: memberId,
        data: ''
      })
      navigate(`/game/${roomId}`)
    }
    console.log('if문 밖이야')

  }, [p1Loading, p2Loading, navigate]);

  
  return (
    <div>
      {memberId}
      { !connected && <Loading/> }
      { connected && <Versus/> }
    </div>
  )
  }
  export default Matching