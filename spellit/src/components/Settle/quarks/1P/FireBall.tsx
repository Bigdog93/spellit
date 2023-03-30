import { useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BatchedRenderer, QuarksLoader } from "three.quarks";
import { Group, Vector3 } from "three";

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

  useFrame((state, delta) => {
    const { scene } = state;
    const batchSystem = batchSystemRef.current;

    const currentPosition = new Vector3().copy(scene.position);
    const newPosition = new Vector3().copy(currentPosition);

    // 반응형 위치
    newPosition.x += delta * speed * (size.width / size.height);
    scene.position.copy(newPosition);

    if (newPosition.x > (2.5 * size.width) / size.height) {
      handleDone();
      handleButton();
    }

    if (batchSystem) {
      batchSystem.update(delta);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <group ref={sceneRef} />
    </>
  );
};

export default FireBall;
