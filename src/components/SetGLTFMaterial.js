import AFRAME from 'aframe';
const THREE = AFRAME.THREE;
import CustomPhysicalMaterial from './CustomPhysicalMaterial';

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
    const textures = {};

    ['#groundDiffuse', '#groundNormal'].forEach((map) => {
      if (map) {
        let img = document.querySelector(map);

        const tex = new THREE.Texture(img);
        tex.needsUpdate = true;

        tex.repeat.set(240, 240);
        tex.wrapT = tex.wrapS = THREE.RepeatWrapping;

        textures[map] = tex;
      }
    });

    const { color, receiveShadow, computeNormals, castShadow } = this.data;
    this.material = new CustomPhysicalMaterial({
      map: textures['#groundDiffuse'],
      roughness: 0.93,
      normalMap: textures['#groundNormal'],
      vertexColors: true,
    });

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
