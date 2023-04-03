import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BatchedRenderer, QuarksLoader } from "three.quarks";
import { Group } from "three";

interface Props {
  handleSpell: () => void;
  isSpell: boolean;
  selectCamera: (num: number) => void;
  turn: React.RefObject<number>;
}

const FireBall: React.FC<Props> = ({
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
    selectCamera(2);
    const scene = sceneRef.current;
    const batchSystem = new BatchedRenderer();
    batchSystemRef.current = batchSystem;
    if (scene) {
      scene.add(batchSystem);

      const loader = new QuarksLoader();
      loader.setCrossOrigin("");
      loader.load("./models/skilljson/fireball.json", (obj) => {
        obj.traverse((child) => {
          if (child.type === "ParticleEmitter") {
            batchSystem.addSystem((child as any).system);
          }
        });
        if (turn.current === 1) {
          obj.position.set(-2, 0, 0);
        } else {
					obj.position.set(2, 0, 0);
					obj.rotation.set(0, Math.PI, 0)
				}
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
          const maxX = 7;
          const minX = -5;
          const speed = 15;
          const deltaPosition = speed * delta;
          const movementCount = 5;
          let currentCount = 0;

          obj.position.setX(Math.min(obj.position.x + deltaPosition, maxX));
          if (obj.position.x >= maxX) {
            currentCount++;
            obj.position.setX(minX);
            if (currentCount === movementCount) {
              // Stop
            }
          }
        } else {
          const maxX = 7;
          const minX = -5;
          const speed = 15;
          const deltaPosition = speed * delta;
          const movementCount = 5;
          let currentCount = 0;

          obj.position.setX(Math.max(obj.position.x - deltaPosition, minX));
          if (obj.position.x <= minX) {
            currentCount++;
            obj.position.setX(maxX);
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
        sound = new Audio("/bgm/fireball.mp3");
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

export default FireBall;
