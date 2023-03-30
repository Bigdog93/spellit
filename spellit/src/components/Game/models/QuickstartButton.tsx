import { useState, useRef } from "react";
import { MathUtils, Vector3 } from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

import { useNavigate } from "react-router-dom";

type GLTFResult = GLTF & {
  nodes: {
    quickstartbutton: THREE.Mesh;
  };
  materials: {
    quickstartbutton: THREE.MeshStandardMaterial;
  };
};

export default function QuickstartButton(
  props: JSX.IntrinsicElements["group"]
) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/quickstartbutton.glb"
  ) as GLTFResult;

  const quickRef = useRef<THREE.Mesh>(null);
  // 호버유무에 따라 quickRef의 트렌지션 수행
  const [hover, setHover] = useState(false);
  // y값 transition 관리 state
  const [y, setY] = useState(0);

  // QuickStart를 눌렀을 때 애니메이션 및 페이지 이동 관리 state
  const [isQuick, setIsQuick] = useState(false);

  // 카메라의 ref
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // 이동할 타겟들의 위치를 담은 배열
  const targetPositions = [
    new Vector3(-2.0543755584836227, 0.7109905936403901, 4.502669590416359),
    new Vector3(3, 0, -0.3),
  ];
  // 위치배열의 인덱스를 관리하는 state
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  const navigate = useNavigate();

  // 애니메이션 수행(button - transition / 카메라- transition,시점 변화)
  useFrame(({ camera }) => {
    // button 관련
    if (hover) {
      setY((y) => MathUtils.lerp(y, 0.1, 0.05));
    } else {
      setY((y) => MathUtils.lerp(y, 0, 0.05));
    }
    quickRef.current?.position.setY(y);

    // 카메라 관련
    if (cameraRef.current && isQuick) {
      const targetPosition = targetPositions[currentPositionIndex];
      const currentPosition = camera.position.clone();
      // 최근의 위치와 타겟의 위치를 비교하여
      const distance = targetPosition.distanceTo(currentPosition);
      // 일정 값 이상 되어야 이동
      if (distance > 0.1) {
        const newPosition = currentPosition.lerp(targetPosition, 0.025);
        if (currentPositionIndex === 0) {
          // 바라보는 위치 설정
          camera.lookAt(new Vector3(0, 0, 0));
        } else {
          // camera.lookAt(targetPosition);
        }
        // 카메라의 위치를 새 위치로 update
        camera.position.copy(newPosition);
      } else {
        // 배열을 전부 다 돌았으면
        if (currentPositionIndex === targetPositions.length - 1) {
          // isQuick을 false로 바꿔 이동을 마침
          setIsQuick(!isQuick);
        } else {
          // 배열 인덱스 이동
          setCurrentPositionIndex((index) => index + 1);
        }
      }
    }
  });

  const toQuickStart = () => {
    setIsQuick(!isQuick);
    setTimeout(() => {
      navigate("/settle");
    }, 4000);
  };

  return (
    <group
      {...props}
      dispose={null}
      scale={[2.5, 2.5, 2.5]}
      onClick={toQuickStart}
    >
      <pointLight
        intensity={2}
        position={[0, 3.061616997868383e-16, 5]}
        rotation={[0, 0, Math.PI]}
      />
      <mesh
        ref={quickRef}
        geometry={nodes.quickstartbutton.geometry}
        material={materials.quickstartbutton}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]}
      />
      <perspectiveCamera ref={cameraRef} position={[0, 0, 3]} />
    </group>
  );
}
