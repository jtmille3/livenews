define([
  './Entity'
], function(Entity) {
  'use strict';
  
  return Entity.extend({
    init: function(options) {
      this.options = options;
    },

    load: function(renderer, scene) {
      var radius = 90;
      var segments = 64;
      this.galaxy = new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshBasicMaterial({
          map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
          side: THREE.BackSide
        })
      );

      scene.add(this.galaxy);
      this.mesh = this.galaxy;
    },

    unload: function(renderer, scene) {
      scene.remove(this.galaxy);
    }
  });
});