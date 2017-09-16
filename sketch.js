var ship;
var asteroids = [];
var totalAsteroids;;
var lasers=[];
var debugging=false
function setup() {
  canvas=createCanvas(windowWidth-50, windowHeight-50);
  canvas.position(25,25)
  ship = new ship();
  totalAsteroids = floor(random(3, 4));
  for (var i = 0; i < totalAsteroids; i++) {
    asteroids.push(new asteroid());
  }

}

function draw() {
  background(0);
  render_ship();
  render_asteroids();
  render_laser();
  ship.crash(asteroids);
  


 
  

}

function render_ship(){
  ship.render();
  ship.turn();
  ship.update();
  ship.edge();
}

function render_asteroids(){
  for (var i = 0; i < asteroids.length; i++) {
    // console.log(asteroids.length)
    if(asteroids[i].hitted){
      if(debugging)
        console.log("hitted:"+i+" th ASTEROID")
      
      
      ast=asteroids[i]
      asteroids.splice(i,1)
           
      ast1=new asteroid(ast.pos,ast.r/2)
      ast2=new asteroid(ast.pos,ast.r/2)
      
      asteroids.push(ast1)
      asteroids.push(ast2)
      continue;
    }

    if(asteroids[i].r<10){
      asteroids.splice(i,1);
      continue;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edge();
    text(i,asteroids[i].pos.x,asteroids[i].pos.y)
   
  }
}

function render_laser(){
  
  for (var i = 0; i < lasers.length; i++) {
  
    lasers[i].render();
    lasers[i].update();
    lasers[i].edge();
    
    time=(lasers[i].f/frameRate());
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
}
////////////////////keyPressed


