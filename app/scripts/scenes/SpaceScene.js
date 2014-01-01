define([
  './Scene',
  '../entities/Galaxy',
  '../entities/Earth',
  '../entities/Pin'
], function(Scene, Galaxy, Earth, Pin) {
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
      this.camera.position.set(1, 0, 1);
      this.camera.up.set( 0, 1, 0 );

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

      this.galaxy = new Galaxy({
        scene: this.scene,
        camera: this.camera
      });
      this.addEntity(this.galaxy);

      this.earth = new Earth({
        scene: this.scene,
        camera: this.camera
      });
      this.addEntity(this.earth);

      // raleigh 35.843768 N, -78.6450559 W
      this.addPin(35.843768, -78.6450559);

      // London 51.5112139, -0.1198244
      this.addPin(51.5112139, -0.1198244);

      // NY 40.7143528, -74.0059731
      this.addPin(40.7143528, -74.0059731);

      // Tokyo 35.6894875, 139.6917064
      this.addPin(35.6894875, 139.6917064);

      // Cape Town -33.9248685!4d18.4240553
      this.addPin(-33.9248685, 18.4240553);

      this.controls = new THREE.TrackballControls( this.camera );

      this.controls.rotateSpeed = 1.0;
      this.controls.zoomSpeed = 1.2;
      this.controls.panSpeed = 0.8;

      this.controls.noZoom = false;
      this.controls.noPan = false;

      this.controls.staticMoving = true;
      this.controls.dynamicDampingFactor = 0.3;

      this.controls.keys = [ 65, 83, 68 ];

      // this.controls.addEventListener( 'change', render );
    },

    addPin: function(latitude, longitude) {
      var pin = new Pin({
        scene: this.scene,
        camera: this.camera,
        latitude: latitude,
        longitude: longitude
      });
      this.addEntity(pin);
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

      //this.camera.position.x = -1.1; //Math.cos(timer) * 1.4;
      //this.camera.position.z = 1.1; //Math.sin(timer) * 1.4;

      this.camera.lookAt ( this.earth.mesh.position );

      this.controls.update();
    },

    resize: function(width, height) {
      this._super();

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  });
});