var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl
var iground, invisibleGround, groundImage, backgroundImage, ground;

var coinGroup, coinImage;
var obstaclesGroup, obstacle2, obstacle1,obstacle3;
var score=0;
var life=100;
var sun, sunImage;

var gameOver, restart;


function preload(){
  girl_running = loadAnimation("girl.png");
  girl_collided = loadAnimation("deadgirl.png");
  groundImage = loadImage("ground.png");
 backgroundImage = loadImage("backgroundImg.png");
  coinImage = loadImage("coin.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle3 = loadImage("obstacle3.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  sunImage= loadImage("sun.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  girl = createSprite(50,height-500,1,2);
  girl.addAnimation("running", girl_running);
  girl.scale = 0.3;
  
sun = createSprite(width-50,80,10,10)
sun.addImage("sunn", sunImage)
sun.scale =0.2;

  iground = createSprite(0,height-190,width*2,10);
  iground.x = iground.width /2;
  iground.velocityX = -(6 + 3*score/100);
  
ground = createSprite(0,height-150,width*5,30)
ground.x = width/2;
ground.addImage("ground",groundImage) 

  gameOver = createSprite(width/2,height/2-100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  coinGroup = new Group();
  obstaclesGroup = new Group();
  iground.visible = true;

  score = 0;
}

function draw() {
  background(backgroundImage);
  textSize(20);
  fill(0);
  text("Score: "+ score, 50,40);
  text("life: "+ life , 50,60);
  drawSprites();
  if (gameState===PLAY){
   if(girl.isTouching(coinGroup)){
     score=score+1
     coinGroup[0].destroy()
   }
    
    
      ground.velocityX = -(6 + 3*score/100);
    
  
    if(keyDown("space") && girl.y >= 139) {
      girl.velocityY = -12;
    }
  
    girl.velocityY = girl.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    girl.collide(ground);
    
    spawnCoin();
    spawnObstacles();
  
   if(obstaclesGroup.isTouching(girl)){
        gameState = END;
    } 
    
    if(girl.isTouching(obstaclesGroup)){
      life=life-1
    }
    
      
    
  }
  
  else if (gameState === END ) {
    gameOver.visible = true;
    restart.visible = true;
    girl.addAnimation("collided", girl_collided);
    
    //set velcity of each game object to 0-------------------------------------
    ground.velocityX = 0;
    girl.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    
    //change the trex animation
    girl.changeAnimation("collided",girl_collided);
    girl.scale =0.35;
    
    //set lifetime of the game objects so that they are never destroyed----
    obstaclesGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      
      
    
      reset()
      
    }
  }
}

function spawnCoin() {
  //write code here to spawn the clouds----------------------------------
  if (frameCount % 60 === 0) {
    var coin = createSprite(width,height-200,40,10);
    coin.y = Math.round(random(height-200,height-300));
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.velocityX = -3;
    
     //assign lifetime to the variable-----------------------------------
    coin.lifetime = 500;
    
    //adjust the depth
    coin.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    //add each cloud to the group----------------------------------------
    coinGroup.add(coin);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width,height-220,10,40);    
    //generate random obstacles-------------------------------------------
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle2);
              break;
      case 2: obstacle.addImage(obstacle1);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
    }
        
    obstacle.velocityX = -(6 + 3*score/100);
    
    //assign scale and lifetime to the obstacle----------------------------           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group---------------------------------------
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  
  girl.changeAnimation("running",girl_running);
  girl.scale =0.3;
  
 
  
  score = 0;
  
}
