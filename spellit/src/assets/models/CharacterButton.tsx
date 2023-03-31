import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

type GLTFResult = GLTF & {
  nodes: {
    character: THREE.Mesh;
  };
  materials: {
    character: THREE.MeshStandardMaterial;
  };
};

export default function CharacterButton(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/character.glb"
  ) as GLTFResult;
  const characterRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const [y, setY] = useState(0);

  useFrame(() => {
    if (hover) {
      setY((y) => MathUtils.lerp(y, 0.1, 0.05));
    } else {
      setY((y) => MathUtils.lerp(y, 0, 0.05));
    }
    if (characterRef.current) {
      characterRef.current.position.setY(y);
    }
  });

  return (
    <group {...props} dispose={null} scale={[1.5, 1.5, 1.5]}>
      <mesh
        ref={characterRef}
        geometry={nodes.character.geometry}
        material={materials.character}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]}
      />
    </group>
  );
}
