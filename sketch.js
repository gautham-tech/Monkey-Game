var PLAY =1;
var END;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;
var survivalTime = 0;

function preload(){ 
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,600);
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;

  
ground = createSprite(400,350,1200,10);
ground.velocityX = -10;
ground.x = ground.width/2;
console.log(ground.x);

  
foodGroup = new Group();
obstacleGroup = new Group();
}


function draw() {
background(255);
  
if(keyDown("space") && monkey.y >= 159){
   monkey.velocityY = -12;
}
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
if (ground.x < 0){
    ground.x = ground.width/2;
}
  
stroke("white");
textSize(20);
fill("white");
text("Score:"+score,500,50);

stroke("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate());
text("Survival Time:"+survivalTime,250,50);
  
monkey.collide(ground);
  
spawnObstacles();
spawnFood();
drawSprites(); 
}

function spawnFood(){
if (frameCount % 80 === 0) {
var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.debug = false;
    banana.lifetime = 100;
    foodGroup.add(banana);
    if(foodGroup.isTouching(monkey)){ 
       foodGroup.destroyEach();
       }
    
  }
}

function spawnObstacles(){
if (frameCount % 300 === 0) {
  var obstacle = createSprite(300,327,20,20);
   obstacle.x = Math.round(random(300,600));
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   obstacle.velocityX = -5;
   obstacle.lifetime = 100;
   obstacle.depth = monkey.depth;
   obstacleGroup.add(obstacle);
   
} 
}

