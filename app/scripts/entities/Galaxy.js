define([
  './Entity'
], function(Entity) {
  'use strict';
  
  return Entity.extend({
    init: function(options) {
      this._super(options);

      this.galaxy = new THREE.Mesh(
        new THREE.SphereGeometry(90, 64, 64),
        new THREE.MeshBasicMaterial({
          map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
          side: THREE.BackSide
        })
      );

      this.add(this.galaxy);
    }
  });
});