import AFRAME from 'aframe';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('set-gltf-material', {
  schema: {
    color: {
      type: 'color',
      default: null,
    },
    castShadow: {
      type: 'boolean',
      default: false,
    },
    receiveShadow: {
      type: 'boolean',
      default: false,
    },
    computeNormals: {
      type: 'boolean',
      default: false,
    },
  },

  applyMaterialToMesh: function (mesh) {
    const handleTextureLoad = (tex) => {
      tex.repeat.set(240, 240);
      tex.wrapT = tex.wrapS = THREE.RepeatWrapping;
    };

    const diffuseTexture = new THREE.TextureLoader().load(
      '/assets/mountains/mountains_diff.jpg',
      handleTextureLoad
    );

    const normalTexture = new THREE.TextureLoader().load(
      '/assets/mountains/mountains_normal.jpg',
      handleTextureLoad,
    );

    const roughnessTexture = new THREE.TextureLoader().load(
      '/assets/mountains/mountains_roughness.jpg',
      handleTextureLoad,
    );

    this.material = new THREE.MeshPhysicalMaterial({
      map: diffuseTexture,
      roughness: 0.86,
      roughnessMap: roughnessTexture,
      displacementScale: 10,
      normalMap: normalTexture,
      normalScale: THREE.Vector2(0.02, 0.02),
    });
    const { color, receiveShadow, computeNormals, castShadow } = this.data;

    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    if (computeNormals) {
      mesh.geometry.computeVertexNormals();
    }
    mesh.material = this.material;

    if (color) {
      mesh.material.color = new THREE.Color(color);
    }
  },

  // Recursively go trough every mesh in the object and assign materials
  applyMaterial: function (mesh) {
    if (mesh.geometry) {
      this.applyMaterialToMesh(mesh);
    }
    mesh.children.forEach((child) => {
      this.applyMaterial(child);
    });
  },

  init: function () {
    this.el.addEventListener('model-loaded', () => {
      const scene = this.el.getObject3D('mesh');
      this.applyMaterial(scene);
    });
  },

  tick: function (time) {},
});
