'use strict';

var Platform = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'platform');

  this.game.physics.arcade.enableBody(this);
  this.physicsType = Phaser.SPRITE;

  this.enableBody = true;
  this.game.physics.enable(this, Phaser.Physics.ARCADE)

  this.body.allowGravity = false;
  this.body.immovable = true;

  this.width = width;
  this.height = height;

};

Platform.prototype = Object.create(Phaser.TileSprite.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Platform;
