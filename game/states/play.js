
  'use strict';

  var Bird = require('../prefabs/bird');
  var Ground = require('../prefabs/ground');

  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.game.physics.arcade.gravity.y = 500;

      this.bird = new Bird(this.game, 100, this.game.height/2);
      this.game.add.existing(this.bird);

      // this.map = this.game.add.tilemap('level1');

      //first parameter is the tileset name as specified in Tiled, the second is the key to the asset
      // this.map.addTilesetImage('tiles', 'tiles');

      //create layer
      // this.backgroundlayer = this.map.createLayer('BackgroundLayer');
      // this.blockedLayer = this.map.createLayer('ObjectLayer');

      //collision on blockedLayer
      // this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

      //resizes the game world to match the layer dimensions
      // this.backgroundlayer.resizeWorld();

      this.ground = new Ground(this.game, 0, 400, 335, 112);
      this.game.add.existing(this.ground);


    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
