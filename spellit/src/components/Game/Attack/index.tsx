import React, { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "@/store/websocket";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/";
import { attackActions1 } from "@/store/attack1";

import Timer from "../Items/Timer";
import  Spell from "./Spell";
import Character from "./Character";
import { gameActions } from "@/store/game";



const Attack = () => {
  console.log('Attack')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const attacks = useSelector((state: RootState) => (state.attack1.attacks));
  const idx = useSelector((state: RootState) => (state.attack1.idx));

  useEffect(() => {
    if(idx === attacks!.length){
      dispatch(gameActions.endAttack())
      navigate('/defense')
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
      {/* {attacks && ( */}
        <div>
          {/* <Timer time={attacks[idx].card.cost}/> */}
          <Spell attack={attacks[idx]}/>
        </div>
      {/* )} */}
    </div>
  )
}

export default Attack;