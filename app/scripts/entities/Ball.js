define([
	'./Entity'
], function(Entity) {
	return Entity.extend({
		init: function(options) {
			this.options = options;
		},

		load: function(renderer, scene) {
			var geometry = new THREE.SphereGeometry(this.options.radius,30,30);

		    var texture = THREE.ImageUtils.loadTexture('images/ball.jpg');
		    texture.anisotropy = renderer.getMaxAnisotropy();

		    var material = Physijs.createMaterial(new THREE.MeshPhongMaterial({
		          map: texture
		       }),
		       1.0,  // friction
		       1.0   // restitution
		    );

		    var object = new Physijs.SphereMesh(geometry, material, 1);

		    /* Debug purposes only */
		    var coneGeometry = new THREE.CylinderGeometry( 0, 0.04, 0.05, 8, 1 );
			var cone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color: 0x505050 } ) );
			cone.position.x += 0.1;
			cone.rotation.y += 180 * Math.PI / 180;
			cone.rotation.z += 90 * Math.PI / 180;
			cone.matrixAutoUpdate = true;
			object.add( cone );
			/* End debugging */

		    object.position.z += this.options.radius; // offset by radius so it sits on top
		    object.castShadow = true;
		    object.receiveShadow = false;

		    this.mesh = object;
			this.mesh.entity = this;
		    scene.add(this.mesh);

		    object.setDamping(0.7, 0.7); // must set after adding to the scene

		    /*
		    	http://www.bulletphysics.org/mediawiki-1.5.8/index.php/Anti_tunneling_by_Motion_Clamping
				When an object has a high velocity, collisions can be missed if it moves through and past other objects between simulation steps. 
				To fix this, enable CCD motion clamping. For a cube of size 1 try:
		    */
			// Enable CCD if the object moves more than 1 meter in one simulation frame
			this.mesh.setCcdMotionThreshold(0.1);

			// Set the radius of the embedded sphere such that it is smaller than the object
			this.mesh.setCcdSweptSphereRadius(0.02);
		},

		unload: function(renderer, scene) {
			scene.remove(this.mesh);
		},

		update: function(input) {
			if(input['click'] && !this.kicked) {
				this.kick();
				this.kicked = true;
				console.log('Kick Me!');
			} else if (!input['click']) {
				this.kicked = false;
			}
		},

		kick: function() {
			this.mesh.applyCentralImpulse(new THREE.Vector3(-7, 0, 0).applyProjection(this.mesh.matrix)); // goal test
    		//this.mesh.applyCentralImpulse(new THREE.Vector3(15, 15, 0).applyProjection(this.mesh.matrix)); // test ob
		}
	});
});