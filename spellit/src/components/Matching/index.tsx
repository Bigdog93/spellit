import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { WebSocketContext } from '@/store/websocket'
import { MusicContext } from '@/store/music';
import { RootState } from "@/store/";
// import { matchingActions } from "@/store/matching";

import './index.css'
import Versus from "./Versus"
import Loading from "./Loading"
import { Root } from "@react-three/fiber/dist/declarations/src/core/renderer";
import { friendsActions } from '../../store/friends';


const Matching = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { send } = useContext(WebSocketContext);

  const connected = useSelector((state: RootState) => state.matching.connected);
  const memberId = useSelector((state: RootState) => state.user.id);
	const me = useSelector((state: RootState) => state.user);
  const friend = useSelector((state: RootState) => state.friends.matchRequestPlayer)
	const roomId = useSelector((state: RootState) => state.friends.matchRequestRoomId);
  const isFriendMatch = useSelector((state: RootState) => state.friends.isFriendMatch);
  const isFriendMatchRequesting = useSelector((state: RootState) => state.friends.isFriendMatchRequesting);

  const { setMusic } = useContext(MusicContext);
  useEffect(() => {
    setMusic("battle");
  }, [])
  useEffect(() => {
    console.log(memberId)
    if (isFriendMatch) {
      send({
        event: 'matchResponse',
        memberId: me.id,
        roomId: roomId,
        data: {
          otherId: friend?.id,
          response: true
        }
      })
      dispatch(friendsActions.setIsFriendMatch(false));
      dispatch(friendsActions.setMatchRequestPlayer(null));
    } else if(!isFriendMatchRequesting) {
      send({
        event: 'matchStart',
        memberId: memberId,
        data: ''
      })
    } else {
      dispatch(friendsActions.setIsFriendMatchRequesting(false));
    }
    return () => {
    }
  }, []);

  
  const readyTurn = useSelector((state: RootState) => state.game.readyTurn)
  console.log('roomId', roomId)
  console.log('memberId', memberId)
  // p1, p2 모두 동전 던지기가 끝났을 때 store의 game 업뎃
  useEffect(() => {
    console.log('toReady에 실행되는 useEffect')
    if(readyTurn) {
      console.log('readyTurn 시작이야')
      navigate(`/game/${roomId}`)
    }
  }, [readyTurn, navigate]);

  
  return (
    <div>
      {memberId}
      { !connected && <Loading/> }
      { connected && <Versus/> }
    </div>
  )
  }
  export default Matching