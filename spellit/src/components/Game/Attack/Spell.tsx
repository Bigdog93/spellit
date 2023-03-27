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
import { useSurfaceSampler } from "@react-three/drei";

type SelectCardsType = {
  id : number,
  code : string,
  title : string,
  spell : string,
  cost : number,
  damage : number,
  attribute : number,
}

type playersDeckType = {
  isMine: boolean,
  cards: SelectCardsType,
}

type PropsType = {
  cardInfo: playersDeckType,
}


const Spell = (props: PropsType) => {
    const selectSpell = props.cardInfo.cards;
    const { send } = useContext(WebSocketContext);
    const memberId = useSelector((state: RootState) => state.user.id);
    const roomId = useSelector((state: RootState) => state.room.roomId);

    const sendSpell = (transcript: string) => {
      send({
        event: 'spell',
        roomId: roomId,
        memberId: memberId,
        data: transcript,
      })
    };

    const myTurn = useSelector((state: RootState) => (state.attack.myTurn));
    const playersDeckList = useSelector((state: RootState) => (state.attack.playersDeck));

    // const myDeckList = useSelector((state: RootState) => state.attack.p1Deck);
    // const otherDeckList = useSelector((state: RootState) => (state.attack.p2Deck));

    const dispatch = useDispatch();

    //@ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
    // 인스턴스 생성
    const recognition = new SpeechRecognition();
  
    // true면 말을 실시간으로 출력 false면 말을 마친 후에 출력
    recognition.interimResults = true;
    // 값이 없으면 HTML의 <html lang="en">을 참고합니다. ko-KR, en-US
    recognition.lang = "ko-KR";
    // true means continuous, and false means not continuous (single result each time.)
    // true면 음성 인식이 안 끝나고 계속 됩니다.
    recognition.continuous = true;
    // 숫자가 작을수록 발음대로 적고, 크면 문장의 적합도에 따라 알맞은 단어로 대체합니다.
    // maxAlternatives가 크면 이상한 단어도 문장에 적합하게 알아서 수정합니다.
    recognition.maxAlternatives = 0;
  
    const [spanEl, setSpanEl] = useState<JSX.Element[]>([]);
    const reg = /[~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;

    const spanList: JSX.Element[] = [];

    // 타이머 띄우기
    const [sec, setSec] = useState<number>(0);

    // 타이머 사용 유무
    const [onTimer, setOnTimer] = useState<boolean>(false);

    // 주문영창 스킬 리스트
    const [damageList, setDamageList] = useState<number[]>([]);

    // 주문 영창 시 맞은 단어 갯수
    // const [correct, setCorrect] = useState<number>(0);

    
    const transcript = useSelector((state: RootState) => (state.attack.transcript));

    const SpellIt = async (selectSpell: SelectCardsType, idx:number) => {
      
        let spellLength = 0; // 띄어쓰기 제거한 주문의 길이
        for (let i = 0; i < selectSpell.spell.length; i++) {
            if (!selectSpell.spell[i].match(reg)) {
            spellLength++;
            }
            let spanClassName = `spell`;
            if (selectSpell.spell[i] != " ") {
            spanClassName = `spell-${spellLength - 1}`;
            }
            const newSpanEl = <span id={spanClassName}>{selectSpell.spell[i]}</span>; // spanEl에 id 값 넣어주기
            spanList.push(newSpanEl);
        }
        setSpanEl(spanList);

        const trimText = selectSpell.spell.replaceAll(" ", ""); // 띄어쓰기 제거한 주문
        // console.log(trimText);

        recognition.addEventListener("result", (e :any) => {
            console.log("말하는 중이잖아요?");
            let transcript = e.results[0][0].transcript; // 인식된 음성 글자
            transcript = transcript.replaceAll(" ", ""); // 띄어쓰기 제거한 음성 인식 글자
            console.log(transcript);

            dispatch(attackActions.attackInfo(transcript));

            let correct = 0;
            console.log("------------------------------------------------");
            for (let i = 0; i < transcript.length; i++) {
                if (transcript[i] == trimText[i]) {
                    const element = document.getElementById(`spell-${i}`);

                    const correctColor = `${selectSpell.title}-correct`;
                    element?.classList.add(correctColor);
                    correct++;
                }
            }
            const percentEl = document.getElementById("percent") as HTMLDivElement;
            const correctPercent = Math.round((correct / spellLength) * 100);
            console.log(correctPercent+'%')
            percentEl.innerText = `총 ${spellLength}개 중 ${correct}개 맞음 : ${correctPercent} %`;
        });

        // 음성 인식 시작
        recognition.start();
        setOnTimer(true);
        dispatch(attackActions.onTimer(true));
        setSec(selectSpell.cost);
        console.log('SpeechRecognition start!')

        // 타이머
        const interval = setInterval(() => {
            setSec(prevSec => prevSec - 1);
        }, 1000)
        
        // 주문 제한 시간 흐른 후 음성인식 종료
        setTimeout(() => {
            recognition.stop();
            setOnTimer(false);
            dispatch(attackActions.onTimer(false));
            clearInterval(interval);
            console.log('SpeechRecognition end!')
            // class 속성 제거하기
            let correct = 0;
            setTimeout(() => {
              for (let j=0; j<selectSpell.spell.length; j++) {
                const spellClass = document.getElementById(`spell-${j}`);
                if (spellClass?.classList.contains(`${selectSpell.title}-correct`)) {
                  spellClass?.classList.remove(`${selectSpell.title}-correct`)
                  correct++;
                }
              }
              // 하드코딩됨,,
              // 주문 영창 후 맞은 개수만큼 데미지화 하기
              // const damage = [(cnt / spellLength) * selectSpell.time * 30, 50, 100];
              console.log('correct : '+correct)
              const damage = (correct / spellLength) * selectSpell.cost * 30;
              console.log(damageList);
              console.log([...damageList, damage]);
              setDamageList([...damageList, damage]);
              console.log('damageList : '+damageList);
              const newDamageList = [...damageList, damage];
              dispatch(attackActions.p1Damage(newDamageList));
              setIdx(idx+1);
            }, 500)
        }, selectSpell.cost*1000); 

    };

    const navigate = useNavigate();
    const [idx, setIdx] = useState(0);
    useEffect(() => {
      // console.log(idx);
      // if (fire1.name == myDeckList[idx]) {
      //   SpellIt(fire1, idx);
      // } else if (ice1.name == myDeckList[idx]) {
      //   SpellIt(ice1, idx);
      // } else if (wind1.name == myDeckList[idx]) {
      //   SpellIt(wind1, idx);
      // } else if (light1.name == myDeckList[idx]) {
      //   SpellIt(light1, idx);
      // } else if (dark1.name == myDeckList[idx]) {
      //   SpellIt(dark1, idx);
      // } else if (wind3.name == myDeckList[idx]) {
      //   SpellIt(wind3, idx);
      // } else if (storm1.name == myDeckList[idx]) {
      //   SpellIt(storm1, idx);
      // }
      if (myTurn) {
        SpellIt(playersDeckList[idx].cards, idx);
        sendSpell(transcript);
      } else {

        let spellLength = 0; // 띄어쓰기 제거한 주문의 길이
        for (let i = 0; i < selectSpell.spell.length; i++) {
            if (!selectSpell.spell[i].match(reg)) {
            spellLength++;
            }
            let spanClassName = `spell`;
            if (selectSpell.spell[i] != " ") {
            spanClassName = `spell-${spellLength - 1}`;
            }
            const newSpanEl = <span id={spanClassName}>{selectSpell.spell[i]}</span>; // spanEl에 id 값 넣어주기
            spanList.push(newSpanEl);
        }
        setSpanEl(spanList);

        const trimText = selectSpell.spell.replaceAll(" ", ""); // 띄어쓰기 제거한 주문
        let correct = 0;
            console.log("------------------------------------------------");
            for (let i = 0; i < transcript.length; i++) {
                if (transcript[i] == trimText[i]) {
                    const element = document.getElementById(`spell-${i}`);

                    const correctColor = `${selectSpell.title}-correct`;
                    element?.classList.add(correctColor);
                    correct++;
                }
            }
            const percentEl = document.getElementById("percent") as HTMLDivElement;
            const correctPercent = Math.round((correct / spellLength) * 100);
            console.log(correctPercent+'%')
            percentEl.innerText = `총 ${spellLength}개 중 ${correct}개 맞음 : ${correctPercent} %`;
      }

      if (idx == playersDeckList.length) {
        navigate('/settle');
      }
        
        // 주문 삭제하기
        // if (idx == myDeckList.length) {
        //   const spell = document.querySelectorAll('span')
        //   for (let i=0; i<spell.length; i++) {
        //     spell[i].remove()
        //   }
          
        //   const percent = document.querySelector("percent") as HTMLDivElement;
        //   percent.remove()

        // }
    }, [idx])

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
                <div id='origin'>{spanEl}</div>
            </div>

            <div className="spell-bar-box">
              <img src={SkillBar} alt="" style={{width: '100%', height: '120px'}} />
              <div className="spells">
                {playersDeckList.map((cardInfo: playersDeckType, index: number) => (
                  <img 
                    style={{height: '100px', margin: '10px'}}
                    key={index} 
                    src={require(`../../../assets/card/icon/${cardInfo.cards.title}.png`)} 
                    alt={cardInfo.cards.title}
                  ></img>
                ))}
              </div>
            </div>

          </div>
        </div>
    )
}

export default Spell;
