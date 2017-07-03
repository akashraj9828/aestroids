function laser(spos,angle){
this.lspeed=5;
this.pos=createVector(spos.x,spos.y);
this.heading=p5.Vector.fromAngle(angle);
this.vel=createVector(this.heading.x*this.lspeed,this.heading.y*this.lspeed);


this.update=function(){
  this.pos.add(this.vel);
}


this.render=function(){
  push();
  stroke(200);
  strokeWeight(20);

  point(this.pos.x,this.pos.y);
pop();
}


this.edge=function(){
  if(this.pos.x>width+this.r){
    this.pos.x=-this.r;
  }else if(this.pos.x<-this.r){
    this.pos.x=width+this.r;
  }else if(this.pos.y>height+this.r){
    this.pos.y=-this.r;
  }else if(this.pos.y<-this.r){
    this.pos.y=height+this.r;
  }
}

this.hits=function(ast){
  d=dist(this.pos.x,this.pos.y,ast.pos.x,ast.pos.y)
if(d<ast.r)
console.log(hit);

  return false;

}


}
