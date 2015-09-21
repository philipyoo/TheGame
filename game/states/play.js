
  'use strict';


  var Ground = require('../prefabs/ground');
  var Player = require('../prefabs/player');
  var Bullet = require('../prefabs/bullet');
  var Explosion = require('../prefabs/explosion');
  var cursors;

  function Play() {}
  Play.prototype = {
    create: function() {

      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

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

      this.game.camera.follow(this.player1);


       this.explosion = new Explosion(this.game, 0, 0, 'kaboom');
      // this.ground = new Ground(this.game, 0, 700, 2000, 112);
      // this.game.add.existing(this.ground);
      //flame = this.game.add.sprite(300, 200, 'kaboom');
      console.log(this.game.add.sprite(0,0,'kaboom'));
      this.flame = this.game.add.sprite(0, 0, 'kaboom');
      this.flame.scale.setTo(1.5, 1.5);
      //console.log(flame.animations);
         // sprite: function (x, y, key, frame, group) {


      this.blow = this.flame.animations.add('blow');




    },
    update: function() {

      this.game.physics.arcade.overlap(this.bullet1.bullets, this.player2,  this.collisionHandler, null, this);

      this.game.physics.arcade.collide(this.player1, this.ground);
      this.game.physics.arcade.collide(this.player2, this.ground);
    },


    collisionHandler: function(bullet, opponent){
      bullet.kill();
      opponent.kill()
      // console.log(opponent.x)
      // console.log(opponent.body.x)
     // explosion = this.game.add.sprite(opponent.x, opponent.y, 'explosion')
     //console.log(explosion)
     //var explosion = this.explosion.explosions.getFirstExists(false);
      this.flame.reset(opponent.body.x, opponent.body.y-100);
      console.log(this.flame.animations.play);
      this.flame.animations.play('blow', 30, false, true);
     //console.log(explosion.play)
     // explosion.play('explosion', 30, true, false);
    },

    clickListener: function() {
      this.game.state.start('gameover');
    }

};


  module.exports = Play;
