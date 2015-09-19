(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'thegame');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":4,"./states/gameover":5,"./states/menu":6,"./states/play":7,"./states/preload":8}],2:[function(require,module,exports){
'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('flap');
  this.animations.play('flap', 12, true);

  this.game.physics.arcade.enableBody(this);

};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Bird;

},{}],3:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

  this.game.physics.arcade.enableBody(this);
  this.physicsType - Phaser.SPRITE;

  this.body.allowGravity = false;
  this.body.immovable = true;

};

Ground.prototype = Object.create(Phaser.Sprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Ground;

},{}],4:[function(require,module,exports){

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

    if (this.game.device.desktop) {
      this.game.scale.pageAlignHorizontally = true;
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  480;
      this.game.scale.minHeight = 260;
      this.game.scale.maxWidth = 640;
      this.game.scale.maxHeight = 480;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.setScreenSize(true);
    }

    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],5:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],6:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    //this.background = this.game.add.sprite(0, 0, 'background')

    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'MENU', {font: '42px Arial', fill: '#fff', align: 'center'});
    text.anchor.set(0.5, 0.5);

    this.titleGroup = this.game.add.group();

    this.bird = this.game.add.sprite(-20, 100, 'bird');
    this.titleGroup.add(this.bird);
    this.bird.animations.add('flap');
    this.bird.animations.play('flap', 12, true);

    this.titleGroup.x = this.game.world.centerX;
    this.titleGroup.y = this.game.world.centerY;

    //Oscillate
    this.game.add.tween(this.titleGroup).to({y:295}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    // add our start button with a callback
    //this.game.add.button(x, y, key, callback, callbackContext);
    //Every function in Phaser that has a cb also has a cb context parameter. If you fail to pass in the context parameter, Phaser will assume a null context. Generally, you will want to make your cb context `this`, as we want our cb to operate inside of a context that we can access all of our game objects from.
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);

    // this.titleGroup.add(this.startButton);

    this.startButton.anchor.setTo(0.5, 0.5);


  },
  startClick: function() {
    this.game.state.start('play');
  },
  update: function() {
    // if(this.game.input.activePointer.justPressed()) {
      // this.game.state.start('play');
    // }
  }
};

module.exports = Menu;

},{}],7:[function(require,module,exports){

  'use strict';

  var Bird = require('../prefabs/bird');
  var Ground = require('../prefabs/ground');

  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.game.physics.arcade.gravity.y = 500;

      this.bird = new Bird(this.game, 100, this.game.height/2);
      this.game.add.existing(this.bird);

      // this.map = this.game.add.tilemap('level1');

      //first parameter is the tileset name as specified in Tiled, the second is the key to the asset
      // this.map.addTilesetImage('tiles', 'tiles');

      //create layer
      // this.backgroundlayer = this.map.createLayer('BackgroundLayer');
      // this.blockedLayer = this.map.createLayer('ObjectLayer');

      //collision on blockedLayer
      // this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

      //resizes the game world to match the layer dimensions
      // this.backgroundlayer.resizeWorld();

      this.ground = new Ground(this.game, 0, 400, 335, 112);
      this.game.add.existing(this.ground);


    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;

},{"../prefabs/bird":2,"../prefabs/ground":3}],8:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    //boilerplate code. displays animated loading image while loading other assets
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.load.setPreloadSprite(this.asset);
    // ????
    this.asset.anchor.setTo(-1, -1);

    //load game assets:
    this.load.image('startButton', 'assets/images/start-button.png');
    // this.load.tilemap('level1', 'assets/tilemaps/testmap.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.image('tiles', 'assets/images/testmap.png');
    // replace bird spritesheet with characters

    this.load.image('ground', 'assets/images/ground.png');

    this.load.spritesheet('bird', 'assets/images/bird.png', 34, 24, 3);



  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])