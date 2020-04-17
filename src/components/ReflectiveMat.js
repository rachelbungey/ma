import AFRAME from 'aframe';

AFRAME.registerComponent('reflective-material', {
  init: function () {
    const mEnvMap = new THREE.TextureLoader().load('/assets/lightMap.png');
    mEnvMap.mapping = THREE.EquirectangularReflectionMapping;
    this.reflectiveMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      envMap: mEnvMap
    });
    const mesh = this.el.object3D.children[0];
    mesh.material = this.reflectiveMat;
  },
});
