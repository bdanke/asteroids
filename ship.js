(function(root) {
  var Game = root.Game = (root.Game || {});

  var Ship = Game.Ship = function(pos, speed, theta) {
    var COLOR = "red";
    var RADIUS = 8;
    Game.MovingObject.call(this, RADIUS, COLOR, pos, speed, theta);

    this.p1 = [this.radius, 0];
    this.p2 = [-this.radius * Math.cos(Math.PI / 3), this.radius * Math.sin(Math.PI / 3)];
    this.p3 = [-this.radius * Math.cos(Math.PI / 3), -this.radius * Math.sin(Math.PI / 3)];
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

  Ship.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.xPos,this.yPos,this.radius,0,Math.PI*2);
    ctx.stroke();

    var tp1 = [this.xPos + Math.cos(this.theta) * this.p1[0] - Math.sin(this.theta) * this.p1[1], this.yPos + Math.sin(this.theta) * this.p1[0] + Math.cos(this.theta) * this.p1[1]];
    var tp2 = [this.xPos + Math.cos(this.theta) * this.p2[0] - Math.sin(this.theta) * this.p2[1], this.yPos + Math.sin(this.theta) * this.p2[0] + Math.cos(this.theta) * this.p2[1]];
    var tp3 = [this.xPos + Math.cos(this.theta) * this.p3[0] - Math.sin(this.theta) * this.p3[1], this.yPos + Math.sin(this.theta) * this.p3[0] + Math.cos(this.theta) * this.p3[1]];

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(tp1[0],tp1[1]);
    ctx.lineTo(tp2[0],tp2[1]);
    ctx.lineTo(tp3[0],tp3[1]);
    ctx.closePath();
    ctx.stroke();
  };
})(this);




