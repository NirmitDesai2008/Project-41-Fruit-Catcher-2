var database, allPlayers;
var backgroundImage;
var player, form, game;
var player1, player2, players;
var fruits, fruitGroup;
var fruit1Image, fruit2Image, fruit3Image, fruit4Image, fruit5Image;
var playerImage;
var gameState = 0;
var playerCount = 0;

function preload(){
  backgroundImage = loadImage("images/jungle.jpg");
  playerImage = loadImage("images/basket.png");
  fruit1Image = loadImage("images/apple.png");
  fruit2Image = loadImage("images/banana.png");
  fruit3Image = loadImage("images/watermelon.png");
  fruit4Image = loadImage("images/orange.png");
  fruit5Image = loadImage("images/pineapple.png");
}

function setup(){
  createCanvas(1000,600);
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();

  fruitGroup = new Group(); 
}

function draw() {
  background(backgroundImage);
  
  if (playerCount === 2){
    game.update(1);
  }
  
  if (gameState === 1){
    clear(); 
    game.play();
  }

  if (gameState === 2){ 
    game.end();
  }
}