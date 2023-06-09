// import { useRef } from "react";

// import { useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";

// export default function BigMagicCircle(props) {
//   const { nodes, materials } = useGLTF("./models/homeglb/bigmagiccircle.glb");

//   const bigMagicCircleRef = useRef(null);

//   useFrame((state, delta) => {
//     if (bigMagicCircleRef.current) {
//       bigMagicCircleRef.current.rotation.y -= 0.0005;
//     }
//   });

//   return (
//     <group {...props} dispose={null} scale={[5.5, 5.5, 5.5]}>
//       <mesh
//         ref={bigMagicCircleRef}
//         geometry={nodes.TestBigSpell.geometry}
//         material={materials.TestBigSpell}
//       />
//     </group>
//   );
// }

import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    TestBigSpell: THREE.Mesh;
  };
  materials: {
    TestBigSpell: THREE.MeshStandardMaterial;
  };
};

export default function BigMagicCircle(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/homeglb/bigmagiccircle.glb"
  ) as GLTFResult;

  const bigMagicCircleRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (bigMagicCircleRef.current) {
      bigMagicCircleRef.current.rotation.y -= 0.0005;
    }
  });

  return (
    <group {...props} dispose={null} scale={[5.5, 5.5, 5.5]}>
      <mesh
        ref={bigMagicCircleRef}
        geometry={nodes.TestBigSpell.geometry}
        material={materials.TestBigSpell}
      />
    </group>
  );
}


