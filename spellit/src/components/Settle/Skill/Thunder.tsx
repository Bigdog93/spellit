import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import NebulaEngine, {
  NebulaSystem,
} from "@/components/Settle/engine/NebulaEngine";

import json from "@/components/Settle/engine/jsonSystems/thunder.json";

interface Props {
  handleButton: () => void;
}

const Thunder: React.FC<Props> = ({ handleButton}: Props) => {
  // const { position } = props;

  const { scene } = useThree();
  const [particleSystem, setParticleSystem] = useState<NebulaSystem | null>();
  const [currentPosition, setCurrentPosition] = useState(new Vector3(4, 4, 0));

  useFrame((state, delta) => {
    const targetPosition = new Vector3(4, 0, 0);
    const newPosition = currentPosition.clone().lerp(targetPosition, delta * 2);
    setCurrentPosition(newPosition);
    if (particleSystem) {
      particleSystem.emitters[0].position.copy(newPosition);
      NebulaEngine.update(particleSystem);
      if (newPosition.distanceTo(targetPosition) < 0.01) {
        handleButton();
				// 호출을 멈춤
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

export default Thunder;
