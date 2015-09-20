
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

<<<<<<< HEAD
      this.player = new Player(this.game, 0, 2000);
      this.bullet = new Bullet(this.game, this.player.x, this.player.y, this.player);
      this.game.add.existing(this.player);
      this.game.add.existing(this.bullet);
=======

      this.player1 = new Player(this.game, 100, 100, 'player1', true);
      this.game.add.existing(this.player1);
>>>>>>> 1ed330963f2e0504ec81fe0b296197fb097de33e


      //movement for these are the same because of same keystrokes
      this.player2 = new Player(this.game, 200, 100, 'player2', false);
      this.game.add.existing(this.player2);

      // this.ground = new Ground(this.game, 0, 700, 2000, 112);
      // this.game.add.existing(this.ground);

      this.game.camera.follow(this.player1);

      // cursors = this.game.input.keyboard.createCursorKeys();

    },
    update: function() {
<<<<<<< HEAD

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
=======
      
      this.game.physics.enable(this.player1);

      this.game.physics.arcade.collide(this.player1, this.ground);
>>>>>>> 1ed330963f2e0504ec81fe0b296197fb097de33e

    },

    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
