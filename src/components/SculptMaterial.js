import AFRAME from 'aframe';
const THREE = AFRAME.THREE;
import CustomPhysicalMaterial from './CustomPhysicalMaterial';

AFRAME.registerComponent('sculpt-material', {
  schema: {
    diffuseMap: { default: '' },
    normalMap: { default: '' },
  },

  init: function () {
    const { diffuseMap, normalMap } = this.data;

    const textures = {};

    [diffuseMap, normalMap].forEach((map) => {
      if (map) {
        let img = document.querySelector(map);

        const tex = new THREE.Texture(img);
        tex.needsUpdate = true;

        tex.repeat.set(7, 7);
        tex.wrapT = tex.wrapS = THREE.RepeatWrapping;

        textures[map] = tex;
      }
    });

    this.skipFrame = true;

    const woodMaterial = new CustomPhysicalMaterial({
      map: textures[diffuseMap],
      roughness: 0.8,
      normalMap: textures[normalMap],
      normalScale: THREE.Vector2(0.1, 0.1),
    });

    this.renderer;

    this.scene = document.querySelector('a-scene');
    this.renderer = document.querySelector('a-scene').renderer;

    this.cubeCamera = new THREE.CubeCamera(1, 100000, 128);
    this.cubeCamera.position.set(0, 10, 0);
    this.el.object3D.add(this.cubeCamera);

    this.el.sceneEl.addEventListener('model-loaded', () => {
      this.needEnvUpdate = true;
    });

    const chromeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      envMap: this.cubeCamera.renderTarget.texture,
    });

    this.el.addEventListener('model-loaded', () => {
      const scene = this.el.getObject3D('mesh');
      scene.children[0].children.forEach((mesh) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        switch (mesh.name) {
          case 'body':
            mesh.material = woodMaterial;
            break;
          case 'sphere':
            mesh.material = chromeMaterial;
            break;
          default:
            break;
        }
      });
    });
  },

  tick: function (time) {
    if (this.needEnvUpdate) {
      this.cubeCamera.update(this.renderer, this.scene.object3D);
      this.needEnvUpdate = false;
    }
  },
});
