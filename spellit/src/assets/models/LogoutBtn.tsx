import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Group_227: THREE.Mesh;
  };
  materials: {
    ["Group 227"]: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/logoutbutton.glb"
  ) as GLTFResult;

  const logoutRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const [y, setY] = useState(0);

  useFrame(() => {
    if (hover) {
      setY((y) => THREE.MathUtils.lerp(y, 0.1, 0.05));
    } else {
      setY((y) => THREE.MathUtils.lerp(y, 0, 0.05));
    }
    if (logoutRef.current) {
      logoutRef.current.position.setY(y);
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={logoutRef}
        geometry={nodes.Group_227.geometry}
        material={materials["Group 227"]}
				rotation={[Math.PI / 2, 0, 0]}
				onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]}
      />
    </group>
  );
}
