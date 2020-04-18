import AFRAME from 'aframe';
const THREE = AFRAME.THREE;
import CustomPhysicalMaterial from './CustomPhysicalMaterial';

AFRAME.registerComponent('sculpt-material', {
  init: function () {
    const handleTextureLoad = (tex) => {
      tex.repeat.set(7, 7);
      tex.wrapT = tex.wrapS = THREE.RepeatWrapping;
    };

    const woodDiffuse = new THREE.TextureLoader().load(
      '/assets/PlywoodNew0079_diff.jpg',
      handleTextureLoad,
    );

    const woodRoughness = new THREE.TextureLoader().load(
      '/assets/PlywoodNew0079_roughness.jpg',
      handleTextureLoad,
    );

    const woodNormals = new THREE.TextureLoader().load(
      '/assets/PlywoodNew0079_normals.jpg',
      handleTextureLoad,
    );

    const mEnvMap = new THREE.TextureLoader().load('/assets/lightMap.png');

    const woodMaterial = new CustomPhysicalMaterial({
      map: woodDiffuse,
      roughness: 0.8,
      normalMap: woodNormals,
      normalScale: THREE.Vector2(0.05, 0.05),
      roughnessMap: woodRoughness,
    });

    mEnvMap.mapping = THREE.EquirectangularReflectionMapping;
    const chromeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      envMap: mEnvMap,
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

  tick: function (time) {},
});
