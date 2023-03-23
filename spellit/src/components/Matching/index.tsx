import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"

import { WebSocketContext } from '@/store/websocket'
import { RootState } from "@/store/";

import './index.css'
import Versus from "./Versus"
import Loading from "./Loading"

const Matching = () => {

  const { send } = useContext(WebSocketContext);

  const vs = useSelector((state: RootState) => state.matching.matched);

  useEffect(() => {
    send({
			event: 'matchStart',
			memberId: 1
		})
  })

  return (
    <div>
      { !vs && <Loading/> }
      { vs && <Versus/> }
    </div>
  )
  }
  export default Matching