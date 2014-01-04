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
      this.camera.position.set(1, 0, 1);
      this.camera.up.set( 0, 1, 0 );

      this.scene = new THREE.Scene();
      
      var ambientLight = new THREE.AmbientLight(0x202020);
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
      this.earth.addPin(35.843768, -78.6450559);

      // San Francisco 37.7749295, -122.4194155
      this.earth.addPin(37.7749295, -122.4194155);
      
      // NY 40.7143528, -74.0059731
      this.earth.addPin(40.7143528, -74.0059731);

      // London 51.5112139, -0.1198244
      this.earth.addPin(51.5112139, -0.1198244);

      // Tokyo 35.6894875, 139.6917064
      this.earth.addPin(35.6894875, 139.6917064);

      // Cape Town -33.9248685, 18.4240553
      this.earth.addPin(-33.9248685, 18.4240553);

      this.controls = new THREE.TrackballControls( this.camera );

      this.controls.rotateSpeed = 1.0;
      this.controls.zoomSpeed = 1.2;
      this.controls.panSpeed = 0.8;

      this.controls.noZoom = false;
      this.controls.noPan = false;

      this.controls.staticMoving = true;
      this.controls.dynamicDampingFactor = 0.3;

      this.controls.keys = [ 65, 83, 68 ];
    },

    load: function(renderer) {
      var that = this;

      window.addEventListener('mousedown', function() {
        that.input.click = true;
      });

      window.addEventListener('mouseup', function() {
        that.input.click = false;
      });

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

      if(this.earth) {
        this.earth.object.rotation.y += 0.1 * Math.PI / 180;
        this.earth.object.rotation.x = 23 * Math.PI / 180;
      }

      this.camera.lookAt ( this.earth.object.position );

      this.controls.update();
    },

    resize: function(width, height) {
      this._super();

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  });
});