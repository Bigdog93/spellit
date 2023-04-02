import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// import FireBall from "./quarks/1P/FireBall"
import Start from "./quarks/1P/Start";
import Tornado from "./quarks/1P/Tornado";
import Abyss from "./quarks/1P/Abyss";
import Light1 from "./quarks/1P/Light1";
import Light2 from "./quarks/1P/Light2";
import Earth from "./quarks/1P/Earth";

import CBDefault from "./characters/Player1";
import AKDefault from "./characters/Player2";
import "./Skills.css";

import Background from "./characters/Background";
import FireBall from "./quarks/1P/FireBall";
import Lightning from "./quarks/1P/Lightening";

function Skills() {
  // 마법 시전 효과 시작
  const [isStart, setIsStart] = useState<boolean>(false);
  // 마법 사용
  const [isSpell, setIsSpell] = useState<boolean>(false);
  // camera
  const cameraNum = useRef<number>(2);

  const handleButton = () => {
    setIsStart(!isStart);
  };
  const handleSpell = () => {
    setIsSpell(!isSpell);
  };

  const selectCamera = (num: number) => {
    cameraNum.current = num;
  };

  console.log(cameraNum, "ㅊㅊㅊㅊㅊㅊ");
  console.log(isStart, "isStart");
  console.log(isSpell, "isSpell");

  return (
    <div className="box2">
      {/* 임시버튼 */}
      <div>
        <button onClick={handleButton}>button</button>
      </div>
      <Canvas className="canvas">
        {/* <OrbitControls /> */}
        <ambientLight intensity={0.8} />

        {/* 배경이미지 */}
        <Background position={[0, 0, 0]} />

        {/* 캐릭터 */}
        <CBDefault position={[-5, -1, 0]} />
        <AKDefault position={[5, -1, 0]} isSpell={isSpell} />

        {/* 마법 시전 이펙트 */}
        {isStart && (
          <>
            <Start
              handleButton={handleButton}
              handleSpell={handleSpell}
              isStart={isStart}
            />
          </>
        )}

        {/* 여기서부터 실행되는 마법 */}
        {/* WIND */}
        {/* 남양의 폭풍 camera 0*/}
        {isSpell && (
          <>
            <Tornado
              handleSpell={handleSpell}
              isSpell={isSpell}
              selectCamera={selectCamera}
            />
          </>
        )}
        {/* 번개 camera 1*/}
        {/* {isSpell && (
          <>
            <Lightning
              handleSpell={handleSpell}
              isSpell={isSpell}
              selectCamera={selectCamera}
            />
          </>
        )} */}

        {/* WATER */}

        {/* FIRE */}
        {/* {isSpell && (
          <>
            <FireBall handleSpell={handleSpell} isSpell={isSpell} />
          </>
        )} */}

        {/* EARTH */}
        {/* {isSpell && (
          <>
            <Earth handleSpell={handleSpell} isSpell={isSpell} />
          </>
        )} */}

        {/* LIGHT */}
        {/* {isSpell && (
          <>
            <Light1 handleSpell={handleSpell} isSpell={isSpell} />
          </>
        )} */}
        {/* {isSpell && (
          <>
            <Light2 handleSpell={handleSpell} isSpell={isSpell} />
          </>
        )} */}

        {/* DARK */}
        {/* 무광의 심연 */}
        {/* {isSpell && (
          <>
            <Abyss handleSpell={handleSpell} isSpell={isSpell} />
          </>
        )} */}

        {/* 카메라 */}
        <MyCamera isStart={isStart} isSpell={isSpell} cameraNum={cameraNum} />
      </Canvas>
    </div>
  );
}

export default Skills;

// 카메라
type MyCameraProps = {
  isStart: boolean;
  isSpell: boolean;
  cameraNum: React.RefObject<number>;
};

function MyCamera({ isStart, isSpell, cameraNum }: MyCameraProps) {
  const { camera } = useThree();
  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3());
  const [fov, setFov] = useState<number>(0);

  useEffect(() => {
    if (cameraNum.current === 0) {
      // 카메라 이동(처음만 확대) 0
      if (isStart) {
        setPosition(new THREE.Vector3(-5, 0, 5));
        // 확대
        setFov(30);
      } else if (!isStart) {
        setPosition(new THREE.Vector3(0, 0, 5));
        setFov(75);
      }
    } else if (cameraNum.current === 1) {
      //카메라 이동(축소했다가 확대) 1
      if (isStart) {
        setPosition(new THREE.Vector3(-5, 0, 5));
        // 확대
        setFov(30);
      } else if (!isStart && isSpell) {
        setPosition(new THREE.Vector3(0, 0, 5));
        setFov(75);
        setTimeout(() => {
          setPosition(new THREE.Vector3(5, 0, 5));
          setFov(30);
        }, 1500);
      } else if (!isStart && !isSpell) {
        setPosition(new THREE.Vector3(0, 0, 5));
        setFov(75);
      }
    } else if (cameraNum.current === 2) {
      //카메라 이동(직선으로 이동) 2
      if (isStart) {
        setPosition(new THREE.Vector3(-5, 0, 5));
        // 확대
        setFov(30);
      } else if (!isStart && isSpell) {
        setTimeout(() => {
          setPosition(new THREE.Vector3(5, 0, 5));
          setFov(30);
        }, 1500);
      } else if (!isStart && !isSpell) {
        setPosition(new THREE.Vector3(0, 0, 5));
        setFov(75);
      }
    }
  }, [cameraNum, isStart, isSpell]);

  useFrame(() => {
    camera.position.lerp(position, 0.02);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.02);
    }
    camera.updateProjectionMatrix();
  });

  return <perspectiveCamera fov={fov} />;
}
