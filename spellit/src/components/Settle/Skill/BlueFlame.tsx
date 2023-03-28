import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import NebulaEngine, { NebulaSystem } from "@/components/Settle/engine/NebulaEngine";
import { Object3D } from "three";
import json from "@/components/Settle/engine/jsonSystems/blueFlame.json"

interface Props {}

const BlueFlame: React.FC<Props> = (props: Props) => {
  const { scene } = useThree();
  const [particleSystem, setParticleSystem] = useState<NebulaSystem>();
	const cameraRef = 
  useFrame(() => {
    if (particleSystem) {
      NebulaEngine.update(particleSystem);
		
    }
  });



  useEffect(() => {
    NebulaEngine.loadSystem(json as unknown as JSON, scene).then(
      (nebulaSystem) => {
        setParticleSystem(nebulaSystem);
      }
    );
  }, []);
	console.log(particleSystem)

  return <></>;
};

export default BlueFlame;
