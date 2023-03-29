import React, { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "@/store/websocket";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/";
import { attackActions } from "@/store/attack";
// import  Spell from "./Spell";
import Character from "./Character";
import { Navigate } from "react-router-dom";
// import MyTurn from "./MyTurn";
import YourTurn from "./YourTurn";
import MyTurn from "./Stt";

type SelectCardsType = {
    id : number,
    code : string,
    title : string,
    spell : string,
    cost : number,
    damage : number,
    attribute : number,
}

export type PlayersDeckType = {
    isMine: boolean,
    card: SelectCardsType,
}

function Attack() {
    const [idx, setIdx] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const endStt = useSelector((state: RootState) => (state.attack.endStt));
    const playersDeckList = useSelector((state: RootState) => (state.attack.playersDeck));
    
    const [cardInfo, setCardInfo] = useState<PlayersDeckType>(playersDeckList[idx]);    
    const myTurn = playersDeckList[idx].isMine;
    
    // const startGame = useSelector((state: RootState) => (state.attack.startGame));
    // const myTurn = useSelector((state: RootState) => (state.attack.myTurn));
    
    // const memberId = useSelector((state: RootState) => state.user.id);
    // const characterName = useSelector((state: RootState) => state.user.gameCharacter?.englishName);
    // console.log('캐릭터 이름: ', characterName) // 곽춙배,,
    // console.log('캐릭터 이름: ', characterName) // CB
    
    
    // const idx = useSelector((state: RootState) => (state.attack.movePageCnt));
    
    // useEffect(() => {
        //     dispatch(attackActions.setSec(cardInfo.card.cost));
        // }, [])
        
        
        // console.log('idx : ', idx);
        // console.log('cardInfo : ', cardInfo);
        
    // useEffect(()=> {
    //     if (myTurn) {
    //         console.log('여긴 내가 선공!');

    //         // dispatch(attackActions.myTurn(true));
    //         // setCardInfo(cardInfo);
    //     } else {
    //         console.log('아 후공이닷,,');
    //         // dispatch(attackActions.myTurn(false));
    //         // setCardInfo(cardInfo);
    //     }
    // }, [])
    
    
    useEffect(() => {
        console.log('useEffect 문 안')
        if (endStt) {
            // console.log('왜 들어오지')
            // 한 턴 종료 후 ready 로 이동
            if (idx >= playersDeckList.length) {
                console.log('턴 종료');
                // dispatch(attackActions.movePageCnt(0));
                navigate('/ready');
            }
            console.log('인덱스 증가');

            setIdx(idx+1);
            setCardInfo(playersDeckList[idx]);
        }
    }, [endStt]);

    return (
        <>
            {/* <h1>Game Start!</h1> */}
            { myTurn ? <MyTurn cardInfo={cardInfo}></MyTurn> : <YourTurn cardInfo={cardInfo}></YourTurn>}
        </>
    )
}

export default Attack;