import { RootState } from '@/store/';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const YourTurn = (props: any) => {
    console.log('yourturn 으로 넘어옴');
    const selectSpell = props.selectSpell;
    console.log('selectSpell in YourTurn: ', selectSpell);

    const transcript = useSelector((state: RootState) => (state.attack.transcript));

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

    useEffect(() => {
        setSpanEl(spanList);
        return () => {
            
        }
    }, [selectSpell])
    
    return (
        <div id='origin'>{spanEl}</div>
    )
}

export default YourTurn;