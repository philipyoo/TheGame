
'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.stage.backgroundColor = '#fff';

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    this.game.input.maxPointers = 1;

    // ARCADE physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.state.start('preload');
  }
};

module.exports = Boot;
