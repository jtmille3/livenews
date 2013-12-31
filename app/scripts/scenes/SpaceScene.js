define([
  './Scene',
  '../entities/Galaxy',
  '../entities/Earth'
], function(Scene, Galaxy, Earth) {
  'use strict';
  return Scene.extend({

    init: function() {
      this._super();

      // set some camera attributes
      var VIEW_ANGLE = 45,
      ASPECT = window.innerWidth / window.innerHeight,
      NEAR = 0.01,
      FAR = 1000;

      this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
      this.camera.position.set( 1, 0, 1 );
      this.camera.up = new THREE.Vector3( 0, 1, 0 );

      this.scene = new Physijs.Scene({
        fixedTimeStep: 1 / 60
      });
      this.scene.setGravity(new THREE.Vector3( 0, 0, -9.8 ));

      var ambientLight = new THREE.AmbientLight(0x333333);
      this.addLight( ambientLight );

      // directional lighting
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(5, 0, 5);
      this.addLight( directionalLight );

      this.galaxy = new Galaxy();
      this.addEntity(this.galaxy);

      this.earth = new Earth({
        radius: 0.05
      });
      this.addEntity(this.earth);
    },

    load: function(renderer) {
      var that = this;

      window.addEventListener('mousedown', function() {
        that.input.click = true;
      });

      window.addEventListener('mouseup', function() {
        that.input.click = false;
      });

      this.scene.addEventListener('update', function() {
        that.scene.simulate(undefined, 2);
        physic_stats.update();
      });

      this.scene.simulate();

      this._super(renderer);
    },

    unload: function() {
      window.removeEventListener('mousedown');
      window.removeEventListener('mouseup');

      this.scene.removeEventListener('update');

      this._super();
    },

    update: function() {
      this._super();
      var timer = Date.now() * 0.0001;

      this.camera.position.x = Math.cos( timer ) * 1.4;
      this.camera.position.z = Math.sin( timer ) * 1.4;

      this.camera.lookAt ( this.earth.mesh.position );
    },

    resize: function(width, height) {
      this._super();

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  });
});