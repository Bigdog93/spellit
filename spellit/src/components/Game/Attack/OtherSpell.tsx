import { useState, useEffect, useContext, useRef } from "react";
import { AttackType, CardType } from '@/utils/Types'
import { useDispatch, useSelector } from "react-redux";

import { RootState } from '@/store'
import { WebSocketContext } from '@/store/websocket'

import './Spell.css'
import Timer from "@/components/Game/Items/Timer";
import { gameActions } from "@/store/game";
import ProfileHp from "../Items/ProfileHp";
import Particle from "../../Test/Particle"

interface Spell {
    name: string;
    content: string;
    time: number;
}

const Spell = ({attack, idx}: {attack: AttackType, idx: number}) => {
  const dispatch = useDispatch();
  const { send } = useContext(WebSocketContext);

  const roomId = useSelector((state: RootState) => state.room.roomId)
  const memberId = useSelector((state: RootState) => state.user.id)
  const p1Character = useSelector((state: RootState) => state.player.p1!.gameCharacterEntity.englishName);
  const p2Character = useSelector((state: RootState) => state.player.p2!.gameCharacterEntity.englishName);

  const comboTurn = useSelector((state: RootState) => state.game.comboTurn)
  const attackCardList = useSelector((state: RootState) => state.game.attacks);

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
  // const sec = useRef<number>(attack.card.cost);
  const [sec, setSec] = useState<number>(0);

  // 이번 턴의 전체 공격 카드 수
  const attacks = useSelector((state: RootState) => (state.game.attacks));
  // const card = attack.card
  // const isMine = attack.isMine


  // // 주문 버튼 클릭시 음성 인식 시작
  const handleClick = (attack: AttackType) => {
    const isMine = attack.isMine
    const card = attack.card
    let spellLength = 0; // 띄어쓰기 제거한 주문의 길이
    for (let i = 0; i < card.spell.length; i++) {
      let spanClassName = `spell`;
        if (!card.spell[i].match(reg)) {
        spellLength++;
        spanClassName = `spell-${spellLength - 1}`;
        }
        // if (card.spell[i] != reg) {
        // }
        const newSpanEl = <span key={i} id={spanClassName}>{card.spell[i]}</span>; // spanEl에 id 값 넣어주기
        spanList.push(newSpanEl);
    }
    setSpanEl(spanList);

    setSec(card.cost);

    // 타이머
    const interval = setInterval(() => {
        setSec(sec => sec-1);
        // sec.current -= 1;
        console.log('============')
        console.log('sec : ', sec)
        console.log('============')
    }, 1000)
    


    // 주문 제한 시간 흐른 후 음성인식 종료
    setTimeout(() => {
        // recognition.stop();
        clearInterval(interval);

        ///////////////////////////// 콤보 체크 /////////////////////////////
        if(comboTurn) {
          // 상대방이 콤보 턴 일 때
          setTimeout(() => {
            console.log('내 턴 아닌 콤보 카운트 끝~~')
            dispatch(gameActions.setIdx())
            dispatch(gameActions.endCombo())
          }, 10000)
        }

    }, card.cost*1000);
      
  };

  useEffect(()=>{
    handleClick(attack);
  }, [attack])

    const defaultHP = useSelector((state: RootState) => (state.attack.defaultHp));
    const p1Hp = useSelector((state: RootState) => (state.player.p1!.hp));
    const p2Hp = useSelector((state: RootState) => (state.player.p2!.hp));
    
    // console.log(p1Hp);
    
    const p1HpStyle = {
        width: `${p1Hp/defaultHP*385}px`,
        backgroundColor: p1Hp > 100 ? '#FFF500' : '#FF0000' ,
    }
    const p2HpStyle = {
        width: `${p2Hp/defaultHP*385}px`,
        backgroundColor: p2Hp > 100 ? '#FFF500' : '#FF0000' ,
    }


  return (
      <div className="attack-bg">
        <div className="attack-top-items">
          <div className='first-hp-box'>
              <ProfileHp character={p1Character}></ProfileHp>
              <div className="first-hp-bar" style={p1HpStyle}></div>
            </div>
            <Timer time={sec}></Timer>
            <div className='second-hp-box'>
              <ProfileHp character={p2Character}></ProfileHp>
              <div className="second-hp-bar" style={p2HpStyle}></div>
          </div>
        </div>

        <div className="attack-bottom-itmes">
          {attack.isMine && <img className="myCharacter" style={{width: '400px'}} src={require(`../../../assets/character/${p1Character}_attack.png`)} alt="" /> }
          <div className="SpellandBar">
            <div className="SpellBox">
              <img style={{ width: 800, height: 400}} src={require(`../../../assets/InGame/SpellBox.png`)} alt="" />
              <div id='origin'>{spanEl}</div>
            </div>
            <div className="spell-bar-box">
              <img src={require(`../../../assets/InGame/SkillBar.png`)} alt="" style={{width: '100%', height: '140px'}} />
              <div className="cardList">
                {attackCardList.map((card: AttackType, idx: number) => (
                  !(card.isMine) && <img style={{width: '100px', margin: "10px"}} key={idx} src={require(`../../../assets/card/icon/${card.card.code}.png`)} alt="" />
                ))}
              </div>
            </div>
          </div>
          {!attack.isMine && <img className="yourCharacter" style={{width: '400px'}} src={require(`../../../assets/character/${p2Character}_attack.png`)} alt="" /> }
        </div>
        {/* <div className="otherSpellParticle">
          <Particle/>
        </div> */}
      </div>
  )
}

export default Spell;
