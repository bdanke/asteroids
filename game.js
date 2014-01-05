(function(root) {
  var Game = root.Game = (root.Game || {});

  var Screen = Game.Screen = function(ctx, dimX, dimY, numAsteroids) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.ctx = ctx;
    this.asteroids = [];
    this.addAsteroids(numAsteroids);
    var pos = [dimX/2, dimY/2]
    var temp = new Game.Ship(pos,0,0);
    this.ship = temp;
    this.bullets = [];
  };

  Screen.prototype.addAsteroids = function(num) {
    for (var i = 0; i < num; i++) {
      this.asteroids.push(Game.randomAsteroid(this.dimX, this.dimY));
    }
  };

  Screen.prototype.draw = function() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,this.dimX,this.dimY);
    var self = this;
    self.ship.draw(self.ctx);
    this.asteroids.forEach( function(aster) {
      aster.draw(self.ctx);
    });
    this.bullets.forEach( function(bullet) {
      bullet.draw(self.ctx);
    });
  };

  Screen.prototype.move = function() {
    var self = this;
    this.ship.move(self.dimX, self.dimY);
    this.asteroids.forEach( function(aster) {
      aster.move(self.dimX, self.dimY);
    });
    this.bullets.forEach( function(bullet) {
      bullet.move(self.dimX, self.dimY);
    });
  };

  Screen.prototype.step = function() {
    this.move();
    this.draw();
    var self = this;

    this.bullets.forEach( function(bullet) {
      bullet.hitAsteroids(self);
    });
    this.checkCollisions();
  };

  Screen.prototype.start = function() {
    this.bindKeyHandlers();
    this.timer = setInterval(this.step.bind(this), 30);
  };

  Screen.prototype.checkCollisions = function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        this.stop();
        return true;
      }
    }
    return false;
  };

  Screen.prototype.stop = function() {
    clearInterval(this.timer);
    alert("GAME OVER!");
  };

  Screen.prototype.bindKeyHandlers = function() {
    key('up', this.ship.impulse.bind(this.ship, 1));
    key('down', this.ship.impulse.bind(this.ship, -1));
    key('left', this.ship.rotate.bind(this.ship, 0.2));
    key('right', this.ship.rotate.bind(this.ship, -0.2));
    key('space', this.addBullet.bind(this));
  };

  Screen.prototype.addBullet = function() {
    var bullet = this.ship.fireBullet();
    this.bullets.push(bullet);
    setTimeout( function() { this.game.removeBullet(bullet); }, 500);
  };

  Screen.prototype.removeAsteroid = function(aster) {
    var arr = this.asteroids;
    if (aster.radius > 10) {
      for (var i = 0; i < 3; i++) {
        arr.push(aster.smallerAsteroid());
      }
    }
    this.asteroids = _.without(arr, aster);
  };

  Screen.prototype.removeBullet = function(bullet) {
    var arr = this.bullets;
    this.bullets = _.without(arr, bullet);
  };
})(this);