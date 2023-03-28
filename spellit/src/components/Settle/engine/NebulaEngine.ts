// import * as THREE from "three";
// import Nebula, { SpriteRenderer } from "three-nebula";

// export type NebulaSystem = {
//   emitters: any[];
//   update: Function;
// };

// class NebulaEngine {
//   update(nebulaSystem: NebulaSystem) {
//     nebulaSystem.update();
//   }

//   async loadSystem(json: JSON, scene: THREE.Scene): Promise<NebulaSystem> {
//     const loaded = await Nebula.fromJSONAsync(json, THREE, {
//       scaleFactor: 0.5,
//     });

//     const nebulaRenderer = new SpriteRenderer(scene, THREE, {
//       scaleFactor: 0.5,
//     });

//     // particle system 객체를 생성합니다.
//     const particleSystem = loaded.addRenderer(nebulaRenderer);

//     // particle system을 감싸는 Object3D 객체를 생성합니다.
//     const object3D = new THREE.Object3D();
//     object3D.add(particleSystem);

//     // Object3D 객체를 Scene 객체에 추가합니다.
//     scene.add(object3D);

//     return particleSystem;
//   }
// }

// export default new NebulaEngine();

import * as THREE from "three";
import Nebula, { SpriteRenderer } from "three-nebula";

export type NebulaSystem = {
  emitters: any[];
  update: Function;
};

class NebulaEngine {
  update(nebulaSystem: NebulaSystem) {
    nebulaSystem.update();
  }

  async loadSystem(json: JSON, scene: THREE.Scene): Promise<NebulaSystem> {
    const loaded = await Nebula.fromJSONAsync(json, THREE, undefined);
    const nebulaRenderer = new SpriteRenderer(scene, THREE, {
      scaleFactor: 0.5,
    });

    return loaded.addRenderer(nebulaRenderer);
  }
}

export default new NebulaEngine();
