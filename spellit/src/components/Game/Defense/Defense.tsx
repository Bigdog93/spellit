import { useCallback, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";

import Timer from "@/components/Game/Defense/Timer";
import Click from "@/components/Game/Defense/Click";
import Blow from "@/components/Game/Defense/Blow";


import styles from "./Defence.module.css";

const Defence = () => {
  const navigate = useNavigate();

  // 게임 선택(둘중 하나)
  const [gameSelect, setGameSelect] = useState<"click" | "blow" | null>(null);

  // 게임이 진행되는 중인지 판단하는 state

  const [onTime, setOnTime] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  // focus가 옮겨가지 않도록 마우스 이벤트를 막기 위한 ref
  const preventMouseRef = useRef<HTMLDivElement>(null);

  // 게임이 끝남을 수행하는 function
  const handleTimer = useCallback(() => {
    setOnTime(!onTime);
  }, [onTime]);

  const handleResult = useCallback(() => {
    setIsDone(!isDone);
  }, [isDone]);

  // focus가 옮겨가지 않도록 마우스 이벤트를 막기 위한 function
  const preventMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const gameTypes: ("click" | "blow")[] = ["click", "blow"];
    let max = 2;
    const randomIdx = Math.floor(Math.random() * max);
    setGameSelect(gameTypes[randomIdx]);
  }, []);


  // 화면 넘어가게 하는 것들
  const p1Hp = useSelector((state: RootState) => state.player.p1?.hp);
  const p2Hp = useSelector((state: RootState) => state.player.p2?.hp);
  const endDefense = useSelector((state: RootState) => state.defense.defenseEnd)
  useEffect(()=> {
    if(endDefense) {
      // if (p1Hp && p2Hp) {
      //   console.log('hp확인 if 안이야')
      //   if(p1Hp <=0 || p2Hp <=0) {
      //     navigate('/result')
      //     console.log('hp 다 떨어졌다...')
      //   } else {
      //     navigate('/ready')
      //   }
      // }
      // console.log('hp확인 if 밖이야')
      // navigate('/ready')
      // navigate('/result')
      navigate('/settle');
    }
  }, [endDefense])
  return (
    <div
      className={styles.box}
      ref={preventMouseRef}
      tabIndex={0}
      onMouseDown={preventMouseDown}
    >
      <div>
        <h1>DEFENSE</h1>
        <Timer
          handleTimer={handleTimer}
          onTime={onTime}
          handleResult={handleResult}
          isDone={isDone}
        />
        {gameSelect === "click" ? (
          <Click
            handleTimer={handleTimer}
            onTime={onTime}
            handleResult={handleResult}
            isDone={isDone}
          />
        ) : gameSelect === "blow" ? (
          <Blow
            handleTimer={handleTimer}
            onTime={onTime}
            handleResult={handleResult}
            isDone={isDone}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Defence;
