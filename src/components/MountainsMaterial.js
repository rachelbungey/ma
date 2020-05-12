import AFRAME from 'aframe';
import CustomPhysicalMaterial from './CustomPhysicalMaterial';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('mountains-material', {
  init: function () {
    const textures = {};

    ['#groundDiffuse', '#groundNormal'].forEach((map) => {
      let img = document.querySelector(map);

      const tex = new THREE.Texture(img);
      tex.needsUpdate = true;

      tex.repeat.set(240, 240);
      tex.wrapT = tex.wrapS = THREE.RepeatWrapping;

      textures[map] = tex;
    });

    const mat = new CustomPhysicalMaterial({
      map: textures['#groundDiffuse'],
      roughness: 0.93,
      normalMap: textures['#groundNormal'],
      vertexColors: true,
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
