import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import NebulaEngine, {
  NebulaSystem,
} from "@/components/Settle/engine/NebulaEngine";

// import json from "@/components/Settle/engine/jsonSystems/smoke.json";
import json from "@/components/Settle/engine/jsonSystems/mixed.json";

// import json from "@/components/Settle/engine/jsonSystems/greenenergy.json";

interface Props {
  handleButton: () => void;
}

const Smoke: React.FC<Props> = ({ handleButton }: Props) => {
  // const { position } = props;

  const { scene, camera } = useThree();
  const [particleSystem, setParticleSystem] = useState<NebulaSystem | null>();
  // const [currentPosition, setCurrentPosition] = useState(new Vector3(4, -2, 0));
  const [currentPosition, setCurrentPosition] = useState(new Vector3(4, -2, 0));
	

  useFrame((state, delta) => {
    if (particleSystem) {
      particleSystem.emitters[0].position.copy(currentPosition);
      NebulaEngine.update(particleSystem);
    }
    // camera.position.set(0, 0, 0.5); // 카메라 위치 설정
    // camera.lookAt(0, 0, 0); // 카메라 방향 설정
    setTimeout(() => {
      handleButton();
    }, 5000);
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

export default Smoke;
