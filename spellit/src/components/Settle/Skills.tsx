import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// import FireBall from "./quarks/1P/FireBall"
import Tornado from "./quarks/1P/Tornado";
import Start from "./quarks/1P/Start";

import CBDefault from "./characters/Player1";
import AKDefault from "./characters/Player2";
import "./Skills.css";

import Background from "./characters/Background";

function Skills() {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isSpell, setIsZoomOut] = useState<boolean>(false);

  const handleButton = () => {
    setIsStart(!isStart);
  };
  const handleSpell = () => {
    setIsZoomOut(!isSpell);
  };

  console.log(isStart, "is");
  console.log(isSpell, "spell");

  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    let spell: HTMLAudioElement | null = null;

    if (isStart) {
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
  }, [isStart]);

  useEffect(() => {
    let audio2: HTMLAudioElement | null = null;
    if (isSpell) {
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
  }, [isStart, isSpell]);

  return (
    <div className="box2">
      <div>
        <button onClick={handleButton}>button</button>
      </div>
      <Canvas className="canvas">
        {/* <OrbitControls /> */}
        <ambientLight intensity={0.8} />
        <Background position={[0, 0, 0]} />
        <CBDefault position={[-5, -1, 0]} />
        <AKDefault position={[5, -1, 0]} />

        {isStart && (
          <>
            {/* <FireBall handleButton={handleButton} handleDone={handleDone}/> */}

            <Start handleButton={handleButton} handleSpell={handleSpell} />
          </>
        )}
        {isSpell && (
          <>
            <Tornado handleButton={handleButton} handleSpell={handleSpell} />
          </>
        )}
        {/* 카메라 */}
        <MyCamera isStart={isStart} isSpell={isSpell} />
      </Canvas>
    </div>
  );
}

export default Skills;

// 카메라
type MyCameraProps = {
  isStart: boolean;
  isSpell: boolean;
};

function MyCamera({ isStart, isSpell }: MyCameraProps) {
  const { camera } = useThree();
  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3());
  const [fov, setFov] = useState<number>(0);

  useEffect(() => {
    if (isStart) {
      setPosition(new THREE.Vector3(-5, 0, 5));
      setFov(30);
      console.log(1);
    } else if (!isStart && isSpell) {
      setPosition(new THREE.Vector3(5, 0, 5));
      setFov(30);
      console.log(3);
    } else if (!(!isStart && !isSpell)) {
      setPosition(new THREE.Vector3(0, 0, 5));
      setFov(75);
      console.log(4);
    } else if (!isStart) {
      setPosition(new THREE.Vector3(0, 0, 5));
      setFov(75);
      console.log(2);
    }
  }, [isStart, isSpell]);

  useFrame(() => {
    camera.position.lerp(position, 0.02);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.02);
    }
    camera.updateProjectionMatrix();
  });

  return <perspectiveCamera fov={fov} />;
}
