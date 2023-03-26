import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./Settle.css";
import FireBall from "@//components/Settle/Skill/FireBall";

function Settle() {
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const handleButton = () => {
    setIsMoving(!isMoving);
  };

  console.log(isMoving, "is");
  return (
    <div className="box">
      <button onClick={handleButton}>button</button>
      <Canvas>
        <OrbitControls />
        {isMoving && (
          <>
            <FireBall position={[-2, 0, 0]} handleButton={handleButton} />
          </>
        )}
      </Canvas>
    </div>
  );
}

export default Settle;
