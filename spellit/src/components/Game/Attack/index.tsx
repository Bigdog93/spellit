import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/";
import { WebSocketContext } from '@/store/websocket'


import  Spell from "./Spell";
import Character from "./Character";
import game, { gameActions } from "@/store/game";
import OpenViduVideo from '@/components/Game/OpenVidu/OpenVidu'


const Attack = () => {
  console.log('Attack')
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { send } = useContext(WebSocketContext);

  const roomId = useSelector((state: RootState) => state.room.roomId)
  const memberId = useSelector((state: RootState) => state.user.id)

  const attacks = useSelector((state: RootState) => (state.game.attacks));
  const idx = useSelector((state: RootState) => (state.game.idx));
  const attackTurn = useSelector((state: RootState) => (state.game.attackTurn));
  const isMine = attacks[idx].isMine
  const myCharacter = useSelector((state: RootState) => (state.user.gameCharacter?.englishName));
  
  // attackTurn 끝내기
  useEffect(() => {
    dispatch(gameActions.setMyAttackTurn(isMine))
    console.log('attack index에서 dispatch하고 찍는 isMine')
   
    // 아직 attackTurn인데
    if (attackTurn) {

      // 영창할 게 남지 않았을 때
      if(idx === attacks!.length){
        console.log('atttack턴 끝내기')
        // dispatch(gameActions.endAttack())
        // 웹소켓에 defenseTurn임을 알리기(알아서 defense로 넘어감)
        send({
          event: 'defenseTurn',
          roomId: roomId,
          memberId: memberId,
        })

      // 영창할 게 남았을 때
      } else {
        dispatch(gameActions.setIdx())
      }
    } 
  }, [idx, dispatch])


  return (
    <div>
        <OpenViduVideo />
          {/* <Timer time={attacks[idx].card.cost}/> */}
        <div className='spell-and-character'>
          {isMine && <img src={require(`../../../assets/character/${myCharacter}_default.png`)} alt='character' className='attack-character-1p'></img>}
          <Spell attack={attacks[idx]}/>
          {!isMine && <img src={require(`../../../assets/character/${myCharacter}_default.png`)} alt='character' className='attack-character-2p'></img>}
        </div>
      {/* )} */}
    </div>
  )
}

export default Attack;