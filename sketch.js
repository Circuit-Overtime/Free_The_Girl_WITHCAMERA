 //More changes will be made over time.
var over  = 0;
var start = 1;
var play = 2;
var gameState = start;
var arrownum = 50;
var gloonum = 6;

var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup, gloo;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage, winImage,looseImage, win ,loose ,guide , guideImage,prison, prisonImage, free, freeImage;


function preload(){
  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("hearts.png");
  green_balloonImage = loadImage("monsterfinal.png");
  pink_balloonImage = loadImage("monsterfinal1.png");
  blue_balloonImage = loadImage("monsterfinal3.png");
  winImage = loadImage("WIN-1.png");
  looseImage = loadImage("loose.png");
  guideImage = loadImage("guides.png");
  prisonImage = loadImage("prison.png");
  freeImage = loadImage("free-1.png");
  
}



function setup() {  
  createCanvas(490, 480);

  //creating background
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 2.5
  camera.on();
  // creating bow to shoot arrow
  bow = createSprite(470,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 2 ;
   hearts = 0;
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowGroup= new Group();
  glooGroup = new Group();
 
  win = createSprite(242,245, 480, 30);
  win.addImage(winImage);
  win.scale = 0.1;
  win.visible = false; 
  
  loose = createSprite(242,245,480,30);
  loose.addImage(looseImage);
  loose.scale = 0.1;
  loose.visible = false;
  
  guide = createSprite(242,245,480,30);
  guide.addImage(guideImage);
  guide.scale = 0.15;
  guide.visible = false;
  
  prison = createSprite(280, 445, 480,30);
  prison.addImage(prisonImage);
  prison.scale = 0.13;
  prison.visible = true;
  
  free = createSprite(280,445,480,30);
  free.addImage(freeImage);
  free.scale = 0.1;
  free.visible = false;
  
}

function draw() {
   
   camera.y = bow.y;
   if(gameState === start)
     {
        guide.visible = true;
       background.velocityX = -0;
      
       if(keyDown("space"))
         {
           gameState = play;
         }
         displaytext();
       
     }
  
  if(gameState === play)
    {
     
     guide.visible = false;
 //score = score + Math.round(frameCount/60);
      //moving bow
     bow.y = World.mouseY
  
        // moving ground
    background.velocityX = -3 

    if (background.x < 0){
      background.x = background.width/2;
    }   
      
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
    
  }
      //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 40 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }
  if(redB.isTouching(glooGroup))
    {
      //redB.destroyEach();
      score = score + 5;
    }
  if(greenB.isTouching(glooGroup))
    {
      greenB.destroyEach();
    }
  if(blueB.isTouching(glooGroup))
    {
      blueB.destroyEach();
    }
  if(pinkB.isTouching(glooGroup))
    {
      pinkB.destroyEach();
    }
  if(glooGroup.isTouching(arrowGroup))
    {
      glooGroup.destroyEach();
    }
      
      
  if (arrowGroup.isTouching(redB)) {
  redB.destroyEach();
  arrowGroup.destroyEach();
    score=score- 2;
}

if(redB.isTouching(bow))
  {
    score = score + 10;
    redB.destroyEach();
    hearts = hearts + 1;
  }


 if (arrowGroup.isTouching(greenB)) {
  greenB.destroyEach();
  arrowGroup.destroyEach();
  score=score+3;
}

  if(greenB.isTouching(bow))
  {
    score = score - 4;
    greenB.destroyEach();
  }


 if (arrowGroup.isTouching(blueB)) {
  blueB.destroyEach();
  arrowGroup.destroyEach();
  score=score+2;
}

 if(blueB.isTouching(bow))
  {
    score = score - 2;
    blueB.destroyEach();
    
  }

if (arrowGroup.isTouching(pinkB)) 
{
  pinkB.destroyEach();
  arrowGroup.destroyEach();
  score=score+1;
}

if(pinkB.isTouching(bow))
{
  score = score - 2;
  pinkB.destroyEach();
  
  
}
      
      
if(arrownum <= 0)
  {
      arrowGroup.destroyEach();
      arrowGroup.setLifetimeEach(-1);
      arrowGroup.setVelocityXEach(100);
      arrowGroup.setScaleEach(0.1);
      arrownum = Math.round(arrownum/100000000);
      score = score + 0;  
    if(keyDown("r"))
      {
        arrownum = 50;
      }
    
  }
   console.log(hearts)   
      
if(score <= 0 || hearts === 10)
{
    gameState = over;
}
      
}

        if(hearts === 10)
        {
           win.visible = true;
          free.visible = true;
          
        }
  if(score <= 0)
        {
          loose.visible = true;
        }
  
  
  
  if(keyDown("g"))
    {
      createGloowall();
    }
  if(gameState === over)
    {
      
      redB.setLifetimeEach = -1;
      greenB.setLifetimeEach = -1;
      blueB.setLifetimeEach = -1;
      pinkB.setLifetimeEach = -1;
      background.velocityX = 0;
      redB.destroyEach();
      greenB.destroyEach();
      blueB.destroyEach();
      pinkB.destroyEach();
  
      
    }
    

drawSprites();
 
  fill("white"); 
  text("Press G to make cover", 50,70);
  text("Press R to Reload Arrows", 50,90);
   text("Shoot Cover To Destroy It", 50,110);
   text("Press Space to Shoot", 360,430);
  text("Press Space to Start", 360,460);
  fill("blue")
  textSize(13)
   text("Do Not Allow Score To Go Below '0'", 50,130)
  fill("red");
  textSize(15)
   text("Do not Destroy The Hearts" , 50,440);
  textSize(15);
  text("Number Of Arrows Left:   " + arrownum, 50,50);
   text("No. Of Hearts Out Of 10: " + hearts, 50,460)
fill("black");
text("Score:  "+ score, 390, 50);
   
  //text("Game Is Over! Did You Use the Gloo Walls??", 150, 200);

}



function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 4;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);

}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)));
  blue.addImage(blue_balloonImage);
  blue.velocityX = 7;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);

}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 6;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);

  
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 5;
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 500;
  arrow.y=bow.y;
  arrow.velocityX = -6;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
  arrownum = arrownum - 1;
  
   
}
function createGloowall()
{
  var gloo = createSprite(bow.x - 70, bow.y, 10, 70);
  glooGroup.setLifetimeEach(20);
  glooGroup.add(gloo);
  console.log(glooGroup.lifetime);
  if(keyDown("d"))
    {
      glooGroup.destroyEach();
    }
}
function displaytext()
{
 
}
//More changes will be made over time.