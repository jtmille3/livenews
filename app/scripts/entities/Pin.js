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

      ball.position.z += 0.505; // plant the ball 0.5 up from earth and 0.005 up to reveal the entire pin

      this.pin.add(ball);

      // rotate from the base of the world
      var quaternion= new THREE.Quaternion();

      // translate along the latitude or x-axis (make negative to reverse spin)
      quaternion.setFromAxisAngle(new THREE.Vector3(1,0,0).normalize(), this.options.latitude * Math.PI / -180);
      this.pin.quaternion.multiplyQuaternions(quaternion, this.pin.quaternion);

      // translate along the longitude or y-axis
      quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0).normalize(), this.options.longitude * Math.PI / 180);
      this.pin.quaternion.multiplyQuaternions(quaternion, this.pin.quaternion);

      // this.add(this.pin);
    }
  });
});