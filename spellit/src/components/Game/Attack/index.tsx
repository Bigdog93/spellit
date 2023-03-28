import React, { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "@/store/websocket";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/";
import { attackActions1 } from "@/store/attack1";

import Timer from "../Items/Timer";
import  Spell from "./Spell";
import Character from "./Character";



const Attack = () => {
    const attacks = useSelector((state: RootState) => (state.attack1.attacks))
    const [idx, setIdx] = useState(0)

    console.log(attacks)
    console.log(idx)
    return (
        <div>
          {attacks && (
            <div>
              <Timer time={attacks[idx].card.cost}/>
              <Spell attack={attacks[idx]}/>
            </div>
          )}
        </div>
    )
}

export default Attack;