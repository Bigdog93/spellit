import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "@/store/websocket";

// import '../index.css'
import Timer from "@/components/Game/Defense/Timer";
import Click from "@/components/Game/Defense/Click";
import Blow from "@/components/Game/Defense/Blow";
import ProfileHp from "@/components/Game/Items/ProfileHp";

import styles from "./index.module.css";
import { gameActions } from "@/store/game";

import "@/components/Game/Attack/Spell.css";

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
  const roomId = useSelector((state: RootState) => state.room.roomId);
  const memberId = useSelector((state: RootState) => state.user.id);
  const myDefense = useSelector((state: RootState) => state.game.myDefense);
  useEffect(() => {
    console.log("isDone이 트루인지 확인할거야");
    if (onTime === false && isDone === true) {
      console.log(
        "isDone이 트루라서 내 디펜스 결과 보내고 세틀로 넘어갈 예정: ",
        myDefense
      );
      setTimeout(() => {
        send({
          event: "settleTurn",
          roomId: roomId,
          memberId: memberId,
          data: { defense: myDefense },
        });
      }, 1500)
    }
  }, [onTime, isDone, myDefense]);
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

  // const p1Character = "AK"

  // const p2Character ="LUNA"
  const p1Character = useSelector(
    (state: RootState) => state.player.p1!.gameCharacterEntity.englishName
  );
  const p2Character = useSelector(
    (state: RootState) => state.player.p2!.gameCharacterEntity.englishName
  );

  // const defaultHP = 600
  // const p1Hp = 200
  // const p2Hp = 200
  const defaultHP = useSelector((state: RootState) => state.attack.defaultHp);
  const p1Hp = useSelector((state: RootState) => state.player.p1!.hp);
  const p2Hp = useSelector((state: RootState) => state.player.p2!.hp);

  const p1HpStyle = {
    width: `${(p1Hp / defaultHP) * 385}px`,
    backgroundColor: p1Hp > 100 ? "#FFF500" : "#FF0000",
  };
  const p2HpStyle = {
    width: `${(p2Hp / defaultHP) * 385}px`,
    backgroundColor: p2Hp > 100 ? "#FFF500" : "#FF0000",
  };
	const p1Level = useSelector((state: RootState) => state.player.p1!.level);
  const p2Level = useSelector((state: RootState) => state.player.p2!.level);

  return (
    <div className="attack-bg">
			{/* 클릭방지 구간 */}
      <div
        className={styles.box}
        ref={preventMouseRef}
        tabIndex={0}
        onMouseDown={preventMouseDown}
      ></div>
      <div className="attack-top-items">
        <div className="first-hp-box">
          <ProfileHp character={p1Character} level={p1Level}></ProfileHp>
          <div className="first-hp-bar" style={p1HpStyle}></div>
        </div>
        <Timer
          handleTimer={handleTimer}
          onTime={onTime}
          handleResult={handleResult}
          isDone={isDone}
        />
        <div className="second-hp-box">
          <ProfileHp character={p2Character} level={p2Level}></ProfileHp>
          <div className="second-hp-bar" style={p2HpStyle}></div>
        </div>
      </div>
      <div className="attack-bottom-itmes">
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
