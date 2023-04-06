import { useLayoutEffect, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BatchedRenderer, QuarksLoader } from "three.quarks";
import { Group } from "three";

interface Props {
  handleButton: () => void;
  handleSpell: () => void;
  isStart: boolean;
  turn: React.RefObject<number>;
}

const Start: React.FC<Props> = ({
  handleButton,
  handleSpell,
  isStart,
  turn,
}: Props) => {
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
      loader.load("/models/skilljson/start.json", (obj) => {
        obj.traverse((child) => {
          if (child.type === "ParticleEmitter") {
            batchSystem.addSystem((child as any).system);
          }
        });
        scene.add(obj);
        // 초기 위치 설정(반응형)
        scene.scale.set(0.4, 0.4, 0.4);
        if (turn.current === 1) {
          scene.position.set(-3.5, -0.5, -1);
        } else {
          scene.position.set(3.5, -0.5, -1);
        }
      });
    }
  }, [size]);

	// console.log(isStart, "is Start in START")

  // scene 애니메이션
  useFrame((state, delta) => {
    const batchSystem = batchSystemRef.current;

    if (batchSystem) {
      batchSystem.update(delta);
    }

  });
	
	useEffect(()=> {
		setTimeout(() => {
			console.log("happengin?")
			handleSpell();
			handleButton();
		}, 2000);
	}, [])

	

  // 사운드
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    let spell: HTMLAudioElement | null = null;
    setTimeout(() => {
      if (isStart) {
        spell = new Audio("/bgm/startspell.mp3");
        spell.play();
      }
      return () => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      };
    }, 500);
  }, [isStart]);

  return (
    <>
      <group ref={sceneRef} />
    </>
  );
};

export default Start;
