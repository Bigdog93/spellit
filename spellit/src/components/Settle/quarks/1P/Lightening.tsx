import { useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sprite, SpriteMaterial } from "three";
import * as THREE from "three";

interface Props {
  handleSpell: () => void;
  isSpell: boolean;
	selectCamera: (num: number)=> void
}

const Lightning: React.FC<Props> = ({ handleSpell, isSpell, selectCamera}: Props) => {
  const { size } = useThree();
  const sceneRef = useRef<THREE.Group>(null);
  const lightningRef = useRef<Sprite>();
	

  useLayoutEffect(() => {
    const scene = sceneRef.current;
		selectCamera(0)
    if (scene) {
			
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("./models/spark_05.png");
      console.log(texture);

      const color1 = new THREE.Color("#ffffff");
      const color2 = new THREE.Color("#ffff00");
      const mixRatio = 0.5; // 두 색상의 비율
      const mixedColor = new THREE.Color().lerpColors(color1, color2, mixRatio);

      const material = new SpriteMaterial({
        map: texture,
        color: mixedColor,
        blending: THREE.AdditiveBlending,
        fog: true,
      });
      const sprite = new Sprite(material);
      sprite.scale.set(10, 10, 1);
      sprite.position.set(0, 0, -50);
      lightningRef.current = sprite;
      scene.add(sprite);
    }
  }, [size]);

  useFrame((state, delta) => {
    const lightning = lightningRef.current;
    if (lightning) {
      const x = Math.random() * 20;
      const y = Math.random() * 20 - 10;
      lightning.position.set(x, y, 0.1);

      const opacity = Math.max(0.2 - state.clock.elapsedTime * 0.3, 1);
      lightning.material.opacity = opacity;
    }
  });

  setTimeout(() => {
    handleSpell();
  }, 4500);

  return (
    <>
      <group ref={sceneRef} />
    </>
  );
};

export default Lightning;
