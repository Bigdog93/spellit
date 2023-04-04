import * as THREE from "three";
import React, { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

type GLTFResult = GLTF & {
  nodes: {
    ["Group_68_(1)"]: THREE.Mesh;
  };
  materials: {
    ["Group 68 (1)"]: THREE.MeshStandardMaterial;
  };
};

export default function MypageButton(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/mypagebutton.glb"
  ) as GLTFResult;

  const myPageRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const [y, setY] = useState(0);

  useFrame(() => {
    if (hover) {
      setY((y) => MathUtils.lerp(y, 0.1, 0.05));
    } else {
      setY((y) => MathUtils.lerp(y, 0, 0.05));
    }
    if (myPageRef.current) {
      myPageRef.current.position.setY(y);
    }
  });

  // 페이지 이동
  const navigate = useNavigate();

  const id = useSelector((state: RootState) => state.user.id);

  const toMypage = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <group {...props} dispose={null} scale={[1.5, 1.5, 1.5]} onClick={toMypage}>
      <mesh
        ref={myPageRef}
        geometry={nodes["Group_68_(1)"].geometry}
        material={materials["Group 68 (1)"]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]}
      />
    </group>
  );
}
