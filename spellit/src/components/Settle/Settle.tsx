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
    const p1Deck = useSelector((state: RootState) => (state.attack.p1Deck));
    const defaultHP = useSelector((state: RootState) => (state.attack.defaultHp));

    // const firstHp = useSelector((state: RootState) => (state.attack.firstHp));
    // const secondHp = useSelector((state: RootState) => (state.attack.secondHp));

    const p1Hp = useSelector((state: RootState) => (state.attack.p1Hp));
    const p2Hp = useSelector((state: RootState) => (state.attack.p2Hp));

    
    // console.log(firstHp);
    const damageStack = useSelector((state: RootState) => (state.attack.p1Damage));
    const [d, setD] = useState(0);
    
    const p1HpStyle = {
        width: `${p1Hp}px`,
        backgroundColor: p1Hp > defaultHP*0.3 ? '#FFF500' : '#FF0000' ,
    }
    const p2HpStyle = {
        width: `${p2Hp}px`,
        backgroundColor: p2Hp > defaultHP*0.3 ? '#FFF500' : '#FF0000' ,
    }
    
    // 데미지 정산
    // const hit = (damage: number) => {
    //     // const effectList = [...p1Deck];
    //     // 배열의 맨 처음 값을 pop
    //     // const effect = effectList.shift();
    //     // console.log(effect);
    //     console.log('이펙트 띄우기')
    //     // console.log(effect);
    //     console.log('d : ', d)
    //     const hideEffect = document.querySelector(`.${p1Deck[d]}-${d}`);
    //     // console.log(hideEffect);
    //     setTimeout(() => {
    //         hideEffect?.classList.add('hidden-effect');
    //         dispatch(attackActions.firstHit(damage));
    //         dispatch(attackActions.secondHit(damage));
            
    //         // action 이후에 state값이 바로 변경되어 반영되지 않음,, 왜일까,,?
    //         console.log('p1Hp : '+ p1Hp);
    //         console.log('p2Hp : '+ p2Hp);
    //         setTimeout(() => {
    //             console.log('얍!')
    //             setD(d+1);
    //         }, 5000)
    //     }, 5000);
    // }

    useEffect(() => {
        const damage = damageStack[d];
        
        // 스킬 이펙트 숨기는 함수
        async function hideEffect () {
            const hiddenEffect = document.querySelector(`.${p1Deck[d]}-${d}`);
            setTimeout(() => {
                hiddenEffect?.classList.add('hidden-effect');
            }, 2000);
        }
        
        // result 페이지로 이동
        async function moveResult () {
            setTimeout(() => {
                navigate('/result');
            }, 5000);
        }

        // ready 페이지로 이동
        async function moveReady () {
            setTimeout(() => {
                navigate('/ready');
            }, 3000);
        }

        // 데미지 공격하는 함수
        const hit = async (damage: number) => {
            console.log('이펙트 띄우기')
            console.log('d : ', d)
            setTimeout(() => {
                dispatch(attackActions.p1Hit(damage));
                // dispatch(attackActions.p2Hit(damage));
                
                // action 이후에 state값이 바로 변경되어 반영되지 않음,, 왜일까,,?
                console.log('p1Hp : '+ p1Hp);
                console.log('p2Hp : '+ p2Hp);
                setTimeout(() => {
                    console.log('얍!')
                    setD(d+1);
                }, 2000)
            }, 3000);
        }
        
        if (d < p1Deck.length) {
            if (p1Hp <= damage) {
                hideEffect();
                hit(p1Hp);
                moveResult();
                
            } else {
                hideEffect();
                hit(damage);
            }
        } else {
            if (p1Hp > 0) {
                moveReady();
            } else {
                hideEffect();
                hit(p1Hp);
                moveResult();
            }
        }
        
        // if (d < p1Deck.length) {
        //     if (firstHp <= damage) {
        //         hit(firstHp);
        //         setTimeout(() => {
        //             navigate('/result');
        //         }, 0);
        //     } else {
        //         hit(damage);
        //     }
        // } else {
        //     if (firstHp > 0) {
        //         setTimeout(() => {
        //             navigate('/ready');
        //         }, 0);
        //     } else {
        //         hit(firstHp);
        //         setTimeout(() => {
        //             navigate('/result');
        //         }, 0);
        //     }
        // }

    }, [d]);

    return (
        <div className='settle-bg'>
            <div className='settle-top-itmes'>
                <div className='first-hp-box'>
                    <ProfileHp></ProfileHp>
                    <div className="first-hp-bar" style={p1HpStyle}></div>
                </div>
                <div className='second-hp-box'>
                    <ProfileHp></ProfileHp>
                    <div className="second-hp-bar" style={p2HpStyle}></div>
                </div>
            </div>
            <div className='settle-bottom-items'>
                <div style={{display: 'inline-flex'}}>
                    <div className='first-player-effects'>
                        {/* {p1Deck.map((card: string, index: number) => {
                            return (
                            <img className={`${card}-${index}`}
                            style={{height: '150px', margin: '10px',}}
                            key={index} 
                            src={require(`../../assets/effect/${card}.png`)} 
                            alt='' />)}
                        )} */}
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
