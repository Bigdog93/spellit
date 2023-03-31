import './Items.css';
import TimerImg from "../../../assets/InGame/TimerImg.png";

// 타입 지정
interface Time {
    time:number;
}

function Timer({time}: {time: any}) {
  console.log(time)
    return (
        <>
          <div id="TimerBox">
            <img src={TimerImg} alt="" style={{width: '40px', height: '45px'}} />
            <h1>{time}</h1>
          </div>
        </>
    )
}

export default Timer;