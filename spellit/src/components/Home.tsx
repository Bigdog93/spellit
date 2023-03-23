// import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

import Magician from "@/components/Game/models/Magician";
import BigMagicCircle from "@/components/Game/models/BigMagicCircle";
import Undercha from "@/components/Game/models/Undercha";
import QuickstartButton from "@/components/Game/models/QuickstartButton";
import DeckButton from "@/components/Game/models/DeckButton";
import MypageButton from "@/components/Game/models/MypageButton";
import FriendButton from "@/components/Game/models/FriendButton";

import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const toQuickStart = () => {
    navigate("/match");
  };

  return (
    <div>
      <Canvas style={styles}>
        <ambientLight intensity={0.8} />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        {/* <pointLight position={[-10, -10, -10]} /> */}

        <OrbitControls />
        {/* <Box position={[0, 0, 0]} /> */}

        <Magician position={[-3, 0, 0]} />
        <Undercha position={[-2.7, -2.5, 0]} />
        <BigMagicCircle
          position={[2.5, 0, 0]}
          rotation={[0, Math.PI / 3, Math.PI / 2]}
        />
        <QuickstartButton
          position={[2.5, 0, 0]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
          onClick={toQuickStart}
        />
        <DeckButton
          position={[4.2, -1.5, 1.3]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
        />
        <MypageButton
          position={[0.4, -1.5, -1]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
        />
        <FriendButton
          position={[2.3, 2.5, 0.1]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
        />
        {/* 여기에서 코드를 렌더링함 */}
      </Canvas>
    </div>
  );
};

export default Home;

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
