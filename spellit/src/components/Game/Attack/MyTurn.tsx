import { attackActions } from '@/store/attack';
import { RootState } from "@/store/";
import react, { useState, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WebSocketContext } from "@/store/websocket";
import { useLocation, useNavigate } from 'react-router-dom';
import SpellBox from "../../../assets/InGame/SpellBox.png";
import SkillBar from "../../../assets/InGame/SkillBar.png";
import ProfileHp from "../Items/ProfileHp";
import Timer from "../Items/Timer";

import { PlayersDeckType } from './index';

type cardInfoProps = {
  cardInfo: PlayersDeckType
}

const MyTurn = ( { cardInfo }: cardInfoProps) => {
    console.log('My Turn 렌더링')
    console.log('myturn으로 넘어옴');
    console.log('cardInfo : ', cardInfo);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const myTurn = useSelector((state: RootState) => (state.attack.myTurn));
    const playersDeckList = useSelector((state: RootState) => (state.attack.playersDeck));

    const memberId = useSelector((state: RootState) => state.user.id);
    const roomId = useSelector((state: RootState) => state.room.roomId);

    const { send } = useContext(WebSocketContext);

    const sendSpell = (transcript: string) => {
      send({
        event: 'spell',
        roomId: roomId,
        memberId: memberId,
        data: transcript,
      })
    };

    // 타이머 띄우기
    const [sec, setSec] = useState<number>(0);
    // const sec = useSelector((state: RootState) => (state.attack.sec));

    // 타이머 사용 유무
    // const [onTimer, setOnTimer] = useState<boolean>(false);
    // const onTimer = useSelector((state: RootState) => (state.attack.onTimer));
    
    // 주문영창 스킬 리스트
    const [damageList, setDamageList] = useState<number[]>([]);

    const [spanEl, setSpanEl] = useState<JSX.Element[]>([]);
    
    const selectSpell = cardInfo.card;

    // useEffect(() => {
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
    
    const reg = /[~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
    const spanList: JSX.Element[] = [];
  
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
    console.log('spanList : ', spanList);
    
    const trimText = selectSpell.spell.replaceAll(" ", ""); // 띄어쓰기 제거한 주문
    console.log(trimText);
    
    
      console.log('myturn useEffect 문 안');
      // setSpanEl(spanList);
      // setSec(selectSpell.cost);

      const sttStart = async () => {
        recognition.addEventListener("result", (e :any) => {
            console.log('recongnition e: ', e);
            console.log("말하는 중이잖아요?");
            let transcript = e.results[0][0].transcript; // 인식된 음성 글자
            transcript = transcript.replaceAll(" ", ""); // 띄어쓰기 제거한 음성 인식 글자
            console.log(transcript);
    
            sendSpell(transcript);
            dispatch(attackActions.attackInfo(transcript));
    
            let correct = 0;
            console.log("------------------------------------------------");
            for (let i = 0; i < transcript.length; i++) {
                if (transcript[i] == trimText[i]) {
                    const element = document.getElementById(`spell-${i}`);
    
                    const correctColor = `${selectSpell.code}-correct`;
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
        console.log('SpeechRecognition start!')
        dispatch(attackActions.onTimer());
        dispatch(attackActions.setSec(selectSpell.cost));
        
  
        // 타이머
        // const sec = useSelector((state: RootState) => (state.attack.sec));
        // const interval = setInterval(() => {
        //     dispatch(attackActions.setSec(sec-1));
        //     setSec(prevSec => prevSec - 1);
        // }, 1000)
        
        // 주문 제한 시간 흐른 후 음성인식 종료
        setTimeout(() => {
          recognition.stop();
          // onnTimer(false);
          dispatch(attackActions.onTimer());
          // clearInterval(interval);
          console.log('SpeechRecognition end!')
          
          // dispatch(attackActions.movePageCnt(idx+1));

          // dispatch(attackActions.endStt(true));
          
          // navigate('/attack');
  
            // class 속성 제거하기
            let correct = 0;
            setTimeout(() => {
              for (let j=0; j<selectSpell.spell.length; j++) {
                const spellClass = document.getElementById(`spell-${j}`);
                if (spellClass?.classList.contains(`${selectSpell.code}-correct`)) {
                  spellClass?.classList.remove(`${selectSpell.code}-correct`)
                  correct++;
                }
              }
              // 하드코딩됨,,
              // 주문 영창 후 맞은 개수만큼 데미지화 하기
              // const damage = [(cnt / spellLength) * selectSpell.time * 30, 50, 100];
              // console.log('correct : '+correct)
              // const damage = (correct / spellLength) * selectSpell.cost * 30;
              // console.log(damageList);
              // console.log([...damageList, damage]);
              // setDamageList([...damageList, damage]);
              // console.log('damageList : '+damageList);
              // const newDamageList = [...damageList, damage];
              // dispatch(attackActions.p1Damage(newDamageList));
              //   setIdx(idx+1);.
            }, 500)
          }, selectSpell.cost*1000); 
      }

        sttStart();
          
    // }, [])

    // console.log(tmp.current)

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
              <div id='origin'>{spanEl}</div>
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
};

export default MyTurn;