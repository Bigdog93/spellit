import { useLayoutEffect, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BatchedRenderer, QuarksLoader } from "three.quarks";
import { Group } from "three";

interface Props {
  handleSpell: () => void;
  isSpell: boolean;
}

const Light1: React.FC<Props> = ({ handleSpell, isSpell }: Props) => {
  const { size } = useThree();
  const sceneRef = useRef<Group>(null);
  const batchSystemRef = useRef<BatchedRenderer>();

  // scene 렌더링
  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const batchSystem = new BatchedRenderer();
    batchSystemRef.current = batchSystem;
    if (scene) {
      scene.add(batchSystem);

      const loader = new QuarksLoader();
      loader.setCrossOrigin("");
      loader.load("/models/skilljson/light.json", (obj) => {
        obj.traverse((child) => {
          if (child.type === "ParticleEmitter") {
            batchSystem.addSystem((child as any).system);
          }
        });
        scene.add(obj);
        scene.position.set(1, -0.5, 0);
        scene.scale.set(0.4,0.4,0.4);
			

      });
    }
  }, [size]);

  // scene 애니메이션
  useFrame((state, delta) => {
    const batchSystem = batchSystemRef.current;
    setTimeout(() => {
      if (batchSystem) {
        batchSystem.update(delta);
      }
    }, 1000);

  });
	
	setTimeout(() => {
		handleSpell();
	}, 4000);

  // 사운드
  useEffect(() => {
    let tornado: HTMLAudioElement | null = null;
    if (isSpell) {
      tornado = new Audio("/bgm/tornado.mp3");
      tornado.play();
    }
    return () => {
      if (tornado) {
        tornado.pause();
        tornado.currentTime = 0;
      }
    };
  }, [isSpell]);

  return (
    <>
      <group ref={sceneRef} />
    </>
  );
};

export default Light1;
