import react, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { attackActions } from '@/store/attack';
import { RootState } from "@/store/";
import HpBar from '../Game/Items/HpBar';

import "./Settle.css";

function Settle() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 주문 영창에 대한 처리된 데미지 값을 서버에서 받아서 이펙트 효과와 함께 데미지값으로 넘겨주기
    const chooseCards = useSelector((state: RootState) => (state.attack.chooseCards));
    const defaultHP = useSelector((state: RootState) => (state.attack.defaultHp));
    const firstHp = useSelector((state: RootState) => (state.attack.firstHp));
    const secondHp = useSelector((state: RootState) => (state.attack.secondHp));
    
    // console.log(firstHp);
    
    const firstHpStyle = {
        width: `${(100 * (firstHp / defaultHP))}%`,
        backgroundColor: firstHp > defaultHP*0.3 ? '#FFF500' : '#FF0000' ,
    }
    const secondHpStyle = {
        width: `${(100 * (firstHp / defaultHP))}%`,
        backgroundColor: secondHp > defaultHP*0.3 ? '#FFF500' : '#FF0000' ,
    }

    const damageStack = [100, 100, 100];
    const [d, setD] = useState(0);

    // 데미지 정산
    const hit = (damage: number) => {
        dispatch(attackActions.firstHit(damage));
        dispatch(attackActions.secondHit(damage));
        // action 이후에 state값이 바로 변경되어 반영되지 않음,, 왜일까,,?
        console.log('firstHp : '+firstHp);
        console.log('secondHP : '+secondHp);
        setTimeout(() => {
            console.log('얍!'+ d)
            setD(d+1);
        }, 1000)
    }
    
    useEffect(() => {
        const damage = damageStack[d];
        if (firstHp > damage && d < damageStack.length) {
            hit(damage);
        } else if (firstHp <= damage) {
            hit(firstHp);
            navigate('/result');
        } else if ( d >= damageStack.length) {
            navigate('/ready');
        }
    }, [d]);

    return (
        <div className='settle-bg'>
            <div className='settle-top-itmes'>
                <div className='first-hp-box'>
                    <HpBar></HpBar>
                    <div className="first-hp-bar" style={firstHpStyle}></div>
                </div>
                <div className='second-hp-box'>
                    <HpBar></HpBar>
                    <div className="second-hp-bar" style={secondHpStyle}></div>
                </div>
            </div>
        </div>
    )
}

export default Settle;