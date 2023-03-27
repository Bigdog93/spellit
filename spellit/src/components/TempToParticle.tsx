import React from 'react';

const TempToParticle = () => {
	return (
		<div>
			
		</div>
	);
};

export default TempToParticle;



// import * as THREE from "three";
// import { useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// // import UnderCha from "@/components/Game/models/Undercha";
// // import Furball from "./Game/models/Furball";
// import Newcha from "./Game/models/Newcha";
// // import tmagician from "./Game/models/magician.png";
// import styles from "./Home.module.css";
// import Magician from "./Game/models/Magician";
// import Magician3 from "./Game/models/Magician3";
// // import TestPart from "./Game/models/TestPart";

// export function Box(props: JSX.IntrinsicElements["mesh"]) {
//   const ref = useRef<THREE.Mesh>(null!);
//   const [hovered, hover] = useState(false);
//   const [clicked, click] = useState(false);
//   useFrame((state, delta) => (ref.current.rotation.x += 0.01));
//   useFrame((state, delta) => (ref.current.rotation.z += 0.01));

//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={clicked ? 0.5 : 1}
//       onClick={(event) => click(!clicked)}
//       onPointerOver={(event) => hover(true)}
//       onPointerOut={(event) => hover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// }

// const Home = () => {
//   return (
//     <div>
//       <Canvas style={styles}>
//         <ambientLight intensity={0.5} />
//         {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
//         {/* <pointLight position={[-10, -10, -10]} /> */}
//         <OrbitControls />
//         <Box position={[0, 0, 0]} />
//         {/* <UnderCha position={[0, 0, 0]} /> */}
//         <Newcha position={[15, 0, 0]} />
//         {/* <Furball position={[5, 0, 0]} /> */}
//         <Magician position={[-3, 0, 0]} />
//         <Magician position={[-3, -2, 1]} />

//         <Magician3 position={[-3, -1, 0]} />
//         <Magician3 position={[-3, -1, 0]} />
// 				{/* 여기에서 코드를 렌더링함 */}
//       </Canvas>

//     </div>
//   );
// };

// export default Home;

// import { useRef, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";
// import { System, NebulaEmitter } from "three-nebula";
// import jsontest from "../components/Game/models/particletest.json";

// import styles from "./Home.module.css";

// export function Box(props: JSX.IntrinsicElements["mesh"]) {
//   const ref = useRef<THREE.Mesh>(null!);
//   const [hovered, hover] = useState(false);
//   const [clicked, click] = useState(false);
//   useFrame((state, delta) => (ref.current.rotation.x += 0.01));
//   useFrame((state, delta) => (ref.current.rotation.z += 0.01));

//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={clicked ? 0.5 : 1}
//       onClick={(event) => click(!clicked)}
//       onPointerOver={(event) => hover(true)}
//       onPointerOut={(event) => hover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// }

// const ThreeNebulaScene = () => {
//   const systemRef = useRef<System>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const setupThreeNebula = async () => {
//       const newSystem = await System.fromJSONAsync(jsontest, THREE);
//       systemRef.current = newSystem;
//       setLoading(false);
//     };
//     setupThreeNebula();
//   }, []);

//   useFrame(() => {
//     if (systemRef.current) {
//       systemRef.current.update();
//     }
//   });

//   if (loading || !systemRef.current) {
//     return null; // 로딩 중 또는 system이 undefined일 경우 렌더링하지 않음
//   }

//   const emitters = Object.values(systemRef.current.emitters);

//   return (
//     <group>
//       {emitters.map((emitter) => (
//         <primitive object={emitter} key={emitter.id} dispose={null} />
//       ))}
//     </group>
//   );
// };

// const Home = () => {
//   return (
//     <Canvas style={styles}>
//       <ambientLight intensity={0.5} />
//       <OrbitControls />
//       <Box position={[0, -3, 0]} />
//       <ThreeNebulaScene />
//     </Canvas>
//   );
// };

// export default Home;

