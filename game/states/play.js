
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

      //Create Playe(this.game.world.height)
      this.player1 = new Player(this.game, this.game.world.width*-1, this.game.world.height*-1, 'player', true);
      this.player2 = new Player(this.game, this.game.world.width/2, this.game.world.height/2, 'yeoman', false);

      //Create weapons for Players
     this.bullet1 = new Bullet(this.game, this.player1.x, this.player1.y, 'bullet', this.player1);
     //this.bullet2 = new Bullet(this.game, this.player2.x, this.player2.y, 'bullet', this.player2);

      //Add players and weapons to game
      this.game.add.existing(this.player1);
      this.game.add.existing(this.player2);
      //this.game.add.existing(this.bullet2);

      this.game.add.existing(this.bullet1);

      this.ground = new Ground(this.game, 0, 700, 2000, 112);
      this.game.add.existing(this.ground);
      this.game.camera.follow(this.player1);

      // cursors = this.game.input.keyboard.createCursorKeys();

    },
    update: function() {


      this.game.physics.arcade.overlap(this.bullet1.bullets, this.player2,  this.collisionHandler, null, this);
    },

    collisionHandler: function(bullet, opponent){
      bullet.kill();
      opponent.kill()
    },

    clickListener: function() {
      this.game.state.start('gameover');
    }

};


  module.exports = Play;
