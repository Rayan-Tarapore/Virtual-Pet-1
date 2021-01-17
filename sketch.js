//Create variables here
var dog,happyDog,foodS,foodStock
var database
var dogSprite
function preload()
{
  //load images here
  dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  foodS = 20;
  dogSprite = createSprite(250,250,20,20);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.3;
}


function draw() {  
  background(46, 139, 87);

  fill("black");
  textSize(15);
  text("Press UP ARROW to Feed the DOG",130,400);
  text("FOOD LEFT : "+foodS,200,420);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  if(keyWentDown(UP_ARROW)&&foodS>0){
   foodS = foodS-1;
   writeStock(foodS);
   dogSprite.addImage(happyDog);
  }

  drawSprites();
  //add styles here

}

function readStock(data){
foodS = data.val();
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
  }
