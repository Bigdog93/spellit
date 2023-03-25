import react, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { attackActions } from '@/store/attack';
import { RootState } from "@/store/";

import ProfileHp from '../Game/Items/ProfileHp';

import "./Settle.css";
import LUNA_attack from '../../assets/character/LUNA_attack.png';
import AK_attack from '../../assets/character/AK_attack.png';

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
        // const effectList = [...chooseCards];
        // 배열의 맨 처음 값을 pop
        // const effect = effectList.shift();
        // console.log(effect);
        console.log('이펙트 띄우기')
        // console.log(effect);
        console.log('d : ', d)
        const hideEffect = document.querySelector(`.${chooseCards[d]}-${d}`);
        // console.log(hideEffect);
        setTimeout(() => {
            hideEffect?.classList.add('hidden-effect');
            dispatch(attackActions.firstHit(damage));
            dispatch(attackActions.secondHit(damage));
            
            // action 이후에 state값이 바로 변경되어 반영되지 않음,, 왜일까,,?
            console.log('firstHp : '+ firstHp);
            console.log('secondHP : '+ secondHp);
            setTimeout(() => {
                console.log('얍!')
                setD(d+1);
            }, 1000)
        }, 1500);
    }

    useEffect(() => {
        console.log('d : '+d);
        const damage = damageStack[d];

        if (firstHp > 0 && d < chooseCards.length) {
            if (firstHp <= damage) {
                hit(firstHp);
                navigate('/result');
            }
            hit(damage);
        } else if ( d >= chooseCards.length) {
            hit(damage)
            navigate('/ready');
        }
    }, [d]);

    return (
        <div className='settle-bg'>
            <div className='settle-top-itmes'>
                <div className='first-hp-box'>
                    <ProfileHp></ProfileHp>
                    <div className="first-hp-bar" style={firstHpStyle}></div>
                </div>
                <div className='second-hp-box'>
                    <ProfileHp></ProfileHp>
                    <div className="second-hp-bar" style={secondHpStyle}></div>
                </div>
            </div>
            <div className='settle-bottom-items'>
                <div style={{display: 'inline-flex'}}>
                    <div>
                        <span className='first-player-effects'>
                            {chooseCards.map((card: string, index: number) => {
                                return (
                                <img className={`${card}-${index}`}
                                style={{height: '150px', margin: '10px',}}
                                key={index} 
                                src={require(`../../assets/effect/${card}.png`)} 
                                alt='' />)}
                            )}
                        </span>                    
                    </div>
                    <img className='first-player' src={AK_attack} alt="" style={{width: '300px', height: '400px'}}/>
                </div>
                <div>
                    <img className='second-player' src={LUNA_attack} alt="" style={{width: '350px', height: '450px'}}/>
                </div>
            </div>
        </div>
    )
}

export default Settle;