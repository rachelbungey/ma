import AFRAME from 'aframe';
import JSX from './JSX';
import './components/CustomControl';
import './components/Mover';
import './components/QuickTurner';

const CameraRig = () => (
  <a-entity id="cameraRig" position="0 1 4">
    <a-camera id="camera" wasd-controls="acceleration:35" />
    <a-entity oculus-go-controls />
    <a-entity oculus-touch-controls="hand: left; orientationOffset: 0 0 0;" quick-turn />
    <a-entity oculus-touch-controls="hand: right; orientationOffset: 0 0 0;" mover />
  </a-entity>
);

export default CameraRig;
