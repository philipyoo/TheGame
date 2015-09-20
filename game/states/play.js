
  'use strict';


  var Ground = require('../prefabs/ground');
  var Player = require('../prefabs/player');
  var Bullet = require('../prefabs/bullet');
  var cursors;


  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.game.physics.arcade.gravity.y = 500;

      this.background = this.game.add.sprite(0, 0, 'background');

      this.player = new Player(this.game, 0, 2000);
      this.bullet = new Bullet(this.game, this.player.x, this.player.y, this.player);
      this.game.add.existing(this.player);
      this.game.add.existing(this.bullet);

      this.game.camera.follow(this.player);

      // cursors = this.game.input.keyboard.createCursorKeys();

    },
    update: function() {

      this.game.physics.enable(this.player);
      this.game.physics.arcade.collide(this.player, this.ground);

      // if (cursors.up.isDown) {
      //   console.log(this);
      //   this.game.camera.y -= 4;
      // } else if (cursors.down.isDown) {
      //   this.game.camera.y += 4;
      // }
      //
      // if (cursors.left.isDown) {
      //   this.game.camera.x -= 4;
      // } else if (cursors.right.isDown) {
      //   this.game.camera.x += 4;
      // }

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
