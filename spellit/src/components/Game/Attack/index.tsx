import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/";
import { WebSocketContext } from '@/store/websocket'


// import  Spell from "./Spell";
import  MySpell from "./MySpell";
import  OtherSpell from "./OtherSpell";
import Character from "./Character";
import game, { gameActions } from "@/store/game";
// import OpenViduVideo from '@/components/Game/OpenVidu/OpenVidu'


const Attack = () => {
  console.log('Attack')
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { send } = useContext(WebSocketContext);

  const roomId = useSelector((state: RootState) => state.room.roomId)
  const memberId = useSelector((state: RootState) => state.user.id)

  const attacks = useSelector((state: RootState) => (state.game.attacks));
  console.log('attack index에서 찍히는 attacks', attacks)
  const idx = useSelector((state: RootState) => (state.game.idx));
  console.log('attack index에서 찍히는 idx', idx)
  const attackTurn = useSelector((state: RootState) => (state.game.attackTurn));
  const isMine = attacks[idx].isMine
  const myCharacter = useSelector((state: RootState) => (state.user.gameCharacter?.englishName));
  
  // attackTurn 끝내기
  useEffect(() => {
    dispatch(gameActions.setMyAttackTurn(isMine))
    // console.log('attack index에서 dispatch하고 찍는 isMine')
   
    // // 아직 attackTurn인데
    // if (attackTurn) {
    //   // 영창할 게 남지 않았을 때
    //   console.log('아직 attackTurn임')
    //   if(idx === attacks.length){
    //     console.log('atttack턴 끝내기')
    //     // dispatch(gameActions.endAttack())
    //     // 웹소켓에 defenseTurn임을 알리기(알아서 defense로 넘어감)
    //     send({
    //       event: 'defenseTurn',
    //       roomId: roomId,
    //       memberId: memberId,
    //       data: ''
    //     })
    //     console.log('defense턴으로 간다')
    //   } 
    // } 
    console.log('attack index에서 dispatch하고 찍는 isMine')
    if (attackTurn) {
      if(idx === attacks!.length){
        console.log('atttack턴 끝내기')
        dispatch(gameActions.endAttack())
      }
    }else{
      navigate('/defense');
    }
  }, [idx, dispatch])


  return (
    <div>
        {/* <OpenViduVideo /> */}
          {/* <Timer time={attacks[idx].card.cost}/> */}
        <div className='spell-and-character'>
          {isMine && <div>
            {/* <img src={require(`../../../assets/character/${myCharacter}_default.png`)} alt='character' className='attack-character-1p'></img> */}
            <MySpell attack={attacks[idx]} idx={idx}/>
          </div>}
          {!isMine && <div>
            <MySpell attack={attacks[idx]} idx={idx}/>
            {/* <OtherSpell attack={attacks[idx]} idx={idx}/> */}
            {/* <img src={require(`../../../assets/character/${myCharacter}_default.png`)} alt='character' className='attack-character-2p'></img> */}
          </div>}
        </div>
      {/* )} */}
    </div>
  )
}

export default Attack;