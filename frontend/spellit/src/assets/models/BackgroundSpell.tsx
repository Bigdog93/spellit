/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 backgroundspell.glb --types
*/

import * as THREE from "three";

import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Group_88: THREE.Mesh;
  };
  materials: {
    ["Group 88"]: THREE.MeshStandardMaterial;
  };
};

export default function BackgroundSpell(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/backgroundspell.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={[200, 200, 200]}>
      <mesh
        geometry={nodes.Group_88.geometry}
        material={materials["Group 88"]}
      />
    </group>
  );
}
