import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/";
import { WebSocketContext } from '@/store/websocket'


// import  Spell from "./Spell";
import  MySpell from "./MySpell";
import  OtherSpell from "./OtherSpell";
// import Character from "./Character";
import game, { gameActions } from "@/store/game";
import Spell from "./Spell";
// import OpenViduVideo from '@/components/Game/OpenVidu/OpenVidu'
import Combo from "./Combo";

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
  const comboTurn = useSelector((state: RootState) => (state.game.comboTurn));
  const isMine = attacks[idx].isMine
  const myCharacter = useSelector((state: RootState) => (state.user.gameCharacter?.englishName));

  const attackCheck = useSelector((state: RootState) => (state.game.attackCheck))

  // attackTurn 끝내기
  useEffect(() => {
    dispatch(gameActions.setMyAttackTurn(isMine))
    console.log('setMyAttackTurn에 isMine 업뎃 중', isMine)
    console.log('idx', idx)
  }, [idx, dispatch])


  return (
    <div>
        {/* <div className='spell-and-character'> */}
        {attackCheck && <div>
          {isMine && (comboTurn ? <Combo /> : <MySpell attack={attacks[idx]} idx={idx}/>)}
          {!isMine && (comboTurn ? <Combo /> : <OtherSpell attack={attacks[idx]} idx={idx}/>)}
        </div>
        }
        {/* </div> */}
    </div>
  )
}

export default Attack;