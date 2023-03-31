
import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    LUNA_default: THREE.Mesh;
  };
  materials: {
    LUNA_default: THREE.MeshStandardMaterial;
  };
};

export default function LUNADefault(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/LUNA_default.glb"
  ) as GLTFResult;

  const magicianRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (magicianRef.current) {
      magicianRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    }
  });
  return (
    <group {...props} dispose={null} scale={[4.5, 4.5, 4.5]}>
      <mesh
        geometry={nodes.LUNA_default.geometry}
        material={materials.LUNA_default}
        rotation={[Math.PI / 2, 0, Math.PI]}
        ref={magicianRef}
      />
    </group>
  );
}
