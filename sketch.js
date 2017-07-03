var ship;
var asteroids=[];
var totalAsteroids;;
function setup() {
	createCanvas(windowWidth,windowHeight);
ship= new ship();
totalAsteroids=floor(random(3,10));
for(var i=0;i< totalAsteroids;i++){
asteroids.push(new asteroid());
}

}

function draw() {
 background(0);
 ship.render();
 ship.turn();
 ship.update();
 ship.edge();



 for(var i=0;i<asteroids.length;i++){
   asteroids[i].render();
   asteroids[i].update();
   asteroids[i].edge();
 }

}


function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false);
}

/////////////////////keyPressed
function keyPressed(){
  if (keyCode==RIGHT_ARROW){
    ship.setRotation(.1);
  }else if (keyCode==LEFT_ARROW){
    ship.setRotation(-.1);
  }else   if (keyCode==UP_ARROW){
      ship.boost();
    }else if (keyCode==DOWM_ARROW){
      ship.boosting(true);
    }

}
////////////////////keyPressed
function ship(){
	this.pos=createVector(width/2,height/2);
	this.r=20;
  this.heading=0;
  this.rotation=0;
  this.isBoosting=false;
	this.render=function(){
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.heading+PI/2);
    noFill();
    stroke(200);
		triangle(-this.r,this.r,this.r,this.r,0,-this.r);
    ellipse(0,-this.r,4,4);
    pop();
	}


  this.vel=createVector(1,0)


  this.update=function(){
    if(this.isBoosting){
      this.boost();
    }
    this.pos.add(this.vel)
    this.vel.mult(.99);
  }

  this.boost=function(){
    var force=p5.Vector.fromAngle(this.heading);
    force.mult(1);
    this.vel.add(force);

    console.log("booost");
  }

  this.setRotation=function(a){
    this.rotation=a;
  }

  this.turn=function(){
    this.heading+=this.rotation;
  }

this.boosting=function(b){
  this.isBoosting=b;

}

this.edge=function(){
  if(this.pos.x>width){
    this.pos.x=0;
  }else if(this.pos.x<0){
    this.pos.x=width;
  }else if(this.pos.y>height){
    this.pos.y=0;
  }else if(this.pos.y<0){
    this.pos.y=height;
  }
}

}
