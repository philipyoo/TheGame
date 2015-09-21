'use strict';

var cursors;
var jumpKey;

var Player = function(game, x, y, spritesheet, controllable, frame) {
  Phaser.Sprite.call(this, game, x, y, spritesheet, controllable, frame);

  this.game.physics.arcade.enableBody(this);

  this.enableBody = true;
  this.game.physics.enable(this, Phaser.Physics.ARCADE)


  this.anchor.setTo(0.5, 0.5);

  this.scale.setTo(0.5, 0.5);

  this.animations.add('run');
  this.animations.play('run', 15, true);

  this.animations.add('left',[0,1,2], 10, true);
  this.animations.add('right',[3,4,5], 10, true);
  //this.animations.add('jump',[], 10, true);
  //this.animations.add('shoot'[] 10, true);

  this.body.collideWorldBounds = true;

  if (!controllable) {
    this.update = function() {
      return;
    }
  };

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  this.game.physics.arcade.gravity.y = 1000;

  cursors = this.game.input.keyboard.createCursorKeys();
  var jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
  // keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  // cursors = this.game.input.keyboard.addKey(Phaser.Keyboard)
  // jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;

  if (cursors.left.isDown) {
    this.body.velocity.x = -750;
    //this.anchor.setTo(0.5, 0);
    this.scale.x = -0.5;
    this.animations.play('left');
  } else if (cursors.right.isDown) {
    this.scale.x = 0.5;
    this.body.velocity.x = 750;
    this.animations.play('right');
  // } else {
  //   this.animations.stop();
  //   this.frame = 0;
  }

  if (jumpKey.isDown) {
    this.body.velocity.y = -200;
  }

  // if (cursors.up.isDown && this.body.touching.down){
  //   // console.log(this);
  //   // console.log(this.body.touching.down);
  //   this.body.velocity.y = -1550;
  // }

  // if (Phaser.Keyboard.UP.isDown && this.body.onFloor()) {
    // this.body.velocity.y = -250;
    // jumpTimer = game.time.now + 750;
  // }

};


module.exports = Player;
