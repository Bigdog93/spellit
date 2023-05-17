// import React, { useRef } from 'react'
// import { useGLTF } from "@react-three/drei";


// export default function Undercha(props) {
//   const { nodes, materials } = useGLTF("./models/homeglb/undercha.glb");
//   return (
//     <group {...props} dispose={null} scale={[3, 3, 3]}>
//       <mesh
//         geometry={nodes.undercha.geometry}
//         material={materials.undercha}
//         rotation={[0, Math.PI / 4, -Math.PI / 15]}
//       />
//     </group>
//   );
// }

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    undercha: THREE.Mesh;
  };
  materials: {
    undercha: THREE.MeshStandardMaterial;
  };
};
export default function Undercha(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/undercha.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={[3, 3, 3]}>
      <mesh
        geometry={nodes.undercha.geometry}
        material={materials.undercha}
        rotation={[0, Math.PI / 4, -Math.PI / 15]}
      />
    </group>
  );
}


