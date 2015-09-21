'use strict';

var explosions;

var Explosion = function(game, x, y, spritesheet) {
  Phaser.Sprite.call(this, game, x, y, spritesheet);
   //this.game.physics.arcade.enableBody(this);
    this.explosions = this.game.add.group();


    this.game.physics.arcade.enableBody(this);
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.enableBody = true;
    this.body.collideWorldBounds = true;
    //this.explosions.physicsBodyType = Phaser.Physics.ARCADE;

    this.explosions.createMultiple(20, 'kaboom');
    //this.explosions.setAll('anchor.x', -0.5);
    // this.explosions.setAll('checkWorldBounds', true);
    // this.explosions.setAll('outOfBoundsKill', true);

    // this.body.collideWorldBounds = true;
};

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.update = function(){

      var explosion = this.explosions.getFirstExists(false);
      //explosion.reset(500, 500);
     // console.log(this.explosion.play('explosion', 30, true, false));
     //console.log(explosion.play)
      explosion.play('kaboom', 10, true, false);
        // var explosion = this.explosions.getFirstDead(false);

        // explosion.reset(500, 500  );


  }

  module.exports = Explosion;
