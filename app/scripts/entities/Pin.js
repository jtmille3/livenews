define([
  './Entity'
], function(Entity) {
  'use strict';
  
  return Entity.extend({
    init: function(options) {
      this._super(options);

      this.pin = new THREE.Object3D();

      var ball = new THREE.Mesh(
        new THREE.SphereGeometry(0.005, 8, 8),
        new THREE.MeshBasicMaterial({
          color: 0xFF0000
        })
      );

      // calculate drop coordinates based on passed long and lat...
      ball.position.z += 0.505;

      this.pin.add(ball);

      this.pin.rotation.x = this.options.latitude * Math.PI / -180;
      this.pin.rotation.y = this.options.longitude * Math.PI / 180;

      this.add(this.pin);
    }
  });
});