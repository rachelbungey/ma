import AFRAME from 'aframe';
import JSX from './JSX';
import './components/Spinner';
import './components/GlowMaterial';
import CameraRig from './CameraRig';

const App = () => (
  <a-scene background="color: black">
    <a-assets>
      <a-asset-item id="sculpt1" src="assets/sculpt_01/sculpt_01.gltf" />
      <a-asset-item id="sculpt2" src="assets/sculpt_02/sculpt_02.gltf" />
      <a-asset-item id="sculpt3" src="assets/sculpt_03/sculpt_03.gltf" />
      <a-asset-item id="sculpt4" src="assets/sculpt_04/sculpt_04.gltf" />
    </a-assets>

    <a-gltf-model name="sculpt1" src="#sculpt1" position="0 0 0" />
    <a-gltf-model name="sculpt2" src="#sculpt2" position="10 0 0" />
    <a-gltf-model name="sculpt3" src="#sculpt3" position="20 0 0" />
    <a-gltf-model name="sculpt4" src="#sculpt4" position="30 0 0" />

    <a-camera position="0 0 4" />
    {CameraRig()}
    <a-box spinner glow-material />
  </a-scene>
);

document.querySelector('body').appendChild(App());
