import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/";

import Timer from "../Items/Timer";
import  Spell from "./Spell";
import Character from "./Character";
import game, { gameActions } from "@/store/game";
import OpenViduVideo from '@/components/Game/OpenVidu/OpenVidu'


const Attack = () => {
  console.log('Attack')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const attacks = useSelector((state: RootState) => (state.game.attacks));
  const idx = useSelector((state: RootState) => (state.game.idx));
  const attackTurn = useSelector((state: RootState) => (state.game.attackTurn));
  const isMine = attacks[idx].isMine
  const myCharacter = useSelector((state: RootState) => (state.user.gameCharacter?.englishName));
  
  useEffect(() => {
    dispatch(gameActions.setMyAttackTurn(isMine))
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

  // const temp = attacks[idx].card.cost
  // console.log('cost를 초로 쓰자', temp)
  // const [time, setTime] = useState(temp)

  // useEffect(()=> {
  //   console.log('timer useEffect')
  //   let interval = setInterval(() => setTime(time-1), 1000)
  //   setTimeout(()=>{
  //     clearInterval(interval);
  //     // dispatch(attackActions1.setIdx())
  //     console.log(time)
  //   }, temp)
  // }, []);


  return (
    <div>
        <OpenViduVideo />
        <div>
          {/* <Timer time={attacks[idx].card.cost}/> */}
          {/* {isMine && <img src={require(`../../../assets/character/${myCharacter}_default.png`)} alt='character'></img>} */}
          <Spell attack={attacks[idx]}/>
          {/* {!isMine && <img src={require(`../../../assets/character/${myCharacter}_default.png`)} alt='character'></img>} */}
        </div>
      {/* )} */}
    </div>
  )
}

export default Attack;