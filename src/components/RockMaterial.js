import AFRAME from 'aframe';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('rock-material', {
  init: function () {
    const diff = new THREE.TextureLoader().load(
      '/assets/rocks/rock_sheet_01.png',
    );

    const mat = new THREE.MeshPhysicalMaterial({
      map: diff,
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
