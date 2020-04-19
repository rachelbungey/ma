import AFRAME from 'aframe';
const THREE = AFRAME.THREE;

AFRAME.registerComponent('mover', {
  schema: {},

  init: function () {
    this.pressed = false;
    this.pressedQuest = false;
    this.lastAxis = new THREE.Vector2();
    this.vrMovingSpeed = 0.0039;

    const rig = document.querySelector('#cameraRig');
    this.rig = rig.object3D;

    const camera = document.querySelector('#camera');
    this.camera = camera.object3D;

    // ground raycasting
    this.raycaster = new THREE.Raycaster();
    var terrainAsset = document.querySelector('#dunes');
    terrainAsset.addEventListener('model-loaded', () => {
        this.terrain = terrainAsset.object3D.children[0].children[0];
    });
    this.down = new THREE.Vector3(0,-1,0);
    this.origin = new THREE.Vector3();

    /*
      Oculus remote controller events
    */
    this.el.addEventListener('trackpaddown', () => {
      this.pressed = true;
    });
    this.el.addEventListener('trackpadup', () => {
      this.pressed = false;
    });

    this.el.addEventListener('axismove', (evt) => {
      this.lastAxis.x = evt.detail.axis[0];
      this.lastAxis.y = evt.detail.axis[1];
    });

    /*
      Oculus touch controller events
    */
    this.el.addEventListener('thumbsticktouchstart', (evt) => {
      this.pressedQuest = true;
    })
    this.el.addEventListener('thumbsticktouchend', (evt) => {
      this.pressedQuest = false;
    })

  },

  tick: function (time, timeDelta) {
    if(this.pressed){
      const tweenForward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.camera.quaternion);
      this.handleMove(tweenForward, timeDelta);
    } else if (this.pressedQuest){
      const tweenForward = new THREE.Vector3(-this.lastAxis.x, 0, -this.lastAxis.y).applyQuaternion(this.camera.getWorldQuaternion());
      this.handleMove(tweenForward, timeDelta);
    }
  },

  handleMove: function (move, timeDelta) {
    this.rig.position.sub(move.multiplyScalar(this.vrMovingSpeed * timeDelta))
    if(this.terrain)
    {
        this.rig.position.y = this.calculateGroundHeight(this.rig.position);
    }
  },

  calculateGroundHeight: function(pos) {
    this.origin.set(pos.x, 10, pos.z);
    this.raycaster.set(this.origin, this.down);
    var intersects = this.raycaster.intersectObject(this.terrain);
    if(intersects[0])
    {
        console.log(intersects[0].point.y + 1)

        return intersects[0].point.y + 1;
    }
    return pos.y;
  }
});
