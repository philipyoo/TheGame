
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    //boilerplate code. displays animated loading image while loading other assets
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.load.setPreloadSprite(this.asset);
    // ????
    this.asset.anchor.setTo(-1, -1);

    //load game assets:
    this.load.image('startButton', 'assets/images/start-button.png');
    // this.load.tilemap('level1', 'assets/tilemaps/testmap.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.image('tiles', 'assets/images/testmap.png');
    // replace bird spritesheet with characters

    this.load.image('ground', 'assets/images/ground.png');

    this.load.spritesheet('bird', 'assets/images/bird.png', 34, 24, 3);



  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
