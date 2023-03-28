import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import NebulaEngine, {
  NebulaSystem,
} from "@/components/Settle/engine/NebulaEngine";

import json from "@/components/Settle/engine/jsonSystems/fireBall.json";

interface Props {
  handleButton: () => void;
  handleDone: () => void;
}

const FireBallWrapper: React.FC<Props> = ({
  handleButton,
  handleDone,
}: Props) => {
  const { scene, camera } = useThree();
  const [particleSystem, setParticleSystem] = useState<NebulaSystem | null>();
  const [currentPosition, setCurrentPosition] = useState(new Vector3(0, 7, 0));

  useEffect(() => {
    NebulaEngine.loadSystem(json as unknown as JSON, scene).then(
      (nebulaSystem) => {
        setParticleSystem(nebulaSystem);
      }
    );
  }, [scene]);

  useFrame((state, delta) => {
    const targetPosition = new Vector3(3, 1, 0);
    const newPosition = currentPosition.clone().lerp(targetPosition, delta * 2);
    setCurrentPosition(newPosition);
    setTimeout(() => {
      if (particleSystem) {
        particleSystem.emitters[0].position.copy(newPosition);
        NebulaEngine.update(particleSystem);
        if (newPosition.distanceTo(targetPosition) < 0.01) {
          handleButton();
          handleDone();
          setParticleSystem(null);
        }
      }
    }, 2000);

    // const currentPos = camera.position.clone()
    // const newPos = new Vector3(
    // 	currentPos.x + (Math.random() * 0.1 - 0.05),
    // 	currentPos.y + (Math.random() * 0.1 - 0.05),
    // 	currentPos.z + (Math.random() * 0.1 - 0.05)
    // );

    // Update the camera position
    // camera.position.copy(newPos);

    // Update the particle system position
    // if (particleSystem) {
    // 	particleSystem.emitters[0].position.copy(newPos);
    // 	NebulaEngine.update(particleSystem);
    // }
  });

  useEffect(() => {
    camera.position.set(-6, 0, 10);
    // camera.lookAt(new Vector3(-12, 8, 7));
  }, [camera]);

  return (
    <group>
      <ambientLight intensity={0.5} />
      {particleSystem && <></>}
    </group>
  );
};

export default FireBallWrapper;
