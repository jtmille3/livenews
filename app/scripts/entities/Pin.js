define([
  './Entity'
], function(Entity) {
  'use strict';
  
  return Entity.extend({
    init: function(options) {
      this._super(options);

      this.pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.005, 8, 8),
        new THREE.MeshBasicMaterial({
          color: 0xFF0000
        })
      );

      // calculate drop coordinates based on passed long and lat...
      this.pin.position.z += 0.505;

      this.add(this.pin);
    }
  });
});