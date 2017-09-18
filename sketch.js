var ship;
var asteroids = [];
var totalAsteroids;;
var lasers=[];
var score=0
var debugging=false
var pause=false;
var win=false;
function setup() {
  canvas=createCanvas(windowWidth-50, windowHeight-50);
  canvas.position(25,25)
  ship = new ship();
  totalAsteroids = floor(random(7, 25));
 spawn_asteroids();

}

function spawn_asteroids(){
  for (var i = 0; i < totalAsteroids; i++) {
    asteroids.push(new asteroid());
    dis=floor(asteroids[i].pos.dist(ship.pos))
   
    while(asteroids[i].clash){
    if(dis<(asteroids[i].r*4) && asteroids[i].clash){
       asteroids[i].setPos()  
       dis=floor(asteroids[i].pos.dist(ship.pos))
      //  console.log(asteroids[i].clash)
    }else{
      asteroids[i].clash=false
      // console.log(asteroids[i].clash)
    }
  }
}
}
function draw() {
  background(0);
  render_ship();
  render_asteroids();
  render_laser();
  ship.crash(asteroids);
  display_score();
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

      score+=floor(ast.r/2)
      continue;
    }

    if(asteroids[i].r<10){
      asteroids.splice(i,1);
      score+=10;
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

function display_score(){
  push()
  textSize(30)
  fill(90,170,30)
  text(score,width-100,30)
  pop()

  if(asteroids.length==0)
    {
      win=true;
      push()
      textSize(70)
      textAlign(CENTER)
      fill(255)
      stroke(255)
      text("YOU WIN !!!! \n congratulations\n\n Press x to continue playing",width/2,height/2)
      pop()
    }

    if(ship.crashed)
      {
        push()
        stroke(255)
        fill(255)
        textSize(20)
        textAlign(CENTER)
        text("GAME OVER",width/2,height/2)
        pop()
        noLoop();
      }

      if(pause){
        console.log("paused")
        push()
        textSize(40)
        textAlign(CENTER)
        fill(255)
        stroke(255)
        text("|| PAUSED" , 110,110)
        pop()
        noLoop();

      }
}

function play_pause(){
  if(pause){
    pause=false;
    loop()
  }else if(!pause){
    pause=true;
    noLoop();
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
  } 
   if (keyCode == UP_ARROW || key=="w" ||key=="W") {
    ship.boost();
    ship.animate()
  }
   if(key==" " || key==""){
    lasers.push(new laser(ship.pos,ship.heading))
  }
   if(key=="p" || key=="P"){
    play_pause()
  }
  if(win && (key=="x" || key=="X") ){
    win=false;
    spawn_asteroids();
  }
}
////////////////////keyPressed


