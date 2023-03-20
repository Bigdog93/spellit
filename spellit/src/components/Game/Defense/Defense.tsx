import { useCallback, useState, useRef, useEffect } from "react";

import Timer from "@/components/Game/Defense/Timer";
import Click from "@/components/Game/Defense/Click";
import Blow from "@/components/Game/Defense/Blow";

import styles from "@/components/Game/Defense/Defence.module.css";

const Defence = () => {
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
