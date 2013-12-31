define([
], function() {
	return Class.extend({
		init: function() {
			this.entities = [];
			this.lights = [];
			this.scene =
			this.camera = null;
			this.input = [];
		},

		addEntity: function(entity) {
            this.entities.push(entity);
        },

        addLight: function(light) {
        	this.lights.push(light);
        },

        load: function(renderer) {
        	for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                entity.load(renderer, this.scene, this.camera);
            }

			for (var i = 0; i < this.lights.length; i++) {
                var light = this.lights[i];
                this.scene.add(light);
            }            
        },

        unload: function(renderer) {
        	for (var i = 0; i < this.lights.length; i++) {
                var light = this.lights[i];
                this.scene.remove(light);
            }

        	for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];
                entity.unload(renderer, this.scene);
            }
        },

		update: function() {
			for (var i = 0; i < this.entities.length; i++) {
                var entity = this.entities[i];

                if (!entity.remove) {
                    entity.update(this.input);
                }
            }

            for (var i = this.entities.length-1; i >= 0; --i) {
                if (this.entities[i].remove) {
                    this.entities.splice(i, 1);
                }
            }
		},

		getScene: function() {
			if(!this.scene) {
				throw Exception('Scene required!');
			}

			return this.scene;
		},

		getCamera: function() {
			if(!this.camera) {
				throw Exception('Camera required!');
			}

			return this.camera;
		},

		resize: function(width, height) {

		}
	});
});