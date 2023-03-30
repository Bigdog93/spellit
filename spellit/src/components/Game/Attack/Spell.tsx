import { useState, useEffect, useContext } from "react";
import { AttackType, CardType } from '@/utils/Types'
import { useDispatch, useSelector } from "react-redux";

import { RootState } from '@/store'
import { WebSocketContext } from '@/store/websocket'

import './Spell.css'
import Timer from "@/components/Game/Items/Timer";
import { gameActions } from "@/store/game";

interface Spell {
    name: string;
    content: string;
    time: number;
}

const Spell = ({attack}: {attack: AttackType}) => {
  const dispatch = useDispatch();
  const { send } = useContext(WebSocketContext);

  const roomId = useSelector((state: RootState) => state.room.roomId)
  const memberId = useSelector((state: RootState) => state.user.id)


  console.log('attack ', attack)
  console.log('spell ', attack.card.spell)
  
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

  // 주문 버튼 클릭시 음성 인식 시작
  const handleClick = (attack: AttackType) => {
    const isMine = attack.isMine
    const card = attack.card
    let spellLength = 0; // 띄어쓰기 제거한 주문의 길이
    for (let i = 0; i < card.spell.length; i++) {
        if (!card.spell[i].match(reg)) {
        spellLength++;
        }
        let spanClassName = `spell`;
        if (card.spell[i] != " ") {
        spanClassName = `spell-${spellLength - 1}`;
        }
        const newSpanEl = <span id={spanClassName}>{card.spell[i]}</span>; // spanEl에 id 값 넣어주기
        spanList.push(newSpanEl);
    }
    setSpanEl(spanList);

    const trimText = card.spell.replaceAll(" ", ""); // 띄어쓰기 제거한 주문
    // console.log(trimText);

    recognition.addEventListener("result", (e) => {
        console.log("말하는 중이잖아요?");
        console.log(e)
        let transcript = e.results[0][0].transcript; // 인식된 음성 글자
        transcript = transcript.replaceAll(" ", ""); // 띄어쓰기 제거한 음성 인식 글자
        console.log(transcript);
        if (isMine){
          // let transcript = e.results[0][0].transcript; // 인식된 음성 글자
          // transcript = transcript.replaceAll(" ", ""); // 띄어쓰기 제거한 음성 인식 글자
          // console.log(transcript);
          send({
            event: 'spell',
            roomId: roomId,
            memberId: memberId,
            data:  transcript,
          })
          console.log(transcript)
        } else {
          console.log('isMine은 false다.')
        }

        let correct = 0;
        console.log("------------------------------------------------");
        for (let i = 0; i < transcript.length; i++) {
            if (transcript[i] == trimText[i]) {
                const element = document.getElementById(`spell-${i}`);

                const correctColor = `correct${card.attribute}`;
                element?.classList.add(correctColor);
                correct++;
            }
        }
        const percentEl = document.getElementById("percent") as HTMLDivElement;
        const correctPercent = Math.round((correct / spellLength) * 100);
        percentEl.innerText = `총 ${spellLength}개 중 ${correct}개 맞음 : ${correctPercent} %`;
    });

    // 음성 인식 시작
    recognition.start();
    setSec(card.cost);
    console.log('SpeechRecognition start!')

    // 타이머
    const interval = setInterval(() => {
        setSec(sec - 1);
    }, 1000)
    
    // 주문 제한 시간 흐른 후 음성인식 종료
    setTimeout(() => {
        recognition.stop();
        clearInterval(interval);
        console.log('SpeechRecognition end!')
        dispatch(gameActions.setIdx())

    }, card.cost*1000);
    
  };

  useEffect(()=>{
    handleClick(attack)
  }, [attack])


  return (
      <>
        <Timer time={sec}></Timer>
        {/* <button onClick={() => {handleClick(sparkSpell)}}>뇌전의 창</button>
        <button onClick={() => {handleClick(iceSpell)}}>영원의 동토</button>
        <button onClick={() => {handleClick(stormSpell)}}>남양의 폭풍</button>
        <button onClick={() => {handleClick(fireSpell)}}>화염탄</button>
        <button onClick={() => {handleClick(lightSpell)}}>멸마의 성휘</button>
        <button onClick={() => {handleClick(darkSpell)}}>무광의 심연</button>
        <button onClick={() => {handleClick(windSpell)}}>풍화의 검</button>
        <br /> */}
        <div className="SpellBox">
          <img style={{ width: 800, height: 400}} src="assets/InGame/SpellBox.png" alt="" />
          <div id='origin'>{spanEl}</div>
        </div>
        <div className="words"></div>
        <div id="percent"></div>
      </>
  )
}

export default Spell;
