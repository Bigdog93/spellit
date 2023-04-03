import react, {useState, useContext, useEffect} from 'react';
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
import Skills from './Skills';


function Settle() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    // const settleTurn = useSelector((state: RootState) => state.game.settleTurn)

    // const idx = useSelector((state: RootState) => (state.game.idx));
    const [idx, setIdx] = useState(0);
    const [isCanvas, setIsCanvas] = useState(false);
 
    const p1HpStyle = {
        width: `${p1Hp/defaultHP*385}px`,
        backgroundColor: p1Hp > 100 ? '#FFF500' : '#FF0000' ,
    }
    const p2HpStyle = {
        width: `${p2Hp/defaultHP*385}px`,
        backgroundColor: p2Hp > 100 ? '#FFF500' : '#FF0000' ,
    }
    
    async function settling(idx: number) {
        console.log('정산중..')
        let d = attacks[idx].card.damage * percentList[idx] * 2;
        console.log('========')
        console.log('d', d);

        // 이펙트 사라지게 하기
        const spellEffect = document.querySelector(`.spellEffect-${idx}`);
        setTimeout(() => {
            spellEffect?.classList.add('hidden-effect');
            setTimeout(() => {
                // canvas 실행
                setIsCanvas(true);
                if (attacks[idx].isMine) {
                    console.log('내가 공격중!!')
                    if (p2Deffense) {
                        d = d/2;
                    }
                    if (d >= p2Hp) {
                        d = p2Hp;
                    }
                    setTimeout(() => {
                        setIsCanvas(false);
                        dispatch(playerActions.p2HpDecrese(d));
                    }, 3000);
                } else {
                    console.log('공격 당하는중,,')
                    if (p1Deffense) {
                        d = d/2;
                    }
                    if (d >= p1Hp) {
                        d = p1Hp;
                    }
                    setTimeout(() => {
                        setIsCanvas(false);
                        dispatch(playerActions.p1HpDecrese(d));
                    }, 3000);
                }
            }, 1000);
        }, 2000);

    }

    useEffect(() => {
        console.log('=========')
        console.log('idx : ', idx)
        console.log('=========')
        
        
        if (idx !== attacks.length) {
            console.log('아직 정산 진행중...');
                settling(idx);
                console.log('p1HP : ', p1Hp);
                console.log('p2HP : ', p1Hp);

            // idx 증가
            setTimeout(() => {
                setIdx(idx+1);
            }, 5000);
        // 모든 스펠 정산 끝
        } else {
            setTimeout(() => {
                // 피가 한 사람이라도 없으면 result로 이동
                if (p1Hp <= 0 || p2Hp <= 0) {
                    console.log('게임 끝!! Result로 이동해야지~');
                    send({
                        event: 'gameOver',
                        roomId: roomId,
                        memberId: memberId,
                        data:  {
                            hp: p1Hp,
                        },
                    })
                // 피가 남아 있으면 ready 턴으로 이동
                } else {
                    dispatch(settleActions.percentListClear());
                    // dispatch(gameActions.endSettle());
                    console.log('Go to Next Turn!');
                    // send({
                    //     event: 'readyTurn',
                    //     roomId: roomId,
                    //     memberId: memberId,
                    //     data: ''
                    // })
                    send({
                        event: 'gameOver',
                        roomId: roomId,
                        memberId: memberId,
                        data:  {
                            hp: p1Hp,
                        },
                    })
                }
            }, 1000);
        }

    }, [idx]);

    return (
        <>
            {isCanvas && idx<attacks.length ?
            <Skills code={attacks[idx].card.code} isMine={attacks[idx].isMine} p1Character={p1Character} p2Character={p2Character}></Skills>
            :
            <div className='settle-bg'>
                <div className='settle-top-itmes'>
                    <div className='first-hp-box'>
                        <ProfileHp character={p1Character}></ProfileHp>
                        <div className="first-hp-bar" style={p1HpStyle}></div>
                    </div>
                    <div className='second-hp-box'>
                        <ProfileHp character={p2Character}></ProfileHp>
                        <div className="second-hp-bar" style={p2HpStyle}></div>
                    </div>
                </div>
                <div className='settle-bottom-items'>
                    <div className='settle-p1Box'>
                        <div style={{display: 'inline-flex'}}>
                            {attacks.map((attack: AttackType, i: number) => {
                                if (attack.isMine) {
                                    return (
                                        <img key={i} style={{height: '100px'}} className={`spellEffect-${i}`} src={require(`../../../assets/effect/${attack.card.code}.png`)} alt="없음,," />
                                    )
                                }
                            })}   
                        </div>
                    <img className="myCharacter" style={{width: '300px'}} src={require(`../../../assets/character/${p1Character}_attack.png`)} alt="" />
                    </div>
                    
                    {/* {idx<attacks.length ? <Skills code={attacks[idx].card.code} isMine={attacks[idx].isMine} p1Character={p1Character} p2Character={p2Character}></Skills> : <></>} */}
                    
                    <div className='settle-p2Box'>
                        <div style={{display: 'inline-flex'}}>
                            {attacks.map((attack: AttackType, i: number) => {
                                if (!attack.isMine) {
                                    return (
                                        <img key={i} style={{height: '150px'}} className={`spellEffect-${i}`} src={require(`../../../assets/effect/${attack.card.code}.png`)} alt="없음,," />
                                    )
                                }
                            })}   
                        </div>
                        <img className="yourCharacter" style={{width: '300px'}} src={require(`../../../assets/character/${p2Character}_attack.png`)} alt="" />
                    </div>
                </div>
            </div>
            }
        </>
    )
}



export default Settle;
