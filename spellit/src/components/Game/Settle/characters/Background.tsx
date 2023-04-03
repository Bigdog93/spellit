import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    ["battle-background"]: THREE.Mesh;
  };
  materials: {
    ["battle-background"]: THREE.MeshStandardMaterial;
  };
};

export default function Background(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/settleglb/background.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={[9, 9, 9]}>
      <mesh
        geometry={nodes["battle-background"].geometry}
        material={materials["battle-background"]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      />
    </group>
  );
}
