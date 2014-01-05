Function.prototype.inherits = function (BaseClass) {
  function Surrogate () {};
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
};

(function(root) {
  var Game = root.Game = (root.Game || {});

  var MovingObject = Game.MovingObject = function(radius, color, pos, speed, theta) {
    this.radius = radius;
    this.color = color;
    this.xPos = pos[0];
    this.yPos = pos[1];
    this.speed = speed;
    this.theta = theta;
  }

  MovingObject.prototype.move = function(maxX, maxY){
    this.xPos = (this.xPos + this.speed * Math.cos(this.theta));
    this.yPos = (this.yPos + this.speed * Math.sin(this.theta));
    if (this.xPos > maxX) {
      this.xPos = this.xPos % maxX;
    } else if (this.xPos < 0) {
      this.xPos = maxX + this.xPos + 1;
    }
    if (this.yPos > maxY) {
      this.yPos = this.yPos % maxY;
    } else if (this.yPos < 0) {
      this.yPos = maxY + this.yPos + 1;
    }
  }

  MovingObject.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.xPos,this.yPos,this.radius,0,Math.PI*2);
    ctx.stroke();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var distance = Math.sqrt(Math.pow((this.xPos - otherObject.xPos),2) +
                             Math.pow((this.yPos - otherObject.yPos),2));
    if (distance < (this.radius + otherObject.radius)){
      return true;
    }
    return false;
  }
})(this);