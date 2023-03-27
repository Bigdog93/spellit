import { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

export default function QuickstartButton(props) {
  const { nodes, materials } = useGLTF("./models/quickstartbutton.glb");
  const quickRef = useRef();
  const [hover, setHover] = useState(false);
  const [y, setY] = useState(0);

  useFrame(() => {

    if (hover) {
      setY(y => MathUtils.lerp(y, 0.1, 0.05));
    }
    else {
      setY(y => MathUtils.lerp(y, 0, 0.05));
    }
    quickRef.current.position.setY(y);
  });

  return (
    <group {...props} dispose={null} scale={[2.5, 2.5, 2.5]}>
			{/* <pointLight intensity={10} color="blue" position={[2.5, 0, 0]}/> */}
      <mesh
			
        ref={quickRef}
        geometry={nodes.quickstartbutton.geometry}
        material={materials.quickstartbutton}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[0, 0, 0]}
      />
    </group>
  );
}
