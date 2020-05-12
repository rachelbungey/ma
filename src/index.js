import AFRAME from 'aframe';
import JSX from './JSX';
import './style.css';

import './components/Spinner';
import './components/Sky';
import './components/SculptMaterial';
import './components/RockMaterial';
import './components/GalleryMaterial';
import './components/SoundController';
import './components/WebUIController';
import './components/MountainsMaterial';
import CameraRig from './CameraRig';

const App = () => (
  <a-scene
    webxr="optionalFeatures: bounded-floor, high-fixed-foveation-level"
    background="color: black"
    fog="type: linear; far=100; near=1;"
    renderer="foveationLevel: 2"
    loading-screen="backgroundColor: black"
  >
    <img
      class="btnImage"
      id="soundBtn"
      src="assets/no-sound.png"
      alt="sound"
      title="Toggle sound"
    />
    <a-entity web-ui-controller />
    <a-assets timeout="10000">
      <a-asset-item id="gallery" src="assets/gallery/gallery.gltf" />
      <a-asset-item id="sculpt1" src="assets/sculpt_01/sculpt_01.glb" />
      <a-asset-item id="sculpt2" src="assets/sculpt_02/sculpt_02.glb" />
      <a-asset-item id="sculpt3" src="assets/sculpt_03/sculpt_03.glb" />
      <a-asset-item id="sculpt4" src="assets/sculpt_04/sculpt_04.glb" />
      <a-asset-item id="duneAsset" src="assets/mountains/mountains.glb" />
      <a-asset-item id="rocksAsset" src="assets/rocks/rocks.glb" />
      <img id="woodDiffuse" src="assets/PlywoodNew0079_diff.jpg" />
      <img id="woodNormal" src="assets/PlywoodNew0079_normals.jpg" />
      <img id="groundDiffuse" src="assets/mountains/mountains_diff.jpg" />
      <img id="groundNormal" src="assets/mountains/mountains_normal.jpg" />
      <img
        id="groundRoughness"
        src="assets/mountains/mountains_roughness.jpg"
      />
      <img id="rocksDiffuse" src="assets/rocks/rock_sheet_01.jpg" />
      <img id="wall1" src="assets/posters/wall_01.jpg" />
      <img id="wall2" src="assets/posters/wall_02.jpg" />
      <img id="wall3" src="assets/posters/wall_03.jpg" />
      <img id="concrete" src="assets/concrete.jpg" />
    </a-assets>

    <a-camera position="0 0 4" />
    {CameraRig()}
    <a-light
      color="white"
      position="0.42 4.09 -3.57"
      intensity="0.6"
      light="
        castShadow: true;
        shadowCameraNear: -70;
        shadowCameraTop: 70;
        shadowCameraRight: 70;
        shadowCameraLeft: -70;
        shadowMapWidth: 4096;
        shadowMapHeight: 4096;
        intensity: 0.9;
      "
    ></a-light>
    <a-entity
      position="0 0.85 0"
      light="type: hemisphere; color: #ffffff; groundColor: #ccb2ae; intensity: 0.73"
    ></a-entity>

    {/*
     * Environment
     */}
    <a-entity sky />
    <a-gltf-model
      id="dunes"
      src="#duneAsset"
      position="0 0 0"
      scale="1 1 1"
      mountains-material
    />
    <a-gltf-model
      id="rocks"
      src="#rocksAsset"
      position="0 0 0"
      scale="1 1 1"
      rock-material
    />
    <a-gltf-model
      name="gallery"
      src="#gallery"
      position="-38.43347 0.924 71.77652"
      rotation="0 50.671241485779746 0"
      gallery-material=""
      gltf-model="assets/gallery/gallery.gltf"
    ></a-gltf-model>

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
      position="-35.25231 1.02 27.74998"
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
    <a-entity
      sound-controller
      sound="
        src: url(assets/ambient-wind.mp3);
        volume:0.2;
        loop: true;
        positional: false;
      "
    />
  </a-scene>
);

document.querySelector('body').appendChild(App());

document.querySelector('a-assets').addEventListener('loaded', function () {
  console.log('OK LOADED from main');
});
