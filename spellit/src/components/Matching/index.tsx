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

  const vs = useSelector((state: RootState) => state.matching.done);
  const memberId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    send({
      event: 'matchStart',
			memberId: memberId,
      data: ''
		})
  });

  const p1Loading = useSelector((state: RootState) => state.matching.p1Loading);
  const p2Loading = useSelector((state: RootState) => state.matching.p2Loading);

  useEffect(() => {
    if(p1Loading && p2Loading) {
      navigate('/game/1')
    }
  }, [p1Loading, p2Loading, navigate]);

  return (
    <div>
      {memberId}
      { !vs && <Loading/> }
      { vs && <Versus/> }
    </div>
  )
  }
  export default Matching