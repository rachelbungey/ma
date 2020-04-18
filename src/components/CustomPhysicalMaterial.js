const THREE = AFRAME.THREE;
import physicalFrag from '../shaders/PhysicalFrag.glsl';
import physicalVert from '../shaders/PhysicalVert.glsl';
import lightReplace from '../shaders/lights_fragment_begin.glsl';

export default class CustomPhysicalMaterial extends THREE.MeshPhysicalMaterial {
  constructor(uniforms){
    super(uniforms);
    this.onBeforeCompile = (shader) => {
      shader.vertexShader = physicalVert;
      shader.fragmentShader = physicalFrag;
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <lights_fragment_begin>`,
        lightReplace
      );
      shader.uniforms.shadowColor = { value: new THREE.Color("#4b4e5d") };
      this.shader = shader;
    }
  }
}
