import AFRAME from 'aframe';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('set-gltf-material', {
  schema: {
    color: {
      type: 'color',
      default: null
    },
    castShadow: {
      type: 'boolean',
      default: false
    },
    receiveShadow: {
      type: 'boolean',
      default: false
    },
  },

  applyMaterialToMesh: function (mesh) {
    const woodTex = new THREE.TextureLoader().load('/assets/omDgO_4K_Albedo.jpg');
    this.material = new THREE.MeshPhysicalMaterial({
        map : woodTex, 
        roughness : 1,
    });
    const { color } = this.data;

    mesh.castShadow = this.data.castShadow;
    mesh.receiveShadow = this.data.receiveShadow;
    mesh.geometry.computeVertexNormals()
    mesh.material = this.material;

    if (color) {
      mesh.material.color = new THREE.Color(color);
    }
  },

  applyMaterial: function (mesh) {
    if (mesh.geometry){
      this.applyMaterialToMesh(mesh);
    }
    mesh.children.forEach(child => {
      this.applyMaterial(child);
    });
  },

  init: function () {
    this.el.addEventListener('model-loaded', () => {
      const scene = this.el.getObject3D('mesh');
      this.applyMaterial(scene);
    });
  },

  tick: function (time) {
  }
});
