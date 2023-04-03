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

const Light: React.FC<Props> = ({
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
    selectCamera(3);
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
        if (turn.current === 1) {
          obj.position.set(-4, 0, 0);
        } else {
          obj.position.set(4, 0, 0);
        }
        obj.scale.set(0.2, 0.2, 0.2);
        obj.name = "light"; // obj의 이름을 설정합니다.
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

    setTimeout(() => {
      handleSpell();
    }, 4500);

    // obj 애니메이션
    const scene = sceneRef.current;
    if (scene) {
      const obj = scene.getObjectByName("light");
      if (obj) {
        if (turn.current === 1) {
          const start = new THREE.Vector3(-20, 10, -20);
          const end = new THREE.Vector3(3, -0.5, 0.3);
          const speed = 29;
          const deltaPosition = speed * delta;
          const movementCount = 5;
          let currentCount = 0;

          obj.position.addScaledVector(
            end.clone().sub(start).normalize(),
            deltaPosition
          );
          if (obj.position.x >= end.x) {
            currentCount++;
            obj.position.copy(start);
            if (currentCount === movementCount) {
              // Stop
            }
          }
        } else {
          const start = new THREE.Vector3(15, 10, -20);
          const end = new THREE.Vector3(-7, -0.5, 0.3);
          const speed = 29;
          const deltaPosition = speed * delta;
          const movementCount = 5;
          let currentCount = 0;

          obj.position.addScaledVector(
            end.clone().sub(start).normalize(),
            deltaPosition
          );
          if (obj.position.x <= end.x) {
            currentCount++;
            obj.position.copy(start);
            if (currentCount === movementCount) {
              // Stop
            }
          }
        }
      }
    }
  });

  useEffect(() => {
    let sound: HTMLAudioElement | null = null;
    if (isSpell) {
      const test = setInterval(() => {
        sound = new Audio("/bgm/light.mp3");
        sound.play();
      }, 1200);
      setTimeout(() => {
        clearInterval(test);
        sound = null;
      }, 4000);
    }

    return () => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    };
  });

  return (
    <>
      <group ref={sceneRef} />
    </>
  );
};

export default Light;
