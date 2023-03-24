import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { WebSocketContext } from '@/store/websocket'
import { RootState } from "@/store/";

import './index.css'
import Versus from "./Versus"
import Loading from "./Loading"

const Matching = () => {
  const navigate = useNavigate();
  const { send } = useContext(WebSocketContext);

  const vs = useSelector((state: RootState) => state.matching.matched);
  const memberId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    send({
      event: 'matchStart',
			memberId: memberId,
      data: ''
		})
  });

  const toGame = useSelector((state: RootState) => state.matching.done);

  useEffect(() => {
    if(toGame) {
      navigate('/game/1')
    }
  }, [toGame, navigate]);

  return (
    <div>
      {memberId}
      { !vs && <Loading/> }
      { vs && <Versus/> }
    </div>
  )
  }
  export default Matching