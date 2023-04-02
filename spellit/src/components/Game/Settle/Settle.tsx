import React, {useState, useContext, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import attack, { attackActions } from '@/store/attack';
import { RootState } from "@/store/";
import { AttackType } from '@/utils/Types'
import { WebSocketContext } from '@/store/websocket'

import ProfileHp from '../Items/ProfileHp';

import "./Settle.css";
import player, { playerActions } from '@/store/player';
import { settleActions } from '@/store/settle';
import { gameActions } from '@/store/game';

const Settle = () => {
    const dispatch = useDispatch();

    const { send } = useContext(WebSocketContext);

    const roomId = useSelector((state: RootState) => state.room.roomId)
    const memberId = useSelector((state: RootState) => state.user.id)

    const p1Character = useSelector((state: RootState) => state.player.p1!.gameCharacterEntity.englishName);
    const p2Character = useSelector((state: RootState) => state.player.p2!.gameCharacterEntity.englishName);

    const defaultHP = useSelector((state: RootState) => (state.attack.defaultHp));

    const p1Hp = useSelector((state: RootState) => (state.player.p1!.hp));
    const p2Hp = useSelector((state: RootState) => (state.player.p2!.hp));

    const p1Deffense = useSelector((state: RootState) => (state.settle.p1Deffense));
    const p2Deffense = useSelector((state: RootState) => (state.settle.p2Deffense));

    const attacks = useSelector((state: RootState) => (state.game.attacks));

    const percentList = useSelector((state: RootState) => (state.settle.percentList));
    console.log('percentList : ', percentList);

    const settleTurn = useSelector((state: RootState) => state.game.settleTurn)
    console.log('Settle에서 찍히는 settleTurn: ', settleTurn)

    // const idx = useSelector((state: RootState) => (state.game.idx));
    const [idx, setIdx] = useState(0);
 
    const p1HpStyle = {
        width: `${p1Hp/defaultHP*385}px`,
        backgroundColor: p1Hp > 100 ? '#FFF500' : '#FF0000' ,
    }
    const p2HpStyle = {
        width: `${p2Hp/defaultHP*385}px`,
        backgroundColor: p2Hp > 100 ? '#FFF500' : '#FF0000' ,
    }
    
    const settling = (idx: number) => {
        console.log('정산중..')
        let d = attacks[idx].card.damage * percentList[idx] * 7;
        console.log('========')
        console.log('d', d);

        // 이펙트 사라지게 하기
        const spellEffect = document.querySelector(`.spellEffect-${idx}`);
        setTimeout(() => {
            spellEffect?.classList.add('hidden-effect');
        }, 2000);

        if (attacks[idx].isMine) {
            console.log('내가 공격중!!')
            if (p2Deffense) {
                d = d/2;
            }
            setTimeout(() => {
                if (d >= p2Hp) {
                    dispatch(playerActions.p2HpDecrese(p2Hp));
                } else {
                    dispatch(playerActions.p2HpDecrese(d));
                }
            }, 3000);
        } else {
            console.log('공격 당하는중,,')
            if (p1Deffense) {
                d = d/2;
            }
            setTimeout(() => {
                if (d >= p1Hp) {
                    dispatch(playerActions.p1HpDecrese(p1Hp));
                } else {
                    dispatch(playerActions.p1HpDecrese(d));
                }
            }, 3000);
        }
    }
    
        
    useEffect(() => {
        console.log('=========')
        console.log('idx : ', idx)
        console.log('=========')
        console.log('p1HP : ', p1Hp);
        console.log('p2HP : ', p1Hp);

        if (settleTurn) {
            if ((p1Hp===0 || p2Hp===0) && !(idx%2)) {
                dispatch(settleActions.percentListClear())
                console.log('game over! ready로 가거나 result로 이동')
                dispatch(settleActions.percentListClear())
                send({
                    event: 'gameOver',
                    roomId: roomId,
                    memberId: memberId,
                    data: { hp: p1Hp }
                })
            }
            if (idx < attacks.length) {
                settling(idx)
                setTimeout(() => {
                    setIdx(idx+1);
                }, 5000);
            } else {
                dispatch(settleActions.percentListClear())
                if(p1Hp <=0 || p2Hp <=0) {
                    console.log('game over! ready로 가거나 result로 이동')
                    dispatch(settleActions.percentListClear())
                    send({
                        event: 'gameOver',
                        roomId: roomId,
                        memberId: memberId,
                        data: { hp: p1Hp }
                    })
                }
            }
        }


    }, [settleTurn, idx]);
    

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
                    {attacks.map((attack: AttackType, i: number) => {
                        if (attack.isMine) {
                            return (
                                <img key={i} className={`spellEffect-${i}`} src={require(`../../../assets/effect/${attack.card.code}.png`)} alt="없음,," />
                            )
                        }
                    })}   
                </div>
                <div className='characterBox'>
                    <img className="myCharacter" style={{width: '400px'}} src={require(`../../../assets/character/${p1Character}_attack.png`)} alt="" />
                    <img className="yourCharacter" style={{width: '400px'}} src={require(`../../../assets/character/${p2Character}_attack.png`)} alt="" />
                </div>
                <div style={{display: 'inline-flex'}}>
                    {attacks.map((attack: AttackType, i: number) => {
                        if (!attack.isMine) {
                            return (
                                <img key={i} className={`spellEffect-${i}`} src={require(`../../../assets/effect/${attack.card.code}.png`)} alt="없음,," />
                            )
                        }
                    })}   
                </div>
            </div>
        </div>
    )
}



export default React.memo(Settle);
