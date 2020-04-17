import AFRAME from 'aframe';
import JSX from './JSX';
import './components/Spinner';
import './components/Sky';
import './components/GlowMaterial';
import './components/ReflectiveMat';
import './components/SetGLTFMaterial';
import CameraRig from './CameraRig';

const App = () => (
  <a-scene background="color: black">
    <a-assets>
      <a-asset-item id="sculpt1" src="assets/sculpt_01/sculpt_01.gltf" />
      <a-asset-item id="sculpt2" src="assets/sculpt_02/sculpt_02.gltf" />
      <a-asset-item id="sculpt3" src="assets/sculpt_03/sculpt_03.gltf" />
      <a-asset-item id="sculpt4" src="assets/sculpt_04/sculpt_04.gltf" />
      <a-asset-item id="dunes" src="assets/mountains/mountains.gltf" />
      <img id="envMap" src="assets/lightMap.png"></img>
    </a-assets>
  
    <a-camera position="0 0 4" />
    {CameraRig()}

    <a-light color="white" position="0.42 4.09 -3.57" intensity="1" light="castShadow: true; shadowCameraNear: -50; shadowCameraTop: 50; shadowCameraRight: 50; shadowCameraLeft: -50; shadowMapWidth: 1024; shadowMapHeight: 1024"></a-light>    
    <a-light type="ambient" color="#8487fb"></a-light>

    <a-entity sky />
    <a-entity geometry="primitive: sphere" reflective-material="" position="10.134 7.24892 -0.18894" scale="1.2 1.2 1.2"></a-entity>
    <a-entity geometry="primitive: sphere" reflective-material="" position="28.08098 6.00823 0.77162" scale="1.98642 1.98642 1.98642"></a-entity>  </a-scene>
    <a-gltf-model name="sculpt1" src="#sculpt1" position="0 0 0" set-gltf-material="castShadow: true"/>
    <a-gltf-model name="sculpt2" src="#sculpt2" position="10 0 0" set-gltf-material="castShadow: true"/>
    <a-gltf-model name="sculpt3" src="#sculpt3" position="20 0 0" set-gltf-material="castShadow: true"/>
    <a-gltf-model name="sculpt4" src="#sculpt4" position="30 0 0" set-gltf-material="castShadow: true"/>
    <a-gltf-model id="dunes" src="#dunes" scale="1 1 1" set-gltf-material="color: #ffffff; receiveShadow: true;" />
);

document.querySelector('body').appendChild(App());
