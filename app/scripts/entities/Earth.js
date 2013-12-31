define([
	'./Entity',
	'text!../../shaders/atmosphere.vertex.glsl',
	'text!../../shaders/atmosphere.fragment.glsl',
], function(Entity, AtmosphereVertex, AtmosphereFragment) {
	'use strict';
	
	return Entity.extend({
		init: function(options) {
			this.options = options;
		},

		load: function(renderer, scene, camera) {
			var earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);

			this.earth = new THREE.Mesh(
			  earthGeometry.clone(),
			  new THREE.MeshPhongMaterial({
			    map: THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
			    bumpMap: THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
			    bumpScale:   0.005,
			    specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
			    specular: new THREE.Color('grey')
			  })
			);

			scene.add(this.earth);
			this.mesh = this.earth;

			var customMaterial = new THREE.ShaderMaterial({
	    	uniforms: { 
					c: { 
						type: "f", value: 0.9
					},
					p: { 
						type: "f", value: 2.5
					},
					glowColor: { 
						type: "c", 
						value: new THREE.Color(0x0000ff) 
					},
					viewVector: { 
						type: "v3", 
						value: camera.position // new THREE.Vector3(1, 0, 1) /* Doesn't work: camera.position */ 
					}
				},
				vertexShader: AtmosphereVertex,
				fragmentShader: AtmosphereFragment,
				side: THREE.FrontSide,
				blending: THREE.AdditiveBlending,
				transparent: true
			});

			this.earthAtmosphere = new THREE.Mesh(earthGeometry.clone(), customMaterial.clone());
			this.earthAtmosphere.position = this.earth.position;
			this.earthAtmosphere.scale.multiplyScalar(1.01);
			scene.add( this.earthAtmosphere );

			this.camera = camera;
		},

		unload: function(renderer, scene) {
			scene.remove(this.earth);
		},

		update: function() {
			this.earthAtmosphere.material.uniforms.viewVector.value = new THREE.Vector3().subVectors( this.camera.position, this.earth.position );
		}
	});
});