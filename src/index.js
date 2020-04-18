import AFRAME from 'aframe';
import JSX from './JSX';
import './components/Spinner';
import './components/Sky';
import './components/GlowMaterial';
import './components/ReflectiveMat';
import './components/SetGLTFMaterial';
import './components/SculptMaterial';
import './components/RockMaterial';
import CameraRig from './CameraRig';

const App = () => (
  <a-scene background="color: black" fog="type: linear; far=100; near=1;">
    <a-assets>
      <a-asset-item id="sculpt1" src="assets/sculpt_01/sculpt_01.gltf" />
      <a-asset-item id="sculpt2" src="assets/sculpt_02/sculpt_02.gltf" />
      <a-asset-item id="sculpt3" src="assets/sculpt_03/sculpt_03.gltf" />
      <a-asset-item id="sculpt4" src="assets/sculpt_04/sculpt_04.gltf" />
      <a-asset-item id="dunes" src="assets/mountains/mountains.gltf" />
      <a-asset-item id="rocks" src="assets/rocks/rocks.gltf" />
      <img id="envMap" src="assets/lightMap.png"></img>
    </a-assets>

    <a-camera position="0 0 4" />
    {CameraRig()}
    <a-light
      color="white"
      position="0.42 4.09 -3.57"
      intensity="1.1"
      light="castShadow: true; shadowCameraNear: -50; shadowCameraTop: 50; shadowCameraRight: 50; shadowCameraLeft: -50; shadowMapWidth: 2048; shadowMapHeight: 2048; color: #f9fffb"
    />
    <a-entity
      position="0 1 0"
      light="type: hemisphere; color: #7d7bcc; groundColor: #bca5cc; intensity: 1.4"
    />

    {/*
     * Environment
     */}
    <a-entity sky />
    <a-gltf-model
      id="dunes"
      src="#dunes"
      position="0 -1.95 0"
      scale="1 1 1"
      set-gltf-material="color: #ffffff; receiveShadow: true;"
    />
    <a-gltf-model
      id="rocks"
      src="#rocks"
      position="0 -0.84 0"
      scale="1 1 1"
      rock-material
    />

    {/*
     * Sculptures
     */}
    <a-gltf-model
      name="sculpt1"
      src="#sculpt1"
      position="0 0 0"
      sculpt-material
    />
    <a-gltf-model
      name="sculpt2"
      src="#sculpt2"
      position="10 0 0"
      sculpt-material
    />
    <a-gltf-model
      name="sculpt3"
      src="#sculpt3"
      position="20 0 0"
      sculpt-material
    />
    <a-gltf-model
      name="sculpt4"
      src="#sculpt4"
      position="30 0 0"
      sculpt-material
    />
  </a-scene>
);

document.querySelector('body').appendChild(App());
