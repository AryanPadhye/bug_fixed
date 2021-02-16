var plr,plr1
var player,player1
var peach1,peach
var bg,bg1,bg2
var ground
var goblin1
var goblinGroup,bgGroup,dGroup,fGroup
var pGroup
var START=0
var PLAY=1
var END=2
var WIN=3
var gameState=START
var b,b1
var gg,gg1,gg2
var ff
var d1,d2
var f1,p1,p2
var start,button
var z1
var barrier,barrier1

function preload(){
  plr1=loadAnimation("steve1.png","steve2.png","steve3.png","steve4.png","steve5.png","steve6.png")
  player1=loadAnimation("steved1.png","steved2.png")
  gg2=loadImage("win.png")
  b1=loadImage("bg1.jpg")
  goblin1=loadAnimation("goblin1.png","goblin2.png","goblin3.png","goblin4.png","goblin5.png","goblin6.png","goblin7.png")
  bg1=loadImage("background.png")
  gg1=loadImage("gg.png")
  f1=loadImage("unnamed.png")
  d1=loadImage("dragon1.png")
  d2=loadImage("dragon2.png")
  peach1=loadImage("peach2.png")
  start=loadImage("start-1.png")
  z1=loadAnimation("zombie1.png","zombie2.png","zombie3.png","zombie4.png","zombie5.png","zombie6.png")
 barrier1=loadImage("barrier.png") 
}

function setup(){
  createCanvas(800,400)
  
  
}

function draw(){
  background(220)
  
  if(gameState===START){
    button=createSprite(400,200,10,10)
    button.addImage("start",start)
  }
  
  textSize(20)
  fill("red")
  text("Press Start to Play",320,100)
  
  
  if(mousePressedOver(button)){
  
  gameState=PLAY
  
  bg=createSprite(400,200,10,10)
  bg.addImage(bg1)
  bg.scale=1.7
  
  b=createSprite(400,200,10,10)
  b.addImage(b1)
  b.scale=2
  b.visible=false
 
  
  plr=createSprite(50,360,10,10)
  plr.addAnimation("running",plr1)
  plr.scale=0.8
  plr.setCollider("circle",0,0,40)
    
    
  player=createSprite(200,335,10,10)
  player.addAnimation("dancing",player1)
  player.scale=0.8
  player.visible=false

  ground=createSprite(200,400,1000,20)
  ground.visible=false
  
  gg=createSprite(400,200,10,10)
  gg.addImage("gg",gg1)
  gg.visible=false
  
  ff=createSprite(400,100,10,10)
  ff.addImage("gg",gg2)
  ff.scale=0.3
  ff.visible=false
    
  barrier=createSprite(100,150,800,10)
  barrier.addImage("barrier",barrier1)
  barrier.scale=1.3
  barrier.visible=false
  
  goblinGroup=createGroup();
  dGroup=createGroup();
  fGroup=createGroup();
  bgGroup=createGroup();
  pGroup=createGroup();
  bgGroup.add(bg)
  }
  
  if(gameState===PLAY){
     if(keyDown("space")){
     plr.velocityY=-10
  }
  
  plr.velocityY=plr.velocityY+0.8
  plr.collide(ground)
  
  if(plr.isTouching(barrier)){
     plr.velocityY=10
     }  
    
    spawnGoblins();
    spawnDragons();
    spawnzombies();
    
  if(goblinGroup.isTouching(plr)){
    gameState=END
  } 
  if(fGroup.isTouching(plr)){
      gameState=END
  }
  if(frameCount==3000){
    gameState=WIN
  }
  }
   else if(gameState===WIN){
      win1();
     
       
  }
  else if(gameState===END){
     background(0)
      bgGroup.destroyEach()
      goblinGroup.destroyEach()
      plr.destroy()
      pGroup.destroyEach()
      fGroup.destroyEach()
      dGroup.destroyEach()
      gg.visible=true
  }
  console.log(gameState)
  drawSprites();
}

function spawnGoblins(){
  if(frameCount%50===0&&frameCount%500<=0) {
    goblin= createSprite(600,360,40,10);
    goblin.addAnimation("goblin",goblin1);
    goblin.setCollider("circle",0,0,20)
    goblin.scale =1.5;
    goblin.velocityX = -5;
    goblin.lifetime=6000  
   goblinGroup.add(goblin);
    
  }
}

function spawnDragons(){
  if(frameCount===2000){
   dragon=createSprite(600,310,40,10)
   dragon.addImage("dragon",d1)
   dragon.scale=0.7
   dGroup.add(dragon)
   peach=createSprite(750,340,10,10)
   peach.addImage("peach",peach1)
   peach.scale=0.1
   pGroup.add(peach)
  }
  if(frameCount>2000&&frameCount%50===0){
    spawnfireballs();
  }
   
}
  
function spawnfireballs(){
  fb=createSprite(435,220,10,10)
  fb.addImage("fireball",f1)
  fb.scale=0.2
  fb.velocityX=-8
  fb.velocityY=3
  fb.visible=false
  if(frameCount%50===0){
    fb.visible=true
  }
  fGroup.add(fb)
}

function spawnzombies(){
  if (frameCount % 170 === 0) {
    zombie= createSprite(600,360,40,10);
    zombie.addAnimation("zombie",z1);
    zombie.setCollider("circle",0,0,10)
    zombie.scale =1.5;
    zombie.velocityX = -5;
    zombie.lifetime=6000  
   goblinGroup.add(zombie);
    
  }
}

function win1(){
  background(220)
      bgGroup.destroyEach()
      goblinGroup.destroyEach()
      plr.destroy()
      peach.destroy()
      fGroup.destroyEach()
      dGroup.destroyEach()
      ff.visible=true
      player.visible=true
      b.visible=true
      peach=createSprite(400,335,10,10)
      peach.addImage("peach",peach1)
      peach.scale=0.1
      
}