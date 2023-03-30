

import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MathUtils } from "three";
import { useGLTF } from "@react-three/drei";

import { RootState } from "@/store";

export default function MypageButton(props) {
  const { nodes, materials } = useGLTF("./models/homeglb/mypagebutton.glb");

  const myPageRef = useRef();
  const [hover, setHover] = useState(false);
  const [y, setY] = useState(0);

  useFrame(() => {
    if (hover) {
      setY((y) => MathUtils.lerp(y, 0.1, 0.05));
    } else {
      setY((y) => MathUtils.lerp(y, 0, 0.05));
    }
    myPageRef.current.position.setY(y);
  });

  // 페이지 이동
  const navigate = useNavigate();

  const id = useSelector((state: RootState) => (state.user.id));

  const toMypage = () => {
    navigate(`/profile/${id}`)
  }

  return (
    <group {...props} dispose={null} scale={[1.5, 1.5, 1.5]} onClick={toMypage}>
			
      <mesh
        ref={myPageRef}
        geometry={nodes["Group_68_(1)"].geometry}
        material={materials["Group 68 (1)"]}
        
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]}
      />
    </group>
  );
}


