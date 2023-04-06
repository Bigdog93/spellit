import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRef, useEffect } from "react";

type AllGLTFResult = GLTF & {
  nodes: {
    CB_default: THREE.Mesh;
    AK_default: THREE.Mesh;
    LUNA_default: THREE.Mesh;
  };
  materials: {
    CB_default: THREE.MeshStandardMaterial;
    AK_default: THREE.MeshStandardMaterial;
    LUNA_default: THREE.MeshStandardMaterial;
  };
};

interface Props {
  isSpell: boolean;
  turn: boolean;
}

export function CBDefault2(props: Props & JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/settleglb/CB_default2.glb"
  ) as AllGLTFResult;

  // 타격 관련 로직
  // 시각적 애니메이션
  // const originalColor = useRef<THREE.Color>(
  //   new THREE.Color(materials.CB_default.color)
  // );

  const originalColor = useRef<THREE.Color>(new THREE.Color().setRGB(1, 1, 1));
  const meshRef = useRef<THREE.Mesh>(null);
  const positionRef = useRef<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });
  // console.log(props.turn.current)

  useFrame((state) => {
    if (props.turn) {
      setTimeout(() => {
        if (props.isSpell) {
          const time = state.clock.getElapsedTime() - 2;

          const sinValue = Math.sin(time * 10);
          const newPosition = sinValue * 0.01;

          positionRef.current.x = newPosition;

          const color = new THREE.Color("#ff4040");
          materials.CB_default.color = color;
        } else {
        }
      }, 2000);
      if (!props.isSpell) {
        materials.CB_default.color = originalColor.current;
        positionRef.current.x = 0;
      }

      if (meshRef.current) {
        meshRef.current.position.set(
          positionRef.current.x,
          positionRef.current.y,
          positionRef.current.z
        );
      }
    } else {
      if (!props.isSpell) {
        materials.CB_default.color = originalColor.current;
        positionRef.current.x = 0;
      }

      if (meshRef.current) {
        meshRef.current.position.set(
          positionRef.current.x,
          positionRef.current.y,
          positionRef.current.z
        );
      }
    }
  });
  // 시각적 애니메이션

  // 사운드
  useEffect(() => {
    if (props.turn) {
      let attacked: HTMLAudioElement | null = null;
      if (props.isSpell) {
        setTimeout(() => {
          const test = setInterval(() => {
            if (props.isSpell) {
              attacked = new Audio("/bgm/damaged.mp3");
              attacked.play();
            }
          }, 500);
          setTimeout(() => {
            clearInterval(test);
            attacked = null;
          }, 2000);
        }, 1500);
      }
    }
  }, [props.isSpell]);
  // 사운드

  return (
    <group
      {...props}
      dispose={null}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[4, 4, 4]}
    >
      <mesh
        ref={meshRef}
        geometry={nodes.CB_default.geometry}
        material={materials.CB_default}
      />
    </group>
  );
}

export function AKDefault2(props: Props & JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/settleglb/AK_default2.glb"
  ) as AllGLTFResult;

  // 타격 관련 로직
  // 시각적 애니메이션
  const originalColor = useRef<THREE.Color>(new THREE.Color().setRGB(1, 1, 1));

  // const originalColor = useRef<THREE.Color>(
  //   new THREE.Color(materials.AK_default.color)
  // );

  const meshRef = useRef<THREE.Mesh>(null);
  const positionRef = useRef<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });

  useFrame((state) => {
    if (props.turn) {
      setTimeout(() => {
        if (props.isSpell) {
          const time = state.clock.getElapsedTime() - 2;

          const sinValue = Math.sin(time * 10);
          const newPosition = sinValue * 0.01;

          positionRef.current.x = newPosition;

          const color = new THREE.Color("#ff4040");
          materials.AK_default.color = color;
        } else {
        }
      }, 2000);
      if (!props.isSpell) {
        materials.AK_default.color = originalColor.current;
        positionRef.current.x = 0;
      }

      if (meshRef.current) {
        meshRef.current.position.set(
          positionRef.current.x,
          positionRef.current.y,
          positionRef.current.z
        );
      }
    } else {
      if (!props.isSpell) {
        materials.AK_default.color = originalColor.current;
        positionRef.current.x = 0;
      }

      if (meshRef.current) {
        meshRef.current.position.set(
          positionRef.current.x,
          positionRef.current.y,
          positionRef.current.z
        );
      }
    }
  });
  // 시각적 애니메이션

  // 사운드
  useEffect(() => {
    if (props.turn) {
      let attacked: HTMLAudioElement | null = null;
      if (props.isSpell) {
        setTimeout(() => {
          const test = setInterval(() => {
            if (props.isSpell) {
              attacked = new Audio("/bgm/damaged.mp3");
              attacked.play();
            }
          }, 500);
          setTimeout(() => {
            clearInterval(test);
            attacked = null;
          }, 2000);
        }, 1500);
      }
    }
  }, [props.isSpell]);
  // 사운드

  return (
    <group
      {...props}
      dispose={null}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[4, 4, 4]}
    >
      <mesh
        ref={meshRef}
        geometry={nodes.AK_default.geometry}
        material={materials.AK_default}
      />
    </group>
  );
}

export function LUNADefault2(props: Props & JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/settleglb/LUNA_default2.glb"
  ) as AllGLTFResult;

  // 타격 관련 로직
  // 시각적 애니메이션
  const originalColor = useRef<THREE.Color>(new THREE.Color().setRGB(1, 1, 1));

  // const originalColor = useRef<THREE.Color>(
  //   new THREE.Color(materials.LUNA_default.color)
  // );

  const meshRef = useRef<THREE.Mesh>(null);
  const positionRef = useRef<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });

  useFrame((state) => {
    if (props.turn) {
      setTimeout(() => {
        if (props.isSpell) {
          const time = state.clock.getElapsedTime() - 2;

          const sinValue = Math.sin(time * 10);
          const newPosition = sinValue * 0.01;

          positionRef.current.x = newPosition;

          const color = new THREE.Color("#ff4040");
          materials.LUNA_default.color = color;
        } else {
        }
      }, 2000);
      if (!props.isSpell) {
        materials.LUNA_default.color = originalColor.current;
        positionRef.current.x = 0;
      }

      if (meshRef.current) {
        meshRef.current.position.set(
          positionRef.current.x,
          positionRef.current.y,
          positionRef.current.z
        );
      }
    } else {
      if (!props.isSpell) {
        materials.LUNA_default.color = originalColor.current;
        positionRef.current.x = 0;
      }

      if (meshRef.current) {
        meshRef.current.position.set(
          positionRef.current.x,
          positionRef.current.y,
          positionRef.current.z
        );
      }
    }
  });
  // 시각적 애니메이션

  // 사운드
  useEffect(() => {
    if (props.turn) {
      let attacked: HTMLAudioElement | null = null;
      if (props.isSpell) {
        setTimeout(() => {
          const test = setInterval(() => {
            if (props.isSpell) {
              attacked = new Audio("/bgm/damaged.mp3");
              attacked.play();
            }
          }, 500);
          setTimeout(() => {
            clearInterval(test);
            attacked = null;
          }, 2000);
        }, 1500);
      }
    }
  }, [props.isSpell]);
  // 사운드

  return (
    <group
      {...props}
      dispose={null}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[4, 4, 4]}
    >
      <mesh
        ref={meshRef}
        geometry={nodes.LUNA_default.geometry}
        material={materials.LUNA_default}
      />
    </group>
  );
}
