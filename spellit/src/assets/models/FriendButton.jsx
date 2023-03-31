import { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

export default function FriendButton(props) {
  const { nodes, materials } = useGLTF("./models/homeglb/friendbutton.glb");
  const friendRef = useRef();
  const [hover, setHover] = useState(false);
  const [y, setY] = useState(0);

  useFrame(() => {
    if (hover) {
      setY((y) => MathUtils.lerp(y, 0.1, 0.05));
    } else {
      setY((y) => MathUtils.lerp(y, 0, 0.05));
    }
    friendRef.current.position.setY(y);
  });

  return (
    <group {...props} dispose={null} scale={[1.5, 1.5, 1.5]}>
      <mesh
        ref={friendRef}
        geometry={nodes.Group_88.geometry}
        material={materials["Group 88"]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]}
      />
    </group>
  );
}
