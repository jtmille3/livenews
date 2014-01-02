define([
	'./Entity',
	'text!../../shaders/atmosphere.vertex.glsl',
	'text!../../shaders/atmosphere.fragment.glsl',
], function(Entity, AtmosphereVertex, AtmosphereFragment) {
	'use strict';
	
	return Entity.extend({
		init: function(options) {
			this._super(options);

			this.object = new THREE.Object3D();

			var earthGeometry = new THREE.SphereGeometry(0.5, 64, 64);

			this.earth = new THREE.Mesh(
			  earthGeometry.clone(),
			  new THREE.MeshPhongMaterial({
			    map: THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
			    alphaMap: THREE.ImageUtils.loadTexture('images/boundaries_4k.png'),
			    transparent: true,
			    bumpMap: THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
			    bumpScale: 0.005,
			    specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
			    specular: new THREE.Color('grey')
			  })
			);
			this.earth.rotation.y = 270 * Math.PI / 180; // puts us at point 0 along the prime meridian and equator
			this.object.add(this.earth);
			this.mesh = this.earth;

			var boundariesMaterial = new THREE.MeshBasicMaterial({ 
				map: THREE.ImageUtils.loadTexture('images/boundaries_4k.png'),
				transparent: true,
				blending: THREE.AdditiveBlending,
				blendSrc: THREE.OneFactor,
				blendDst: THREE.OneFactor,
				blendEquation: THREE.AddEquation
			});
			this.boundaries = new THREE.Mesh(earthGeometry.clone(), boundariesMaterial.clone());
			this.boundaries.position = this.earth.position;
			this.boundaries.scale.multiplyScalar(1.0001);
			this.boundaries.rotation.y = 270 * Math.PI / 180; // puts us at point 0 along the prime meridian and equator
			this.object.add( this.boundaries );

			this.add(this.object);

			var atmosphereMaterial = new THREE.ShaderMaterial({
	    	uniforms: { 
					c: { 
						type: "f", value: 1.5
					},
					p: { 
						type: "f", value: 6.0
					},
					glowColor: { 
						type: "c", 
						value: new THREE.Color(0x6789af) 
					},
					viewVector: { 
						type: "v3", 
						value: new THREE.Vector3(1, 0, 1)
					}
				},
				vertexShader: AtmosphereVertex,
				fragmentShader: AtmosphereFragment,
				side: THREE.FrontSide,
				blending: THREE.AdditiveBlending,
				transparent: true
			});

			// needs to move independently of earth
			this.earthAtmosphere = new THREE.Mesh(earthGeometry.clone(), atmosphereMaterial.clone());
			this.earthAtmosphere.position = this.earth.position;
			this.earthAtmosphere.scale.multiplyScalar(1.005);
			this.add( this.earthAtmosphere );
		},

		addPin: function(latitude, longitude) {
			var pin = new THREE.Object3D();

      var radius = 0.005;
      var ball = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 8, 8),
        new THREE.MeshPhongMaterial({
          color: 0xAA0000
        })
      );

      ball.position.z += 0.505; // plant the ball 0.5 up from earth and 0.005 up to reveal the entire pin

      pin.add(ball);

      // rotate from the base of the world
      var quaternion= new THREE.Quaternion();

      // translate along the latitude or x-axis (make negative to reverse spin)
      quaternion.setFromAxisAngle(new THREE.Vector3(1,0,0), latitude * Math.PI / -180);
      pin.quaternion.multiplyQuaternions(quaternion, pin.quaternion);

      // translate along the longitude or y-axis
      quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0), longitude * Math.PI / 180);
      pin.quaternion.multiplyQuaternions(quaternion, pin.quaternion);

      this.object.add(pin);
		},

		update: function() {
			// make sure the atmosphere glow is always behind the sphere
			this.earthAtmosphere.material.uniforms.viewVector.value = new THREE.Vector3().subVectors( this.options.camera.position, this.earth.position );
		}
	});
});