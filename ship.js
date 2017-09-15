function ship() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.heading = 0; 
    this.rotation = 0;
    this.isBoosting = false;
    this.render = function () {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.heading + PI / 2);
      noFill();
      stroke(200);
      triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
      ellipse(0, -this.r, 4, 4);
      pop();
    }
  
  
    this.vel = createVector(1, 0)
  
  
    this.update = function () {
      if (this.isBoosting) {
        this.boost();
      }
      this.pos.add(this.vel)
      this.vel.mult(.99);
    }
  
    this.boost = function () {
      var force = p5.Vector.fromAngle(this.heading);
      force.mult(1);
      this.vel.add(force);
  
      // console.log("booost");
    }
  
    this.setRotation = function (a) {
      this.rotation = a;
    }
  
    this.turn = function () {
      this.heading += this.rotation;
    }
  
    this.boosting = function (b) {
      this.isBoosting = b;
  
    }
  
    this.edge = function () {
      if (this.pos.x > width) {
        this.pos.x = 0;
      } else if (this.pos.x < 0) {
        this.pos.x = width;
      } else if (this.pos.y > height) {
        this.pos.y = 0;
      } else if (this.pos.y < 0) {
        this.pos.y = height;
      }
    }
  
  }
  