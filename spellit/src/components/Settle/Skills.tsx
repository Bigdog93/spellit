import { useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// import FireBall from "./quarks/1P/FireBall"
import Tornado from "./quarks/1P/Tornado";
import Start from "./quarks/1P/Start";

import CBDefault from "./characters/Player1";
import AKDefault from "./characters/Player2";
import "./Skills.css";

import Background from "./characters/Background";

function Skills() {
  // 마법 시전 효과 시작
  const [isStart, setIsStart] = useState<boolean>(false);
  // 마법 사용
  const [isSpell, setIsSpell] = useState<boolean>(false);

  const handleButton = () => {
    setIsStart(!isStart);
  };
  const handleSpell = () => {
    setIsSpell(!isSpell);
  };

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
        {isSpell && (
          <>
            <Tornado handleSpell={handleSpell} isSpell={isSpell} />
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

  // 진행상황에 따라 카메라 이동 1
  useEffect(() => {
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
