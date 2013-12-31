define([
], function() {
	return Class.extend({
		init: function() {
			this.remove = false;
			this.sceneObjects = [];
		},

		load: function(renderer, scene, camera) {

		},

		unload: function(renderer) {

		},

		update: function() {
		},

		destroy: function() {
			this.remove = true;
		},

		getBoundary: function(width, height, px, py, pz, rx, ry, rz) {
		    var geometry = new THREE.PlaneGeometry(width, height);
		    geometry.computeFaceNormals();
			geometry.computeVertexNormals();
		    var material = new Physijs.createMaterial(
		      new THREE.MeshNormalMaterial({
		        transparent: true,
		        opacity: 0.0,
		        color: 0x505050,
		        wireframe: false,
		        side: THREE.DoubleSide
		      }), 
		      1.0, // friction
		      1.0  // restitution
		    );

		    var object = new Physijs.BoxMesh(geometry, material, 0);
		    object.castShadow = false;
		    object.receiveShadow = true;
		    object.position.x += px;
		    object.position.y += py;
		    object.position.z += pz;
		    object.rotation.x += rx * Math.PI / 180;
		    object.rotation.y += ry * Math.PI / 180;
		    object.rotation.z += rz * Math.PI / 180;

		    return object;
		},
	});
});