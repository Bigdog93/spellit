import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    logout: THREE.Mesh;
  };
  materials: {
    logout: THREE.MeshStandardMaterial;
  };
};

export default function LogoutButton(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/logout.glb"
  ) as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.logout.geometry}
        material={materials.logout}
        // rotation={[Math.PI / 2, 0, Math.PI / 9]}
      />
    </group>
  );
}
