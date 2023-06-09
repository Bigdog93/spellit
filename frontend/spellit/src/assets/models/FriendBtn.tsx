

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

type GLTFResult = GLTF & {
  nodes: {
    friend: THREE.Mesh;
  };
  materials: {
    friend: THREE.MeshStandardMaterial;
  };
};

export default function FriendBtn(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/friend.glb"
  ) as GLTFResult;

  const friendRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const [y, setY] = useState(0);

  useFrame(() => {
    if (hover) {
      setY((y) => MathUtils.lerp(y, 0.1, 0.05));
    } else {
      setY((y) => MathUtils.lerp(y, 0, 0.05));
    }
    if (friendRef.current) {
      friendRef.current.position.setY(y);
    }
  });
	
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={friendRef}
        geometry={nodes.friend.geometry}
        material={materials.friend}
        rotation={[Math.PI / 2, 0, 0]}
				onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]}
      />
    </group>
  );
}
