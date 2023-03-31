import { useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BatchedRenderer, QuarksLoader } from "three.quarks";
import { Group } from "three";

interface Props {
  handleButton: () => void;
  handleSpell: () => void;
}

const Start: React.FC<Props> = ({ handleButton, handleSpell }: Props) => {
  const { size } = useThree();
  const sceneRef = useRef<Group>(null);
  const batchSystemRef = useRef<BatchedRenderer>();

  const speed = 4;

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const batchSystem = new BatchedRenderer();
    batchSystemRef.current = batchSystem;
    if (scene) {
      scene.add(batchSystem);

      const loader = new QuarksLoader();
      loader.setCrossOrigin("");
      loader.load("./models/skilljson/start.json", (obj) => {
        obj.traverse((child) => {
          if (child.type === "ParticleEmitter") {
            batchSystem.addSystem((child as any).system);
          }
        });
        scene.add(obj);
        // 초기 위치 설정(반응형)
        scene.position.set(-3.5, -0.5, -1);
        scene.scale.set(0.4, 0.4, 0.4);
      });
    }
  }, [size]);

  useFrame((state, delta) => {
    const batchSystem = batchSystemRef.current;

    if (batchSystem) {
      batchSystem.update(delta);
    }

    setTimeout(() => {
      handleButton();
      handleSpell();
    }, 2000);
  });

  return (
    <>
      {/* <ambientLight intensity={0.5} /> */}
      <group ref={sceneRef} />
    </>
  );
};

export default Start;
