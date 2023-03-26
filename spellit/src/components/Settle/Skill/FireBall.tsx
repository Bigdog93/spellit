import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import NebulaEngine, {
  NebulaSystem,
} from "@/components/Settle/engine/NebulaEngine";

import json from "@/components/Settle/engine/jsonSystems/fireBall.json";

interface Props {
  position: number[];
  handleButton: () => void;
}

const FireBall: React.FC<Props> = ({position, handleButton}: Props) => {
  // const { position } = props;

  const { scene } = useThree();
  const [particleSystem, setParticleSystem] = useState<NebulaSystem | null>();
  const [currentPosition, setCurrentPosition] = useState(new Vector3(0, 5, 0));

  useFrame((state, delta) => {
    const targetPosition = new Vector3(4, -1, 0);
    const newPosition = currentPosition.clone().lerp(targetPosition, delta * 2);
    setCurrentPosition(newPosition);
    if (particleSystem) {
      particleSystem.emitters[0].position.copy(newPosition);
      NebulaEngine.update(particleSystem);
      if (newPosition.distanceTo(targetPosition) < 0.01) {
        handleButton();
        setParticleSystem(null);
      }
    }
  });

  useEffect(() => {
    NebulaEngine.loadSystem(json as unknown as JSON, scene).then(
      (nebulaSystem) => {
        setParticleSystem(nebulaSystem);
      }
    );
  }, []);

  if (!particleSystem) return null;

  return <></>;
};

export default FireBall;
