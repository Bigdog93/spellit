import React, { useState, useEffect, useContext, memo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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


const Spell = () => {
    console.log('2. Spell 렌더링')

    const location = useLocation();
    const dispatch = useDispatch();
    
    const selectSpell = location.state.cardInfo.card;
    console.log('selectSpell : ', selectSpell);

    // 타이머 띄우기
    const sec = useSelector((state: RootState) => (state.attack.sec));

    // 타이머 사용 유무
    const onTimer = useSelector((state: RootState) => (state.attack.onTimer));

    // 주문영창 스킬 리스트
    // const [damageList, setDamageList] = useState<number[]>([]);

    const myTurn = useSelector((state: RootState) => (state.attack.myTurn));
    const playersDeckList = useSelector((state: RootState) => (state.attack.playersDeck));


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

          {/* <div id="percent"></div> */}
          
          <div className="attack-bottom-itmes">
            <div className="SpellBox">
                <img style={{ width: 800, height: 400}} src={SpellBox} alt="" />
                {/* {myTurn ? <MyTurn selectSpell={selectSpell}></MyTurn> : <YourTurn selectSpell={selectSpell}></YourTurn>} */}
                {myTurn ? <Navigate to='/myturn' state={selectSpell}></Navigate> : <Navigate to='/yourturn' state={selectSpell}></Navigate>}
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

export default memo(Spell);
