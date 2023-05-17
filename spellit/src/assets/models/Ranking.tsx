import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

type GLTFResult = GLTF & {
  nodes: {
    ranking: THREE.Mesh;
  };
  materials: {
    ranking: THREE.MeshStandardMaterial;
  };
};

export default function Ranking(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/ranking.glb"
  ) as GLTFResult;

  const rankingRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const [y, setY] = useState(0);

  useFrame(() => {
    if (hover) {
      setY((y) => MathUtils.lerp(y, 0.1, 0.05));
    } else {
      setY((y) => MathUtils.lerp(y, 0, 0.05));
    }
    if (rankingRef.current) {
      rankingRef.current.position.setY(y);
    }
  });

  return (
    <group {...props} dispose={null} scale={[1, 1, 1]}>
      <mesh
        ref={rankingRef}
        geometry={nodes.ranking.geometry}
        material={materials.ranking}
				onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
