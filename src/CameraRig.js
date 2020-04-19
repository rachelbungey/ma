import AFRAME from 'aframe';
import JSX from './JSX';
import './components/CustomControl';
import './components/Mover';
import './components/QuickTurner';

const CameraRig = () => (
  <a-entity id="cameraRig" position="0 1 4">
    <a-camera id="camera" wasd-controls="acceleration:200" />
    <a-entity oculus-go-controls />
    <a-entity custom-control="hand: left" quick-turn visible="false" />
    <a-entity custom-control="hand: right" mover visible="false" />
  </a-entity>
);

export default CameraRig;
