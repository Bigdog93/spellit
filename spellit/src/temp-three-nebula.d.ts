declare module "three-nebula" {
  import * as THREE from "three";

  interface NebulaEmitter extends THREE.Object3D {
    positionRandomness: number;
    velocity: THREE.Vector3;
    velocityRandomness: number;
    color: THREE.Color;
    turbulence: number;
    lifetime: number;
    size: number;
    sizeRandomness: number;
    opacity: number;
    opacityRandomness: number;
    particleCount: number;
    emitterDuration: number;
    emitterDelay: number;
    particleRotation: number;
    particleRotationRandomness: number;
    particleSpriteTexure: THREE.Texture;
    emitter: any;
  }

  export class System {
    constructor();
    emitters: THREE.Object3D;
    update(): void;
    static fromJSONAsync(json: any, THREE: typeof THREE): Promise<System>;
  }
}
