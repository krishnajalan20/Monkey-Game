var PLAY = 1;
var END =0;
var gameState = PLAY;

var monkey , monkey_running,monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground,groundImg,ground1;
var score,restart;

var SurvivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_stop = loadAnimation("sprite_0.png")
  groundImg = loadImage("p16.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  score = loadImage("restart.png");
}



function setup() {
   createCanvas(600, 500);
  
   //creating monkey
   monkey=createSprite(80,449,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addAnimation("stop",monkey_stop)
   monkey.scale=0.1
  
   ground = createSprite(0,250,900,10);
   ground.x=ground.width/2;
   ground.addImage(groundImg)
   ground.scale = 3;
  
   ground1 = createSprite(0,500,700,5);
   ground1.visible = false;

   restart = createSprite(300,270);
   restart.addImage(score);
   restart.scale = 0.7;
  
   FoodGroup = new Group();
   obstaclesGroup = new Group();

   score = 0;
}


function draw() {
  
   //background(255);
  if(gameState === PLAY){
    
    ground.velocityX=-4;
    restart.visible = false;
    monkey.changeAnimation("moving",monkey_running)
   SurvivalTime = SurvivalTime + Math.round(frameCount%40==0);
    
   if(SurvivalTime>0 && SurvivalTime%10 === 0){
     ground.velocityX = ground.velocityX-0.01;
    }
    
   if(ground.x<0) {
     ground.x=ground.width/2;
   }
 
   if(keyDown("space")&&monkey.y > 150) {
     monkey.velocityY = -12;
   }
  
   //adding gravity to  monkey
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground1); 
    
   spawnFood();
   spawnObstacles();
 if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach() 
   }
 
 if(obstaclesGroup.isTouching(monkey)){
    gameState = END;    
   }
  }
 else if (gameState === END){
     restart.visible = true;
     ground.velocityX = 0;
     monkey.velocityY = 0;
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
   
     monkey.changeAnimation("stop",monkey_stop);
    
     if(mousePressedOver(restart)){
       reset();
     }
   }
   drawSprites(); 
   stroke("black");
   textSize(20);
   fill("black");
   text("Survival Time: "+ SurvivalTime, 100,50);
}

function reset(){
 gameState = PLAY;
 SurvivalTime = 0;
 FoodGroup.destroyEach();
 obstaclesGroup.destroyEach();
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 100 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(170,400);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.1;
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 250 === 0) {
    obstacle = createSprite(600,480,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.2;
    //obstacle.debug = true
    obstacle.setCollider("circle",0,0,130)
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


