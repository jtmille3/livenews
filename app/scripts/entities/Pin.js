define([
  './Entity'
], function(Entity) {
  'use strict';
  
  return Entity.extend({
    init: function(options) {
      this._super(options);

      this.pin = new THREE.Object3D();

      var radius = 0.005;
      var ball = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 8, 8),
        new THREE.MeshBasicMaterial({
          color: 0xFF0000
        })
      );

      // calculate drop coordinates based on passed long and lat...
      ball.position.z += 0.505;

      this.pin.add(ball);

      // this.pin.rotation.x = this.options.latitude * Math.PI / -180; // 35 degrees
      // this.pin.rotation.y = this.options.longitude * Math.PI / 180; // -74 degrees

      var quaternion= new THREE.Quaternion();
      quaternion.setFromAxisAngle(new THREE.Vector3(1,0,0).normalize(), this.options.latitude * Math.PI / -180);
      this.pin.quaternion.multiplyQuaternions(quaternion, this.pin.quaternion);

      quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), this.options.longitude * Math.PI / 180);
      this.pin.quaternion.multiplyQuaternions(quaternion, this.pin.quaternion);

      this.add(this.pin);
    }
  });
});