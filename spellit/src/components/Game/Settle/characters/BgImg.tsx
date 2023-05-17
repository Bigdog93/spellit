import * as THREE from "three";

import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    bgimg: THREE.Mesh;
  };
  materials: {
    bgimg: THREE.MeshStandardMaterial;
  };
};

export default function BgImg(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/settleglb/bgimg.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={[8.6, 8.6, 8.6]}>
      <mesh
        geometry={nodes.bgimg.geometry}
        material={materials.bgimg}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      />
    </group>
  );
}
