import { useLayoutEffect, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BatchedRenderer, QuarksLoader } from "three.quarks";
import { Group } from "three";
import * as THREE from "three";


interface Props {
  handleSpell: () => void;
  isSpell: boolean;
  selectCamera: (num: number) => void;
  turn: React.RefObject<number>;
}

const Earth: React.FC<Props> = ({
  handleSpell,
  isSpell,
  selectCamera,
  turn,
}: Props) => {
  const { size } = useThree();
  const sceneRef = useRef<Group>(null);
  const batchSystemRef = useRef<BatchedRenderer>();

  // scene 렌더링
  useLayoutEffect(() => {
    selectCamera(0);

    const scene = sceneRef.current;
    const batchSystem = new BatchedRenderer();
    batchSystemRef.current = batchSystem;
    if (scene) {
      scene.add(batchSystem);

      const loader = new QuarksLoader();
      loader.setCrossOrigin("");
      loader.load("./models/skilljson/rock2.json", (obj) => {
        obj.traverse((child) => {
          if (child.type === "ParticleEmitter") {
            batchSystem.addSystem((child as any).system);
          }
        });
        if (turn.current === 1) {
          obj.position.set(4, 0, 0);
        } else {
					obj.position.set(-4, 0, 0);
				}
        obj.scale.set(0.2, 0.2, 0.2);
        obj.name = "rock"; // obj의 이름을 설정합니다.
        scene.add(obj);
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
  }, 5500);

  // 사운드
  useEffect(() => {
    let tornado: HTMLAudioElement | null = null;
    if (isSpell) {
      tornado = new Audio("/bgm/dark.mp3");
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

export default Earth;
