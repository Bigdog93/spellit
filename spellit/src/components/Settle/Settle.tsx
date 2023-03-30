import react, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { attackActions } from '@/store/attack';
import { RootState } from "@/store/";

import ProfileHp from '../Game/Items/ProfileHp';

import "./Settle.css";
import LUNA_attack from '../../assets/character/LUNA_attack.png';
import AK_attack from '../../assets/character/AK_attack.png';
import { playerActions } from '@/store/player';

function Settle() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultHP = useSelector((state: RootState) => (state.attack.defaultHp));

    const p1Hp = useSelector((state: RootState) => (state.player.p1!.hp));
    const p2Hp = useSelector((state: RootState) => (state.player.p2!.hp));

    const p1Deffense = useSelector((state: RootState) => (state.settle.p1Deffense));
    const p2Deffense = useSelector((state: RootState) => (state.settle.p2Deffense));

    const attacks = useSelector((state: RootState) => (state.game.attacks));

    const percentList = useSelector((state: RootState) => (state.settle.percentList));

    
    const p1HpStyle = {
        width: `${p1Hp/defaultHP*385}px`,
        backgroundColor: p1Hp > 100 ? '#FFF500' : '#FF0000' ,
    }
    const p2HpStyle = {
        width: `${p2Hp/defaultHP*385}px`,
        backgroundColor: p2Hp > 100 ? '#FFF500' : '#FF0000' ,
    }

    const [idx, setIdx] = useState(0);
    
    function settling(idx: number) {
        // for (let i=0; i<attacks.length; i++) {
            let d = attacks[idx].card.damage * percentList[idx];

            if (attacks[idx].isMine) {
                if (p2Deffense) {
                    d = d/2;
                }
                dispatch(playerActions.p2HpDecrese(d));
            } else {
                if (p1Deffense) {
                    d = d/2;
                }
                dispatch(playerActions.p1HpDecrese(d));
            }
            
        // }
    }

    useEffect(() => {
        if (idx < attacks.length) {
            settling(idx);
            setIdx(idx+1);
        } else {
            navigate('/result');
        }
    }, [idx]);

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
