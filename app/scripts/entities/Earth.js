define([
	'./Entity'
], function(Entity) {
	'use strict';
	
	return Entity.extend({
		init: function(options) {
			this.options = options;
		},

		load: function(renderer, scene) {
			this.earth = new THREE.Mesh(
			  new THREE.SphereGeometry(0.5, 32, 32),
			  new THREE.MeshPhongMaterial({
			    map: THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
			    // map: THREE.ImageUtils.loadTexture('images/5_night_4k.jpg'),
			    bumpMap: THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
			    bumpScale:   0.005,
			    specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
			    specular: new THREE.Color('grey')
			  })
			);

			scene.add(this.earth);
			this.mesh = this.earth;
		},

		unload: function(renderer, scene) {
			scene.remove(this.earth);
		}
	});
});