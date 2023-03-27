import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

import "./Settle.css";
// import FireBall from "@//components/Settle/Skill/FireBall";
import FireBall from "@//components/Settle/Skill/FireBall";
// import Thunder from "./Skill/Thunder";
// import Smoke from "./Skill/Smoke";
import RUNA_attack from "@/assets/character/RUNA_attack.png";
import SpellBar from "../Game/Items/SpellBar";

function Settle() {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const handleButton = () => {
    setIsMoving(!isMoving);
  };
  const handleDone = () => {
    setIsDone(!isDone);
  };

  console.log(isMoving, "is");

  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    let spell: HTMLAudioElement | null = null;

    if (isMoving) {
      spell = new Audio("/bgm/spell.mp3");
      spell.play();
      setTimeout(() => {
        audio = new Audio("/bgm/firebeam.mp3");
        audio.play();
      }, 1000);
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [isMoving]);

  useEffect(() => {
    let audio2: HTMLAudioElement | null = null;
    if (isDone) {
      audio2 = new Audio("/bgm/damaged.mp3");
      audio2.play();
      setTimeout(() => {
        audio2 = new Audio("/bgm/damaged.mp3");
        audio2.play();
      }, 200);
    }
    return () => {
      if (audio2) {
        audio2.pause();
        audio2.currentTime = 0;
      }
    };
  }, [isMoving]);

  const attacked = isDone ? "cha2-shake" : "cha2";
  const back = isMoving ? "box2" : "box";
  return (
    <div>
      <div className={back}>
        <button onClick={handleButton}>button</button>
        {/* key를 바꾸면 강제로 재렌더링 되면서 잔상이 사라짐, but 비효율적일 수 있음 */}
        <img className="cha1" src={RUNA_attack} alt="" />
        <img className={attacked} src={RUNA_attack} alt="" />
        <Canvas key={isMoving.toString()}>
          {/* <OrbitControls /> */}
          {isMoving && (
            <>
              <FireBall handleButton={handleButton} handleDone={handleDone} />
              {/* <Thunder handleButton={handleButton} /> */}
              {/* <Smoke handleButton={handleButton} /> */}
            </>
          )}
        </Canvas>
      </div>
    </div>
  );
}

export default Settle;
