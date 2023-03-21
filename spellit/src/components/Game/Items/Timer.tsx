import './Items.css';

// 타입 지정
interface Time {
    time:number;
}

function Timer(props:Time) {
    return (
        <>
            <div id="TimerBox">
                <img src="assets/InGame/TimerImg.png" alt="" />
                <h1>{props.time}</h1>
            </div>
        </>
    )
}

export default Timer;