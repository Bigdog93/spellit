import React, { useCallback, useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from '@/store/websocket'

import Timer from "@/components/Game/Defense/Timer";
import Click from "@/components/Game/Defense/Click";
import Blow from "@/components/Game/Defense/Blow";


import styles from "./index.module.css";
import { gameActions } from "@/store/game";

const Defense = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { send } = useContext(WebSocketContext);

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

  // 게임 끝났을 때
  const roomId = useSelector((state: RootState) => state.room.roomId)
  const memberId = useSelector((state: RootState) => state.user.id)
  const myDefense = useSelector((state:RootState) => state.game.myDefense)
  useEffect(()=> {
    console.log('isDone이 트루인지 확인할거야')
    if (onTime === false && isDone === true) {
      console.log('isDone이 트루라서 내 디펜스 결과 보내고 세틀로 넘어갈 예정: ', myDefense)
      send({
        event: 'settleTurn',
        roomId: roomId,
        memberId: memberId,
        data: { defense: myDefense }
      })
    }
  }, [onTime, isDone, myDefense])
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

  
  

  const readyTurn = useSelector((state:RootState) => state.game.readyTurn)
  useEffect(() => {
    if (readyTurn) {
      navigate('/Ready')
    }
  }, [readyTurn])

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
            // success={onSuccess}
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

export default Defense;
