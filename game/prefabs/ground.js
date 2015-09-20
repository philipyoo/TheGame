'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

  this.game.physics.arcade.enableBody(this);
  this.physicsType = Phaser.SPRITE;

  this.body.allowGravity = false;
  this.body.immovable = true;

  // this.game.physics.arcade.OVERLAP_BIAS = 30;
  // this.game.physics.arcade.TILE_BIAS = 1000;

};

Ground.prototype = Object.create(Phaser.Sprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

};

module.exports = Ground;
