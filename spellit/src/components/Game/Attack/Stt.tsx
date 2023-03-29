import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
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

const MyTurn = ({cardInfo}: cardInfoProps) => {
    console.log('선공')
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const memberId = useSelector((state: RootState) => state.user.id);
    const roomId = useSelector((state: RootState) => state.room.roomId);

    const [spanEl, setSpanEl] = useState<JSX.Element[]>([]);
    
    // if (!browserSupportsSpeechRecognition) {
        //     return <span>Browser doesn't support speech recognition.</span>;
        // }
        
    const reg = /[~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
    const spanList: JSX.Element[] = [];
    
    
    // 타이머 띄우기
    // const timer = useSelector((state: RootState) => (state.attack.sec));
    const [sec, setSec] = useState<number>(5);
    
    // console.log(trimText);
    const dispatch = useDispatch();
        
    const { send } = useContext(WebSocketContext);
    const sendSpell = (transcript: string) => {
        send({
            event: 'spell',
            roomId: roomId,
            memberId: memberId,
            data: transcript,
        })
    };
    
    
    let correct = 0;
    useEffect(() => {
        const selectSpell = cardInfo.card;
        // setSec(cardInfo.card.cost);
        // dispatch(attackActions.setSec(cardInfo.card.cost));

        console.log('stt useEffect 문 안');

        // setSec(selectSpell.cost);
        console.log('sec : ', sec);
        const trimText = selectSpell.spell.replaceAll(" ", ""); // 띄어쓰기 제거한 주문
        
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
        // console.log('spanList : ', spanList);
    
        console.log('인식 시작');
        console.log(SpeechRecognition)
        SpeechRecognition.startListening()

        // 타이머
        const interval = setInterval(() => {
            setSec(prevSec => prevSec - 1);
        }, 1000)
    
        let newTranscript = transcript.replaceAll(" ", "");
        console.log(newTranscript);
    
        console.log("------------------------------------------------");
        for (let i = 0; i < newTranscript.length; i++) {
            if (newTranscript[i] == trimText[i]) {
                // console.log('일치', newTranscript[i]);
                const element = document.getElementById(`spell-${i}`);
    
                const correctColor = `${selectSpell.code}-correct`;
                element?.classList.add(correctColor);
                correct++;
            }
        }

        // sendSpell(newTranscript);
        // console.log('sec : ', sec)
        if (sec <= 0) {
            console.log('음성인식 종료')
            SpeechRecognition.stopListening();
            clearInterval(interval);
        }
        
        
    },  [transcript]);

  return (
    <div className="attack-bg">
        <div className="attack-top-items">
            <div className='first-hp-box'>
                <ProfileHp></ProfileHp>
                {/* <div className="first-hp-bar" style={p1HpStyle}></div> */}
            </div>
            <Timer time={sec}></Timer>
            <div className='second-hp-box'>
                <ProfileHp></ProfileHp>
                {/* <div className="second-hp-bar" style={p2HpStyle}></div> */}
            </div>
            </div>

        <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        {/* <button onClick={SpeechRecognition.startListening}>Start</button> */}
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
        <div className="SpellBox">
                <img style={{ width: 800, height: 400}} src={SpellBox} alt="" />
                <div id='origin'>{spanEl}</div>
            </div>
        </div>
    </div>
  );
};
export default MyTurn;