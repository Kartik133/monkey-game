var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;
var PLAY = 1;
var END = 2;
var gameState = PLAY;
var rand;
var time = 0;

function preload(){
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
}

function draw() {
  background("white");
  
  textSize(20);
  stroke(10);
  text("Survival Time : " + time,150,20);
  
      if(ground.x<0){
       ground.x = ground.width/2;
      }
  if(gameState===PLAY){
    obstacles();
    food();
  
    if(keyDown("space")) {
     monkey.velocityY = -15;
     time = Math.ceil(frameCount/frameRate());
    }
  }
    
    monkey.velocityY = monkey.velocityY + 0.6;
  
    monkey.collide(ground);
      
   if(monkey.isTouching(obstacleGroup)){
     gameState = END;
     foodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
   }
   
  drawSprites();
}

function obstacles() {
  if(World.frameCount%120===0){
   obstacle = createSprite(400,318);
   obstacle.addImage("stone",obstacleImage);
   obstacle.scale = 0.15;
   obstacle.velocityX = -4;
   obstacle.lifetime = 200;
   obstacle.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
   obstacleGroup.add(obstacle);
  }
}

function food() {
  if(World.frameCount%100===0){
    banana = createSprite(400,rand = Math.round(random(100,200)));
    banana.addAnimation("banana",bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 200;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    foodGroup.add(banana);
  }
}