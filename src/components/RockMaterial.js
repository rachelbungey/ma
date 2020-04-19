import AFRAME from 'aframe';
import CustomPhysicalMaterial from './CustomPhysicalMaterial';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('rock-material', {
  init: function () {
    let img = document.querySelector('#rocksDiffuse');

    const tex = new THREE.Texture(img);
    tex.needsUpdate = true;

    const mat = new CustomPhysicalMaterial({
      map: tex,
      roughness: 0.8,
    });

    this.el.addEventListener('model-loaded', () => {
      const scene = this.el.getObject3D('mesh');
      scene.children.forEach((c) => {
        c.castShadow = true;
        c.receiveShadow = true;
        c.material = mat;
      });
    });
  },

  tick: function (time) {},
});
