import { useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { BatchedRenderer, QuarksLoader } from "three.quarks";
import { Group } from "three";

interface Props {
  handleButton: () => void;
  handleDone: () => void;
}

const FireBall: React.FC<Props> = ({ handleButton, handleDone }: Props) => {
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
      loader.load("./models/skilljson/doublefireball.json", (obj) => {
        obj.traverse((child) => {
          if (child.type === "ParticleEmitter") {
            batchSystem.addSystem((child as any).system);
          }
        });
        scene.add(obj);
        // 초기 위치 설정(반응형)
        scene.position.set((-1.5 * size.width) / size.height, -0.5, 0);
      });
    }
  }, [size]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <group ref={sceneRef} />
    </>
  );
};

export default FireBall;
