import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "@/components/Game/Items/Items.css";
import TimerImg from "@/assets/InGame/TimerImg.png";

// import { defenseActions } from "@/store/defense";
interface TimerProps {
  onTime: boolean;
  handleTimer: () => void;
  isDone: boolean;
  handleResult: () => void;
}

const Timer = ({ onTime, handleTimer, isDone, handleResult }: TimerProps) => {
  const dispatch = useDispatch();

  // 초(sec) 상태를 관리하는 state
  const [sec, setSec] = useState<number>(10);

  const time = useRef<number>(10);
  const timeId = useRef<NodeJS.Timeout | null>(null);

  // 3,2,1 CountDown 관리 state
  const [preSec, setPreSec] = useState<number>(3);

  const preTime = useRef<number>(3);
  const preTimeId = useRef<NodeJS.Timeout | null>(null);

  // 3,2,1 CountDown
  useEffect(() => {
    preTimeId.current = setInterval(() => {
      preTime.current -= 1;
      setPreSec(preTime.current % 60);
      // 0이되면 게임을 시작시킴
      if (preTime.current === 0) {
        clearInterval(preTimeId.current as NodeJS.Timeout);
        handleTimer();
      }
    }, 1000);
    return () => clearInterval(preTimeId.current as NodeJS.Timeout);
    // eslint-disable-next-line
  }, []);

  // 게임 여부를 따져서 타이머 설정
  useEffect(() => {
    // 게임 중이라면
    if (onTime) {
      timeId.current = setInterval(() => {
        time.current -= 1;
        // 초 UPDATE
        setSec(time.current % 60);
      }, 1000);
      // clearInterval함수로 타이머를 정지시킴
      return () => clearInterval(timeId.current as NodeJS.Timeout);
    }
  }, [onTime]);

  // time.current가 0이 되었을 때
  useEffect(() => {
    if (time.current <= 0) {
      // 타이머 정지
      clearInterval(timeId.current as NodeJS.Timeout);
      // 시간이 끝났으므로 게임진행여부 false로
      handleTimer();
      handleResult();
      console.log("endDefense 타이머 0됐을 때 실행되는 함수 in Timer.tsx");
      // dispatch(defenseActions.endDefense())
    }
    // eslint-disable-next-line
  }, [sec]);

  return (
    <>
      <div id="TimerBox">
        <img src={TimerImg} alt="" style={{ width: "40px", height: "45px" }} />
        <div>{sec}</div>
        <div className="presec-box">
          {!onTime && !isDone ? (
            <div className={`presec-b ${preSec === 0 ? "hide" : ""}`}>
              <div className="presec">{preSec}</div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* 밑으로 내려야함 */}
    </>
  );
};

export default Timer;
