require([
  './utilities/AssetManager',
  './GameEngine',
  './scenes/WorldScene'
], function(AssetManager, GameEngine, WorldScene) {
    if ( ! Detector.webgl ) {
      Detector.addGetWebGLMessage();
    } else {
      var gameEngine = new GameEngine();
      gameEngine.addScene(new WorldScene());

      // make global just because
      var assets = new AssetManager();

      // assets.queueDownload('images/ball.jpg');
      
      // assets.queueSound('thud', 'audio/thud.wav');
      
      assets.downloadAll(function() {
          gameEngine.start();
          gameEngine.selectScene(0);
      });
    }
});