import AFRAME from 'aframe';
import CustomPhysicalMaterial from './CustomPhysicalMaterial';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('gallery-material', {
  init: function () {
    const textures = {
      wall1: {
        img: document.querySelector('#wall1'),
        tile: [1, 1],
      },
      wall2: {
        img: document.querySelector('#wall2'),
        tile: [1, 1],
      },
      wall3: {
        img: document.querySelector('#wall2'),
        tile: [1, 1],
      },
      concrete: {
        img: document.querySelector('#concrete'),
        tile: [4, 4],
      },
    };

    this.el.addEventListener('model-loaded', () => {
      const scene = this.el.getObject3D('mesh');
      const root = scene.children[0];

      root.children.forEach((mesh) => {
        const options = textures[mesh.name];

        const tex = new THREE.Texture(options.img);

        // Set texture tile property if necessary
        tex.repeat.set(...options.tile);
        if (options.tile[0] > 1) {
          tex.wrapT = tex.wrapS = THREE.RepeatWrapping;
        }

        tex.needsUpdate = true;

        const mat = new CustomPhysicalMaterial({
          map: tex,
          roughness: 0.7,
          color: new THREE.Color("#eae5d9")
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = mat;
      });
    });
  },

  tick: function (time) {},
});
