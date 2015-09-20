'use strict';

var bullets;

var fireRate = 100;
var nextFire = 0;


var Bullet = function(game, x, y, spritesheet, player) {
  Phaser.Sprite.call(this, game, x, y, spritesheet, player);

  //this.game.physics.startSystem(Phaser.Physics.ARCADE);
   this.player = player
   this.game.physics.arcade.enableBody(this);

    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(20, 'bullet');
    //this.bullets.setAll('anchor.x', -0.5);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);

    this.body.collideWorldBounds = true;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function(){
    //player.rotation = this.game.physics.arcade.angleToPointer(player);
    // this.bullets.x = player.x;
    // this.bullets.y = player.y;

    if (this.game.input.activePointer.isDown)
    {
      if (this.game.time.now > nextFire && this.bullets.countDead() > 0)
       {
          nextFire = this.game.time.now + fireRate;

          var bullet = this.bullets.getFirstDead(false);

          bullet.reset(this.player.x, this.player.y);

          this.game.physics.arcade.moveToPointer(bullet, 1000);
       }
    };

  }

  module.exports = Bullet;
