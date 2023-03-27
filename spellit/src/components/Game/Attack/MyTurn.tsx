import { attackActions } from '@/store/attack';
import { RootState } from "@/store/";
import react, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WebSocketContext } from "@/store/websocket";


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
    card: SelectCardsType,
  }
  
  type PropsType = {
    props: playersDeckType,
  }

const MyTurn = (props: any) => {
    console.log('myturn으로 넘어옴');
    const dispatch = useDispatch();

    const memberId = useSelector((state: RootState) => state.user.id);
    const roomId = useSelector((state: RootState) => state.room.roomId);

    // 타이머 띄우기
    // const [sec, setSec] = useState<number>(0);
    // const sec = useSelector((state: RootState) => (state.attack.sec));

    // 타이머 사용 유무
    // const [onTimer, setOnTimer] = useState<boolean>(false);
    // const onTimer = useSelector((state: RootState) => (state.attack.onTimer));
    const { send } = useContext(WebSocketContext);

    const sendSpell = (transcript: string) => {
      send({
        event: 'spell',
        roomId: roomId,
        memberId: memberId,
        data: transcript,
      })
    };
    
    // 주문영창 스킬 리스트
    const [damageList, setDamageList] = useState<number[]>([]);

    const selectSpell = props.selectSpell;
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
    useEffect(() => {
      setSpanEl(spanList);
      return () => {
          
      }
    }, [selectSpell])

    const trimText = selectSpell.spell.replaceAll(" ", ""); // 띄어쓰기 제거한 주문
    // console.log(trimText);

    recognition.addEventListener("result", (e :any) => {
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
    dispatch(attackActions.onTimer());
    dispatch(attackActions.setSec(selectSpell.cost));
    console.log('SpeechRecognition start!')

    // 타이머
    const interval = setInterval(() => {
        dispatch(attackActions.setSec(selectSpell.cost--));
        // setSec(prevSec => prevSec - 1);
    }, 1000)
    
    // 주문 제한 시간 흐른 후 음성인식 종료
    setTimeout(() => {
        recognition.stop();
        // onnTimer(false);
        dispatch(attackActions.onTimer());
        clearInterval(interval);
        console.log('SpeechRecognition end!')
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
          console.log('correct : '+correct)
          const damage = (correct / spellLength) * selectSpell.cost * 30;
          console.log(damageList);
          console.log([...damageList, damage]);
          setDamageList([...damageList, damage]);
          console.log('damageList : '+damageList);
          const newDamageList = [...damageList, damage];
          dispatch(attackActions.p1Damage(newDamageList));
        //   setIdx(idx+1);
        }, 500)
    }, selectSpell.cost*1000); 

    return (
        <div id='origin'>{spanEl}</div>
    )
};

export default MyTurn;