import React, { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "@/store/websocket";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/";
import { attackActions } from "@/store/attack";
import  Spell from "./Spell";
import Character from "./Character";

type SelectCardsType = {
    id : number,
    code : string,
    title : string,
    spell : string,
    cost : number,
    damage : number,
    attribute : number,
}

type PlayersDeckType = {
    isMine: boolean,
    card: SelectCardsType,
}

function Attack() {
    const [idx, setIdx] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startGame = useSelector((state: RootState) => (state.attack.startGame));
    const myTurn = useSelector((state: RootState) => (state.attack.myTurn));
    
    // const memberId = useSelector((state: RootState) => state.user.id);
    const characterName = useSelector((state: RootState) => state.user.gameCharacter?.englishName);
    // console.log('캐릭터 이름: ', characterName) // 곽춙배,,
    console.log('캐릭터 이름: ', characterName) // CB

    const playersDeckList = useSelector((state: RootState) => (state.attack.playersDeck));

    const [cardInfo, setCardInfo] = useState<PlayersDeckType>(playersDeckList[idx])
    console.log('myTurn 유무 : ', myTurn);
    console.log('idx : ', idx);
    console.log('cardInfo : ', cardInfo);

    useEffect(() => {
        console.log('useEffect 문 들어옴')
        // if (idx >= playersDeckList.length) {
        //     console.log('idx 다 돌았다! ready로 이동!')
        //     navigate('/ready');
        // }
        
        if (playersDeckList[idx].isMine) {
            console.log('여긴 내가 선공!');
            dispatch(attackActions.myTurn(true));
            setCardInfo(cardInfo);
            // navigate('/Spell')
        } else {
            console.log('아 후공이닷,,');
            dispatch(attackActions.myTurn(false));
            setCardInfo(cardInfo);
            // navigate('/Spell')
        }
        
        if (idx === playersDeckList.length-1) {
            console.log('idx 다 돌았다! ready로 이동!')
            navigate('/ready');
        } else {
            setIdx(idx+1);
        }

    }, [idx])
    

    // useEffect(() => {
    // }, [idx])

    return (
        <>
            <h1>Game Start!</h1>
            {/* <Character characterName={}></Character> */}
            <Spell cardInfo={cardInfo}></Spell>
        </>
    )
}

export default Attack;