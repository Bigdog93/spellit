import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/";
import { WebSocketContext } from "@/store/websocket";

import ProfileHp from "../Items/ProfileHp";
import Timer from "../Items/Timer";

import './Spell.css'

import SpellBox from "../../../assets/InGame/SpellBox.png";
import SkillBar from "../../../assets/InGame/SkillBar.png";
import { attackActions } from "@/store/attack";
import { costActions } from "@/store/cost";
import player from "@/store/player";
import MyTurn from "./MyTurn";
import YourTurn from "./YourTurn";


const Spell = (props: any) => {
    const dispatch = useDispatch();
    
    const selectSpell = props.cardInfo.card;
    console.log('selectSpell : ', selectSpell);
    
    // const { send } = useContext(WebSocketContext);
    
    // const memberId = useSelector((state: RootState) => state.user.id);
    // const roomId = useSelector((state: RootState) => state.room.roomId);

    // 타이머 띄우기
    // const [sec, setSec] = useState<number>(0);
    // const sec = useSelector((state: RootState) => (state.attack))
    const sec = useSelector((state: RootState) => (state.attack.sec));

    // 타이머 사용 유무
    // const [onTimer, setOnTimer] = useState<boolean>(false);
    const onTimer = useSelector((state: RootState) => (state.attack.onTimer));

    // 주문영창 스킬 리스트
    // const [damageList, setDamageList] = useState<number[]>([]);

    // const sendSpell = (transcript: string) => {
    //   send({
    //     event: 'spell',
    //     roomId: roomId,
    //     memberId: memberId,
    //     data: transcript,
    //   })
    // };

    const myTurn = useSelector((state: RootState) => (state.attack.myTurn));
    const playersDeckList = useSelector((state: RootState) => (state.attack.playersDeck));

    // const myDeckList = useSelector((state: RootState) => state.attack.p1Deck);
    // const otherDeckList = useSelector((state: RootState) => (state.attack.p2Deck));

    // const [spanEl, setSpanEl] = useState<JSX.Element[]>([]);
    // const reg = /[~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;

    // const spanList: JSX.Element[] = [];
    
    const transcript = useSelector((state: RootState) => (state.attack.transcript));
    

    const navigate = useNavigate();
    // const [idx, setIdx] = useState(0);

    // useEffect(() => {
    //   console.log('myturn 여부 : ', myTurn);
      // console.log('spell idx: ', idx);
      // if (idx >= playersDeckList.length) {
      //   navigate('/ready');
      // }

      // if (myTurn) {
      //   MyTurn(playersDeckList[idx].card);
      //   // sendSpell(transcript);
      //   setIdx(idx+1);
      // } else {
      //   setIdx(idx+1);
      // }

      // if (idx == playersDeckList.length) {
      //   navigate('/settle');
      // }
        
        // 주문 삭제하기
        // if (idx == myDeckList.length) {
        //   const spell = document.querySelectorAll('span')
        //   for (let i=0; i<spell.length; i++) {
        //     spell[i].remove()
        //   }
          
        //   const percent = document.querySelector("percent") as HTMLDivElement;
        //   percent.remove()

        // }
    // }, [idx])

    const defaultHP = useSelector((state: RootState) => (state.attack.defaultHp));
    const p1Hp = useSelector((state: RootState) => (state.attack.p1Hp));
    const p2Hp = useSelector((state: RootState) => (state.attack.p2Hp));
    
    // console.log(p1Hp);
    
    const p1HpStyle = {
        width: `${p1Hp}px`,
        backgroundColor: p1Hp > defaultHP/4 ? '#FFF500' : '#FF0000' ,
    }
    const p2HpStyle = {
        width: `${p2Hp}px`,
        backgroundColor: p2Hp > defaultHP/4 ? '#FFF500' : '#FF0000' ,
    }

    return (
        <div className="attack-bg">
          <div className="attack-top-items">
            <div className='first-hp-box'>
                <ProfileHp></ProfileHp>
                <div className="first-hp-bar" style={p1HpStyle}></div>
            </div>
            <Timer time={sec}></Timer>
            <div className='second-hp-box'>
                <ProfileHp></ProfileHp>
                <div className="second-hp-bar" style={p2HpStyle}></div>
            </div>
          </div>

          <div id="percent"></div>

          
          <div className="attack-bottom-itmes">
            <div className="SpellBox">
                <img style={{ width: 800, height: 400}} src={SpellBox} alt="" />
                {myTurn ? <MyTurn selectSpell={selectSpell}></MyTurn> : <YourTurn selectSpell={selectSpell}></YourTurn>}
                {/* <div id='origin'>{spanEl}</div> */}
            </div>

            <div className="spell-bar-box">
              <img src={SkillBar} alt="" style={{width: '100%', height: '120px'}} />
              <div className="spells">
                {playersDeckList.map((c: any, index: number) => (
                  <img 
                    style={{height: '100px', margin: '10px'}}
                    key={index} 
                    src={require(`../../../assets/card/icon/${c.card?.code}.png`)} 
                    alt={c.card.code}
                  ></img>
                ))}
              </div>
            </div>

          </div>
        </div>
    )
}

export default Spell;
