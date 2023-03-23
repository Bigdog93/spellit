import react, {useState, useEffect} from 'react';
import HpBarImg from '../../assets/InGame/hpBar.png';
import "./Settle.css";

function Settle() {

    const [hp, setHp] = useState(476);
    
    function hit () {
        if (hp <= 100) {
            setHp(0);
        } else {
            setHp(hp - 100);
        }
    }

    useEffect(() => {
        console.log(hp)
    }, [hp])

    const hpStyle = {
        width: `${hp}px`,
        backgroundColor: hp > 150 ? '#FFF500' : '#FF0000' ,
    }

    return (
        <>
            <button onClick={hit}>얍</button>
            <div className='hp-box'>
                <img src={HpBarImg} alt="" />
                <div className="hp-bar" style={hpStyle}></div>
            </div>
        </>
    )
}

export default Settle;