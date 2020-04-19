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
  <a-scene background="color: black" fog="type: linear; far=100; near=1;" renderer="foveationLevel: 2;">
    <a-assets>
      <a-asset-item id="sculpt1" src="assets/sculpt_01/sculpt_01.gltf" />
      <a-asset-item id="sculpt2" src="assets/sculpt_02/sculpt_02.gltf" />
      <a-asset-item id="sculpt3" src="assets/sculpt_03/sculpt_03.gltf" />
      <a-asset-item id="sculpt4" src="assets/sculpt_04/sculpt_04.gltf" />
      <a-asset-item id="duneAsset" src="assets/mountains/mountains.gltf" />
      <a-asset-item id="rocksAsset" src="assets/rocks/rocks.gltf" />
      <img id="woodDiffuse" src="assets/PlywoodNew0079_diff.jpg" />
      <img id="woodNormal" src="assets/PlywoodNew0079_normals.jpg" />
      <img id="groundDiffuse" src="assets/mountains/mountains_diff.jpg" />
      <img id="groundNormal" src="assets/mountains/mountains_normal.jpg" />
      <img
        id="groundRoughness"
        src="assets/mountains/mountains_roughness.jpg"
      />
      <img id="rocksDiffuse" src="assets/rocks/rock_sheet_01.png" />
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
      src="#duneAsset"
      position="0 0 0"
      scale="1 1 1"
      set-gltf-material="color: #ffffff; receiveShadow: true;"
    />
    <a-gltf-model
      id="rocks"
      src="#rocksAsset"
      position="0 0 0"
      scale="1 1 1"
      rock-material
    />

    {/*
     * Sculptures
     */}
    <a-gltf-model
      name="sculpt1"
      src="#sculpt1"
      position="0 0.434 -5"
      sculpt-material="
        diffuseMap: #woodDiffuse;
        normalMap: #woodNormal;
      "
    />
    <a-gltf-model
      name="sculpt2"
      src="#sculpt2"
      position="36.60016 1.662 29"
      sculpt-material="
        diffuseMap: #woodDiffuse;
        normalMap: #woodNormal;
      "
    />
    <a-gltf-model
      name="sculpt3"
      src="#sculpt3"
      position="-35.43073 1.266 21"
      sculpt-material="
        diffuseMap: #woodDiffuse;
        normalMap: #woodNormal;
      "
    />
    <a-gltf-model
      name="sculpt4"
      src="#sculpt4"
      position="0.2774 1.31389 59.92782"
      sculpt-material="
        diffuseMap: #woodDiffuse;
        normalMap: #woodNormal;
      "
    />
  </a-scene>
);

document.querySelector('body').appendChild(App());
