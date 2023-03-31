import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { WebSocketContext } from '@/store/websocket'
import { gameActions } from "@/store/game";

const Settle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { send } = useContext(WebSocketContext);

  const roomId = useSelector((state: RootState) => state.room.roomId)
  const memberId = useSelector((state: RootState) => state.user.id)

  const hp1 = useSelector((state: RootState) => state.player.p1?.hp);
  const hp2 = useSelector((state: RootState) => state.player.p2?.hp);
  const settleTurn = useSelector((state: RootState) => state.game.settleTurn)
  console.log('Settle에서 찍히는 settleTurn: ', settleTurn)
  console.log('Settle에서 찍히는 hp1: ', hp1)
  console.log('Settle에서 찍히는 hp2: ', hp2)
  useEffect(()=> {
    // settleTurn일 때
    if(!settleTurn) {
      if (hp1 && hp2) {
        // Hp가 0인 플레이어가 있으면
        console.log('hp확인 if 안이야')
        if(hp1 <=0 || hp2 <=0) {
          send({
            event: 'gameOver',
            roomId: roomId,
            memberId: memberId,
            data: { hp: hp1 }
          })
          // dispatch(gameActions.endGame)
          // navigate('/result')
          console.log('hp 다 떨어졌다...')

        // 두 플레이어 모두 아직 HP가 남았으면
        } else {
          // dispatch(gameActions.startReady)
          // ready로 돌아가기
          send({
            event: 'toReady',
            roomId: roomId,
            memberId: memberId,
            data: ''
          })
        }
      }
      console.log('hp확인 if 밖이야')
    }
    return () => {

    }
  }, [settleTurn, hp1, hp2, navigate])

  return (    
    <div>
      <p>Settle이무니다</p>
    </div>
  )
};
export default Settle;