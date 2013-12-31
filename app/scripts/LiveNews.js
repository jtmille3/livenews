require.config({
    paths: {
        text: "../../../bower_components/requirejs-text/text"
    }
  });

require([
  './utilities/AssetManager',
  './GameEngine',
  './scenes/SpaceScene'
], function(AssetManager, GameEngine, SpaceScene) {
  'use strict';

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
  } else {
    var gameEngine = new GameEngine();
    gameEngine.addScene(new SpaceScene());

    // make global just because
    var assets = new AssetManager();

    assets.queueDownload('images/2_no_clouds_4k.jpg');
    assets.queueDownload('images/elev_bump_4k.jpg');
    assets.queueDownload('images/fair_clouds_4k.png');
    assets.queueDownload('images/galaxy_starfield.png');
    assets.queueDownload('images/water_4k.png');
    
    // assets.queueSound('thud', 'audio/thud.wav');
    
    assets.downloadAll(function() {
      gameEngine.start();
      gameEngine.selectScene(0);
    });
  }
});