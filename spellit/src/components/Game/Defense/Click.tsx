import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { gameActions } from "@/store/game";
// import spell1 from "../assets/spell1.png";
// import spell2 from "../assets/spell2.png";
// import brokenspell from "../assets/brokenspell.png";

// 임시 이미지
import image1 from "@/assets/minigame/Image1.jpg";
import image2 from "@/assets/minigame/Image2.jpg";
import image3 from "@/assets/minigame/Image3.jpg";
import image4 from "@/assets/minigame/Image4.jpg";
import image5 from "@/assets/minigame/Image5.jpg";

interface onTimeProp {
  onTime: boolean;
  handleTimer: () => void;
  isDone: boolean;
  handleResult: () => void;
}

// 성공 클릭수 설정(50~110, 플레이타임 10초 기준)
const end = Math.round(Math.random() * 60 + 50);
// const end = 10
let oneTwo = end * 0.25;
let twoThree = end * 0.5;
let threeFour = end * 0.75;

const Click = ({ onTime, handleTimer, isDone, handleResult }: onTimeProp) => {
  const dispatch = useDispatch();
  
  // 게임의 성공/실패를 관리하는 state(기본이 실패)
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // 게임 결과를 store에 저장
  useEffect(()=> {
    dispatch(gameActions.setMyDefense(isSuccess))
  }, [isSuccess])

  // 클릭수를 관리하는 state
  const [clicked, setClicked] = useState<number>(0);

  // 클릭에 따라 달라지는 Img를 관리하는 state
  const [spellImg, setSpellImg] = useState<string>(image1);

  // 클릭신호를 받는 useRef
  const clickedSpell = useRef<HTMLDivElement>(null);

  // 시작부터 자동 focus
  useEffect(() => {
    clickedSpell.current?.focus();
  }, []);

  // 해당 이벤트의 키가 space라면 클릭수 + 1
  const addClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Space" && onTime) {
      setClicked(clicked + 1);
    }
  };

  // 이미지 변경
  useEffect(() => {
    // 게임 시간내일 때
    if (onTime) {
      if (clicked >= oneTwo && clicked < twoThree) {
        setSpellImg(image2);
      } else if (clicked >= twoThree && clicked < threeFour) {
        setSpellImg(image3);
      } else if (clicked >= threeFour && clicked < end) {
        setSpellImg(image4);
      } else if (clicked >= end) {
        setSpellImg(image5);
        // 게임 정지
        handleTimer();
        handleResult();
        // 성공 전달
        setIsSuccess(true);
      }
    }
  }, [clicked, onTime, handleTimer, handleResult]);

  return (
    <div>
      <div ref={clickedSpell} tabIndex={0} onKeyUp={addClick}></div>
      <img src={spellImg} alt="img" />
      <h3>RESULT</h3>
      {onTime ? (
        <div>{clicked}번이나 스페이스바가 무리하는 중...😥</div>
      ) : (
        <></>
      )}
      {!onTime && !isDone ? <div>대기시간 후 게임이 시작됩니다</div> : <></>}
      {isDone ? (
        isSuccess ? (
          <div>성공!! {end}번이나 하다니!!😀</div>
        ) : (
          <div>실패.. {end}번을 못하네ㅋㅋ🤣</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Click;
