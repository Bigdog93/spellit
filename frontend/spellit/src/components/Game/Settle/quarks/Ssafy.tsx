import { useLayoutEffect, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BatchedRenderer, QuarksLoader } from "three.quarks";
import { Group } from "three";

interface Props {
  handleSpell: () => void;
  isSpell: boolean;
  selectCamera: (num: number) => void;
  turn: boolean;
  handleIdx: () => void;
  setIsStart: (item: boolean) => void;
}

const Ssafy: React.FC<Props> = ({
  handleSpell,
  isSpell,
  selectCamera,
  turn,
  handleIdx,
  setIsStart,
}: Props) => {
  const { size } = useThree();
  const sceneRef = useRef<Group>(null);
  const batchSystemRef = useRef<BatchedRenderer>();



  // scene 렌더링
  useLayoutEffect(() => {
    selectCamera(1);

    const scene = sceneRef.current;
    const batchSystem = new BatchedRenderer();
    batchSystemRef.current = batchSystem;
    if (scene) {
      scene.add(batchSystem);

      const loader = new QuarksLoader();
      loader.setCrossOrigin("");
      loader.load("/models/skilljson/ssafyskill.json", (obj) => {
        obj.traverse((child) => {
          if (child.type === "ParticleEmitter") {
            batchSystem.addSystem((child as any).system);
          }
        });
        scene.add(obj);
        if (turn) {
          scene.position.set(2, -0.5, 0);
        } else {
          scene.position.set(-2, -0.5, 0);
        }
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

  useEffect(() => {
    setTimeout(() => {
      handleIdx();
      handleSpell();
      setIsStart(true);
    }, 4000);
  }, []);

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

export default Ssafy;
