(function(root) {
  var Game = root.Game = (root.Game || {});

  var Ship = Game.Ship = function(pos, speed, theta) {
    var COLOR = "red";
    var RADIUS = 8;
    Game.MovingObject.call(this, RADIUS, COLOR, pos, speed, theta);
  };

  Ship.inherits(Game.MovingObject);

  Ship.prototype.impulse = function(power) {
    this.speed += power;
  };

  Ship.prototype.rotate = function(angle) {
    this.theta += angle;
  };

  Ship.prototype.fireBullet = function() {
    return new Game.Bullet([this.xPos, this.yPos], 20, this.theta);
  };
})(this);