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
    "./models/quickstartbutton.glb"
  ) as GLTFResult;
  const quickRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const [y, setY] = useState(0);
  const [isQuick, setIsQuick] = useState(false);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const targetPositions = [
    new Vector3(-2.0543755584836227, 0.7109905936403901, 4.502669590416359),
    // new Vector3(3, 3, 3),
    new Vector3(2.5, 0, -0.5),
  ];
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  useFrame(({ camera }) => {
    if (hover) {
      setY((y) => MathUtils.lerp(y, 0.1, 0.05));
    } else {
      setY((y) => MathUtils.lerp(y, 0, 0.05));
    }
    quickRef.current?.position.setY(y);

    if (cameraRef.current && isQuick) {
      const targetPosition = targetPositions[currentPositionIndex];
      const currentPosition = camera.position.clone();
      const distance = targetPosition.distanceTo(currentPosition);
      if (distance > 0.1) {
        const newPosition = currentPosition.lerp(targetPosition, 0.015);
        if (currentPositionIndex === 0) {
          camera.lookAt(new Vector3(0, 0, 0));
        } else {
          // camera.lookAt(targetPosition);
        }
        camera.position.copy(newPosition);
      } else {
        if (currentPositionIndex === targetPositions.length - 1) {
          setIsQuick(!isQuick);
        } else {
          setCurrentPositionIndex((index) => index + 1);
        }
      }
    }
  });

  const navigate = useNavigate();
  const toQuickStart = () => {
    setIsQuick(!isQuick);
    setTimeout(() => {
      navigate("/game");
    }, 5000);
  };

  const camRef = useRef<THREE.PerspectiveCamera>(null);
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
