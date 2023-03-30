import { useState, useEffect } from "react";
import { Canvas} from "@react-three/fiber";
import { OrbitControls, } from "@react-three/drei";

// import TestComp from "@/components/Settle/quarks/TestComp";
// import StartSpell from "@/components/Settle/quarks/StartSpell";
import FireBall from "./quarks/1P/FireBall";

import LUNA_attack from "@/assets/character/LUNA_attack.png";
import AK_attack from "@/assets/character/AK_attack.png";
import light_icon from "@/assets/settle/light-icon.png";
import "./Skills.css";

function Skills() {
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
      // setTimeout(() => {
      //   // audio = new Audio("/bgm/firebeam.mp3");
      //   audio.play();
      // }, 1000);
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
  }, [isMoving, isDone]);

  const attacked = isDone ? "cha2-shake" : "cha2";
  // const back = isMoving ? "box2" : "box";

  return (
    <div className="box2">
      <div>
        <button onClick={handleButton}>button</button>
        <img className="icon1" src={light_icon} alt="" />
        <img className="cha1" src={LUNA_attack} alt="" />
        <img className={attacked} src={AK_attack} alt="" />
      </div>
      <Canvas >
        {/* <OrbitControls /> */}
			

        {isMoving && (
          <>
            {/* <StartSpell handleButton={handleButton} handleDone={handleDone}/> */}
            {/* <TestComp handleButton={handleButton} handleDone={handleDone} /> */}
						<FireBall handleButton={handleButton} handleDone={handleDone}/>
          </>
        )}
      </Canvas>
    </div>
  );
}

export default Skills;