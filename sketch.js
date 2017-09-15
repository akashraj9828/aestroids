var ship;
var asteroids = [];
var totalAsteroids;;
var lasers=[];
function setup() {
  canvas=createCanvas(windowWidth-50, windowHeight-50);
  canvas.position(25,25)
  ship = new ship();
  totalAsteroids = floor(random(3, 10));
  for (var i = 0; i < totalAsteroids; i++) {
    asteroids.push(new asteroid());
  }

}

function draw() {
  background(0);
  ship.render();
  ship.turn();
  ship.update();
  ship.edge();


  render_asteroids();
  render_laser();


 
  

}

function render_asteroids(){
  for (var i = 0; i < asteroids.length; i++) {
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edge();
  }
}

function render_laser(){
 
  if(lasers.length>15){lasers.splice(0,lasers.length-15)}
  
 
 
  for (var i = 0; i < lasers.length; i++) {
  
    lasers[i].render();
    lasers[i].update();
    lasers[i].edge();
    
    time=(lasers[i].f/frameRate());
    // console.log(time)
    if(time>1 || lasers[i].hits(asteroids))
     lasers.splice(i,1)
   
  }
 
  

}


function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

/////////////////////keyPressed
function keyPressed() {
  if (keyCode == RIGHT_ARROW || key=="d" ||key=="D") {
    ship.setRotation(.1);
  } else if (keyCode == LEFT_ARROW || key=="a" ||key=="A") {
    ship.setRotation(-.1);
  } else if (keyCode == UP_ARROW || key=="w" ||key=="W") {
    ship.boost();
  }else if(key==" " || key==""){
    lasers.push(new laser(ship.pos,ship.heading))
  }else if(key=="p" || key=="P"){
    noLoop();
  }else if(key=="o" || key=="O"){
    loop();}
    // else if (keyCode == DOWM_ARROW || key=="s" ||key=="S") {
  //   ship.boosting(false);
  // }

}
////////////////////keyPressed


