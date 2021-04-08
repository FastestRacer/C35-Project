//Create variables here
var dog, happyDog, dogImage, happyDogImage;
var foodS, foodStock;;
var database;


function preload()
{
	//load images here
  dogImage = loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImage);
  dog.scale = 0.2

  
  
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
  }

  textSize(20);
  fill(255);
  text("Note: Press Up Arrow to feed Drago milk",50,50);
  text("FoodStock: "+ foodS, 180,150);

  if(foodS === 0){
    foodS = 20;
  }

  drawSprites();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  });
}


function readStock(data){
  foodS = data.val();
}




