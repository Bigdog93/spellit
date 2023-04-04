

import * as THREE from "three";
import { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useNavigate } from "react-router-dom";

type GLTFResult = GLTF & {
  nodes: {
    Group_88: THREE.Mesh;
  };
  materials: {
    ["Group 88"]: THREE.MeshStandardMaterial;
  };
};

export default function DeckButton(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/deckbutton.glb"
  ) as GLTFResult;

  const deckRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const [y, setY] = useState(0);

  useFrame(() => {
    if (hover) {
      setY((y) => THREE.MathUtils.lerp(y, 0.1, 0.05));
    } else {
      setY((y) => THREE.MathUtils.lerp(y, 0, 0.05));
    }
    if (deckRef.current) {
      deckRef.current.position.setY(y);
    }
  });

  // onClick 이동
  const navigate = useNavigate();
  const toDeck = () => {
    navigate("/deck");
  };

  return (
    <group {...props} dispose={null} scale={[1.5, 1.5, 1.5]} onClick={toDeck}>
      <mesh
        ref={deckRef}
        geometry={nodes.Group_88.geometry}
        material={materials["Group 88"]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]}
      />
    </group>
  );
}
