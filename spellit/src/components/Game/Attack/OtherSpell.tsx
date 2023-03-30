import { RootState } from '@/store/';
import react, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AttackType } from '@/utils/Types'

const OtherSpell = ({attack, idx}: {attack: AttackType, idx:number}) => {
    console.log('yourturn 으로 넘어옴');
    const isMine = attack.isMine
    const card = attack.card

    const transcript = useSelector((state: RootState) => (state.game.transcript));
    
    const [spanEl, setSpanEl] = useState<JSX.Element[]>([]);
    const reg = /[~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
    const spanList: JSX.Element[] = [];
  
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

    let correct = 0;
        console.log("------------------------------------------------");
        // 무한 렌더링 어쩔...
        useEffect(() => {
          for (let i = 0; i < transcript.length; i++) {
            if (transcript[i] == trimText[i]) {
                const element = document.getElementById(`spell-${i}`);
    
                const correctColor = `correct${card.attribute}`;
                element?.classList.add(correctColor);
                correct++;
            }
          }
          const correctPercent = Math.round((correct / spellLength) * 100);
          console.log(correctPercent+'%')
        }, [])

        // for (let i = 0; i < transcript.length; i++) {
        //     if (transcript[i] == trimText[i]) {
        //         const element = document.getElementById(`spell-${i}`);

        //         const correctColor = `correct${card.attribute}`;
        //         element?.classList.add(correctColor);
        //         correct++;
        //     }
        // }
        // const percentEl = document.getElementById("percent") as HTMLDivElement;
        const correctPercent = Math.round((correct / spellLength) * 100);
        console.log(correctPercent+'%')
        // percentEl.innerText = `총 ${spellLength}개 중 ${correct}개 맞음 : ${correctPercent} %`;
    
        return (
        <div id='origin'>{spanEl}</div>
    )
}

export default OtherSpell;