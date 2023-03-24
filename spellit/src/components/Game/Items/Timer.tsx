import './Items.css';
import TimerImg from "../../../assets/InGame/TimerImg.png";

// 타입 지정
interface Time {
    time:number;
}

function Timer(props:Time) {
    return (
        <>
            <div id="TimerBox">
                <img src={TimerImg} alt="" />
                <h1>{props.time}</h1>
            </div>
        </>
    )
}

export default Timer;