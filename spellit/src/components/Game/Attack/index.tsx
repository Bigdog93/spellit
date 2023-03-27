import React, { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "@/store/websocket";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/";
import { attackActions } from "@/store/attack";
import  Spell from "./Spell";


function Attack() {
    const [idx, setIdx] = useState(0);
    const dispatch = useDispatch();

    const startGame = useSelector((state: RootState) => (state.attack.startGame));
    const myTurn = useSelector((state: RootState) => (state.attack.myTurn));
    
    const playersDeckList = useSelector((state: RootState) => (state.attack.playersDeck));

    const cardInfo = playersDeckList[idx];
    
    useEffect(() => {
        if (playersDeckList[idx].isMine) {
            dispatch(attackActions.myTurn(true));
        } else {
            dispatch(attackActions.myTurn(false));
        }
        setIdx(idx+1);
    }, [idx])

    return (
        <>
            <Spell cardInfo={cardInfo}></Spell>
        </>
    )
}

export default Attack;