define([
	'./Entity',
	'text!../../shaders/atmosphere.vertex.glsl',
	'text!../../shaders/atmosphere.fragment.glsl',
], function(Entity, AtmosphereVertex, AtmosphereFragment) {
	'use strict';
	
	return Entity.extend({
		init: function(options) {
			this._super(options);

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

			this.add(this.earth);
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
						value: new THREE.Vector3(1, 0, 1)
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
			this.add( this.earthAtmosphere );
		},

		update: function() {
			this.earthAtmosphere.material.uniforms.viewVector.value = new THREE.Vector3().subVectors( this.options.camera.position, this.earth.position );
		}
	});
});