import { RootState } from '@/store/';
import { attackActions } from '@/store/attack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import SpellBox from "../../../assets/InGame/SpellBox.png";
import SkillBar from "../../../assets/InGame/SkillBar.png";
import ProfileHp from "../Items/ProfileHp";
import Timer from "../Items/Timer";

import { PlayersDeckType } from './index';

type cardInfoProps = {
  cardInfo: PlayersDeckType
}

const YourTurn = ({cardInfo}: cardInfoProps) => {
    console.log('후공')
    console.log('YourTurn 렌더링')
    console.log('yourturn 으로 넘어옴');

    const dispatch = useDispatch();
    // dispatch(attackActions.movePageCnt(2));
    // const playersDeckList = useSelector((state: RootState) => (state.attack.playersDeck));

    const navigate = useNavigate();
    
    
    const [spanEl, setSpanEl] = useState<JSX.Element[]>([]);
    const reg = /[~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
    const spanList: JSX.Element[] = [];
    
    // 타이머 띄우기
    const timer = useSelector((state: RootState) => (state.attack.sec));
    const [sec, setSec] = useState<number>(timer);
    
    // const [trans, SetTrans] = useState<string>('');

    const transcript = useSelector((state: RootState) => (state.attack.transcript));
    useEffect(() => {

        const selectSpell = cardInfo.card;
        console.log('selectSpell in YourTurn: ', selectSpell);

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
    
                const correctColor = `${selectSpell.code}-correct`;
                element?.classList.add(correctColor);
                correct++;
            }
        }
        // const percentEl = document.getElementById("percent") as HTMLDivElement;
        const correctPercent = Math.round((correct / spellLength) * 100);
        console.log(correctPercent+'%')
        // percentEl.innerText = `총 ${spellLength}개 중 ${correct}개 맞음 : ${correctPercent} %`;
        
        // 타이머
        const interval = setInterval(() => {
            setSec(prevSec => prevSec - 1);
        }, 1000)

        if (sec <= 0) {
            console.log('제한시간종료')
            clearInterval(interval);
            setSec(0);
            // navigate('/ready')
            dispatch(attackActions.endStt(true))
        }


    }, [transcript])

    // const idx = useSelector((state: RootState) => (state.attack.movePageCnt));
    // const timer = useSelector((state: RootState) => (state.attack.sec))
    // if (timer <= 0) {
    //     // dispatch(attackActions.movePageCnt(idx+1));
    //     navigate('/attack');
    // }
  
    
    // const defaultHP = useSelector((state: RootState) => (state.attack.defaultHp));
    // const p1Hp = useSelector((state: RootState) => (state.attack.p1Hp));
    // const p2Hp = useSelector((state: RootState) => (state.attack.p2Hp));
    
    // // console.log(p1Hp);
    
    // const p1HpStyle = {
    //     width: `${p1Hp}px`,
    //     backgroundColor: p1Hp > defaultHP/4 ? '#FFF500' : '#FF0000' ,
    // }
    // const p2HpStyle = {
    //     width: `${p2Hp}px`,
    //     backgroundColor: p2Hp > defaultHP/4 ? '#FFF500' : '#FF0000' ,
    // }

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

        {/* <div id="percent"></div> */}
        
        <div className="attack-bottom-itmes">
          <div className="SpellBox">
              <img style={{ width: 800, height: 400}} src={SpellBox} alt="" />
              <div id='origin'>{spanEl}</div>
          </div>

          <div className="spell-bar-box">
            <img src={SkillBar} alt="" style={{width: '100%', height: '120px'}} />
            {/* <div className="spells">
              {playersDeckList.map((c: any, index: number) => (
                <img 
                  style={{height: '100px', margin: '10px'}}
                  key={index} 
                  src={require(`../../../assets/card/icon/${c.card?.code}.png`)} 
                  alt={c.card.code}
                ></img>
              ))}
            </div> */}
          </div>
        </div>
      </div>
  )
}

export default YourTurn;