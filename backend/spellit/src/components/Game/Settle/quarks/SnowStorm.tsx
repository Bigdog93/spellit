import { useLayoutEffect, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BatchedRenderer, QuarksLoader } from "three.quarks";
import { Group } from "three";


interface Props {
  handleSpell: () => void;
  isSpell: boolean;
  selectCamera: (num: number) => void;
  turn: boolean;
	handleIdx:()=> void
	setIsStart:(item:boolean)=> void
}

const SnowStorm: React.FC<Props> = ({
  handleSpell,
  isSpell,
  selectCamera,
  turn,
	handleIdx,
	setIsStart
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
      loader.load("/models/skilljson/icestorm.json", (obj) => {
        obj.traverse((child) => {
          if (child.type === "ParticleEmitter") {
            batchSystem.addSystem((child as any).system);
          }
        });
        scene.add(obj);
        if (turn) {
          scene.position.set(2.3, -0.5, 0);
        } else {
          scene.position.set(-2.3, -0.5, 0);
        }

        scene.scale.set(0.7, 0.7, 0.7);
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

	useEffect(()=> {
		setTimeout(() => {
			handleIdx()
      handleSpell();
			setIsStart(true)
		}, 5500);
	})


  // 사운드
  useEffect(() => {
    let sound: HTMLAudioElement | null = null;
    let sound2: HTMLAudioElement | null = null;

    if (isSpell) {
      sound = new Audio("/bgm/icecrack.mp3");
      sound.play();
      sound2 = new Audio("/bgm/icespell.mp3");
      sound2.play();
    }
    return () => {
      if (sound && sound2) {
        sound.pause();
        sound.currentTime = 0;
        sound2.pause();
        sound2.currentTime = 0;
      }
    };
  }, [isSpell]);

  return (
    <>
      <group ref={sceneRef} />
    </>
  );
};

export default SnowStorm;
