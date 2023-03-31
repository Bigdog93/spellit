// import * as THREE from "three";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RootState } from "@/store";

// import Mag from "@/assets/models/Mag";
import BigMagicCircle from "@/assets/models/BigMagicCircle";
import Undercha from "@/assets/models/Undercha";
import QuickstartButton from "@/assets/models/QuickstartButton";
import DeckButton from "@/assets/models/DeckButton";
import MypageButton from "@/assets/models/MypageButton";
import CharacterButton from "@/assets/models/CharacterButton";
import Ranking from "@/assets/models/Ranking";
// import LogoutButton from "@/components/Game/models/LogoutButton";
// import BackgroundSpell from "@/components/Game/models/BackgroundSpell";
import AKDefault from "@/assets/models/AKDefault";
import CBDefault from "@/assets/models/CB_default";
import LUNADefault from "@/assets/models/LUNA_default";
import styles from "./Home.module.css";
import Friend from "@/assets/models/Friend";

const Home = () => {
  // 기본 카메라 위치
  // Vector3 {x: 0, y: 3.061616997868383e-16, z: 5}
  const cha_name = useSelector(
    (state: RootState) => state.user.gameCharacter?.englishName
  );

  return (
    <div>
      <Canvas style={styles}>
        <ambientLight intensity={0.8} />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        {/* <pointLight position={[-10, -10, -10]} /> */}

        {/* <OrbitControls /> */}
        {/* <Box position={[0, 0, 2]} /> */}

        {/* <Mag position={[-3, 0, 0]} /> */}
        {cha_name === "AK" && <AKDefault position={[-3, 0.2, 0]} />}
        {cha_name === "CB" && <CBDefault position={[-3, 0.2, 0]} />}
        {cha_name === "LUNA" && <LUNADefault position={[-3, 0.2, 0]} />}
       
        <Undercha position={[-2.7, -2.5, 0]} />
        <BigMagicCircle
          position={[2.5, 0, 0]}
          rotation={[0, Math.PI / 3, Math.PI / 2]}
        />
        <QuickstartButton
          position={[2.5, 0, 0]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
          // onClick={toQuickStart}
        />
        <DeckButton
          position={[4.2, -1.5, 1.3]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
        />
        <MypageButton
          position={[0.4, -1.5, -1]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
        />
        <CharacterButton
          position={[2.3, 2.5, 0.1]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
        />
        <Ranking position={[-6.2, 1, 0]} />
        <Friend position={[-6.2, -0.5, 0]} />

        {/* <BackgroundSpell
          position={[-50, 20, -50]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        /> */}
        {/* <LogoutButton
          position={[4.3, -2, 1.8]}
          rotation={[Math.PI / 2, 0,0]}
        /> */}
      </Canvas>
    </div>
  );
};

export default Home;

export function Box(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // useFrame((state, delta) => (ref.current.rotation.z += 0.01));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 0.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
