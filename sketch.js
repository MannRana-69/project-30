const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground, Lwall, Rwall;
var bridge;
var stones = [];

function preload() {
  zombie1 = loadImage("zombie1.png")
  zombie2 = loadImage("zombie2.png")
  zombie3 = loadImage("zombie3.png")
  zombie4 = loadImage("zombie4.png")
 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base (0,height-10,width,10);
  Lwall = new Base (130,height/2,600,100);
  Rwall = new Base (width-200,height/2,600,100);
  bridge = new Bridge (30,{x:300,y:height/2});
  joinPoint = new Base (width-500,height/2,40,10)
  Matter.Composite.add(bridge.body, joinPoint);
  joinLink = new Link(bridge, joinPoint);

  for(var i=0; i<=9; i++) {
    var x = random(width/2 - 200, width/2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }
  zombie = createSprite(width /2, height - 110);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4.zombie3);
  zombie.scale=0.1;
  zombie.velocityX = 10;

  brealButton = createButton("");
  breakButton.position(width-200,height /2-50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(51);
  Engine.update(engine);

  ground.show();
  Lwall.show();
  Rwall.show();
  bridge.show();

  for(var stone of stones) {
    stone.show();
  }
  drawSprites();
}

function handleButtonPress() {
  jointLink.detach();
  setTimeout(() => {
      bridge.breakButton();
  }, 1500);
}
