import react, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { attackActions } from '@/store/attack';
import { RootState } from "@/store/";
import HpBar from '../Game/Items/HpBar';

import "./Settle.css";

function Settle() {
    const dispatch = useDispatch();

    const firstHp = useSelector((state: RootState) => (state.attack.firstHp));
    const secondHp = useSelector((state: RootState) => (state.attack.secondHp));
    
    // console.log(firstHp);
    
    const firstHpStyle = {
        width: `${firstHp}px`,
        backgroundColor: firstHp > 150 ? '#FFF500' : '#FF0000' ,
    }
    const secondHpStyle = {
        width: `${secondHp}px`,
        backgroundColor: secondHp > 150 ? '#FFF500' : '#FF0000' ,
    }

    const damageStack = [100, 200, 50, 20];
    const [d, setD] = useState(0);

    // 데미지 정산
    const hit = (damage: number) => {
        dispatch(attackActions.firstHit(damage));
        dispatch(attackActions.secondHit(damage));
        // action 이후에 state값이 바로 변경되어 반영되지 않음,, 왜일까,,?
        console.log('firstHp : '+firstHp);
        console.log('secondHP : '+secondHp);
        setTimeout(() => {
            console.log('얍!')
            setD(d+1);
        }, 2000)
    }

    useEffect(() => {
        const damage = damageStack[d];
        if (firstHp > damage) {
            hit(damageStack[d])
        }
    }, [d]);

    return (
        <div className='settle-bg'>
            <div className='first-hp-box'>
                <HpBar></HpBar>
                <div className="hp-bar" style={firstHpStyle}></div>
            </div>
            <div className='second-hp-box'>
                <HpBar></HpBar>
                <div className="hp-bar" style={secondHpStyle}></div>
            </div>
        </div>
    )
}

export default Settle;