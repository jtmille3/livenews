define([
], function() {
    var requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    return Class.extend({
        init: function() {
            this.scenes = [];

            this.renderer = new THREE.WebGLRenderer({ 
              antialias: true 
            });
            /* this will slow down the rendering by half without a GPU */
            this.renderer.shadowMapEnabled = true;
            this.renderer.shadowMapSoft = true;
            this.renderer.shadowMapAutoUpdate = true;
            // this.renderer.shadowMapDebug = true;
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x191919, 1);
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild(this.renderer.domElement);

            window.addEventListener('resize', this.resize, false);
            window.addEventListener('load', this.load, false);
        },

        resize: function() {
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.scenes[this.sceneIndex].resize(window.innerWidth, window.innerHeight);
        },

        load: function() {
            loop();
        },

        start: function() {
            console.log("starting game");
            var that = this;
            (function gameLoop() {
                that.loop();
                requestAnimFrame(gameLoop);
            })();
        },

        addScene: function(scene) {
            this.scenes.push(scene);
            scene.engine = this;
        },

        selectScene: function(sceneIndex) {
            if(this.sceneIndex !== undefined) {
                this.scenes[this.sceneIndex].unload(this.renderer);
            }

            this.sceneIndex = sceneIndex;
                
            this.scenes[sceneIndex].load(this.renderer);
        },

        draw: function(sceneIndex) {
            if(this.sceneIndex === undefined)
                return;
            
            var scene = this.scenes[sceneIndex];

            this.renderer.render( scene.getScene(), scene.getCamera() );
            render_stats.update();
        },

        update: function(sceneIndex) {
            this.scenes[sceneIndex].update();
        },

        loop: function() {
            var sceneIndex = this.sceneIndex;
            if(sceneIndex !== undefined) {
                this.update(sceneIndex);
                this.draw(sceneIndex);
            }
        }
    });
});