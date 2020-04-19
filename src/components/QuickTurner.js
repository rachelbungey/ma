import AFRAME from 'aframe';
const THREE = AFRAME.THREE;
// quest only
AFRAME.registerComponent('quick-turn', {
  schema: {},

  init: function () {
    this.allowedToQuickturn = false;
    this.quickTurnTarget = 0;
    this.lastAxis = new THREE.Vector2();
    this.vrMovingSpeed = 0.0039;

    const rig = document.querySelector('#cameraRig');
    this.rig = rig.object3D;

    const camera = document.querySelector('#camera');
    this.camera = camera.object3D;

    /*
      Oculus touch controller events
    */
    this.el.addEventListener('thumbsticktouchstart', (evt) => {
      this.allowedToQuickturn = true;
    })
    this.el.addEventListener('axismove', (evt) => {
      this.lastAxis.x = evt.detail.axis[0];
      this.lastAxis.y = evt.detail.axis[1];
      if(Math.abs(this.lastAxis.x) < 0.2)
      {
        this.allowedToQuickturn = true;
      }
      if(!this.allowedToQuickturn) return;
      if(this.lastAxis.x > 0.7){
        this.quickTurnTarget -= 45;
        this.allowedToQuickturn = false;
      } else if(this.lastAxis.x < -0.7)
      {
        this.quickTurnTarget += 45;
        this.allowedToQuickturn = false;
      }
    });
  },

  tick: function (time, timeDelta) {
    this.rig.rotation.y = this.quickTurnTarget;
  }
});
