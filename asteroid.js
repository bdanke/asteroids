(function(root) {
  var Game = root.Game = (root.Game || {});

  var Asteroid = Game.Asteroid = function(size, pos, speed, theta) {
    var COLOR = "white";
    var RADIUS = size;
    Game.MovingObject.call(this, RADIUS, COLOR, pos, speed, theta);
  };

  Asteroid.inherits(Game.MovingObject);

  Asteroid.prototype.smallerAsteroid = function() {
    var speed = Math.random() * 2;
    var theta = Math.random() * 2 * Math.PI;
    return new Asteroid(10, [this.xPos, this.yPos], speed, theta);
  };

  var randomPos = function(max) {
    return Math.random() * max;
  };

  var randomAsteroid = Game.randomAsteroid = function(dimX, dimY) {
    var pos = [];
    pos.push(randomPos(dimX));
    pos.push(randomPos(dimY));
    var speed = Math.random() * 10;
    var theta = Math.random() * 2 * Math.PI;
    return new Asteroid(20, pos, speed, theta);
  };
})(this);