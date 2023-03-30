import { useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BatchedRenderer, QuarksLoader } from "three.quarks";
import { Group } from "three";


interface Props {
  handleButton: () => void;
  handleDone: () => void;
}

const ExampleComponent: React.FC<Props> = ({
  handleButton,
  handleDone,
}: Props) => {
  const { size } = useThree();
  const sceneRef = useRef<Group>(null);
  const batchSystemRef = useRef<BatchedRenderer>();

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const batchSystem = new BatchedRenderer();
    batchSystemRef.current = batchSystem;
    if (scene) {
      scene.add(batchSystem);

      const loader = new QuarksLoader();
      loader.setCrossOrigin("");
      loader.load("./models/skilljson/tornado.json", (obj) => {
        obj.traverse((child) => {
          if (child.type === "ParticleEmitter") {
            batchSystem.addSystem((child as any).system);
          }
        });
        scene.add(obj);
      });
    }
  }, [size]);

  useFrame((state, delta) => {
    const { scene, camera } = state;
    const batchSystem = batchSystemRef.current;
    camera.position.set(0, 30, 0);
    camera.lookAt(scene.position);
    if (batchSystem) {
      batchSystem.update(delta);
      // handleButton()
      // handleDone()
    }
  });

  return (
    <>
   
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group ref={sceneRef} />
    </>
  );
};

export default ExampleComponent;
