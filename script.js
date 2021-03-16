//Canvas setup



const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
let gamespeed = 10;
let score = 0;
let lives = 3;
let gameFrame = 0;
let gameOver = false;
ctx.font = "40px Georgia";
let Gui = function(){
  ctx.fillStyle = "orange";
  ctx.fillText("lives: " + lives, 10, 100);
  ctx.fillText("score: " + score, 10, 50);
  if (lives <= 0){
    bubblesArray.splice(0, bubblesArray.length);
    GameOver();
  }
};

//Mouse Interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
  x: canvas.width/2,
  y: canvas.height/2,
  click: false
}
canvas.addEventListener("mousemove", function(event){
  //mouse.click = true;
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
});
/*canvas.addEventListener("mouseup", function(){
  mouse.click = false;
});*/
//Player
const playerLeft = new Image();
playerLeft.src = "plane_left.png";
const playerRight = new Image();
playerRight.src = "plane_left_flip.png";
class Player{
  constructor(){
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.radius = 45;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }
  update(){
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    let theta = Math.atan2(dy, dx);
    this.angle = theta;
    if (mouse.x != this.x){
      this.x -= dx/200 * gamespeed;
    }
    if (mouse.y != this.y){
      this.y -= dy/20;
    }
  }
  draw(){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    if(this.x >= mouse.x){
      ctx.drawImage(playerLeft, 0-85, 0-70, this.spriteWidth/3, this.
      spriteHeight/3);
    }else{
      ctx.drawImage(playerRight, 0-85, 0-40, this.spriteWidth/3, this.
      spriteHeight/3);
    }
    ctx.restore();
  }
}
const player = new Player();
//bubbles
const bubblesArray = [];
const bubbleImage = new Image();
bubbleImage.src = "gold_coin.png"
class Bubble {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 50;
    this.speed = Math.random() * 5 + 5;
    this.distance;
    this.counted = false;
  }
  update(){
    this.y -= this.speed * gamespeed/10;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx*dx + dy*dy);
  }
  draw(){
    ctx.drawImage(bubbleImage, this.x-50, this.y-50, this.radius*2, this.radius*2);
  }
}

const bubblePop = document.createElement("audio");
bubblePop.src = "completetask_0.mp3";

function handleBubbles(){
  if (gameFrame % 50 == 0){
    bubblesArray.push(new Bubble());
  }
  for(let i = 0; i < bubblesArray.length; i++){
    bubblesArray[i].update();
    bubblesArray[i].draw();
    if(bubblesArray[i].y < 0 - bubblesArray[i].radius){
        bubblesArray.splice(i, 1);
        i--;
        lives--;
    } else if( bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
        if(!bubblesArray[i].counted){
          score++;
          bubblesArray[i].counted = true;
          bubblesArray.splice(i, 1);
          i--;
          bubblePop.play();
        }
    }
  }
}

//reapeating backgrounds
const backgrounds = new Image();
backgrounds.src = "farground_mountains.png";
const BG = {
  x1: 0,
  x2: 2048,
  y: 170,
  width: 2048,
  height: 330
}

function handleBackground(){
  BG.x1-= gamespeed;
  if (BG.x1 <= -BG.width) BG.x1 = BG.width;
  BG.x2-= gamespeed;
  if (BG.x2 <= -BG.width ) BG.x2 = BG.width;
  ctx.drawImage(backgrounds, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(backgrounds, BG.x2, BG.y, BG.width, BG.height);
}
//Enemies
const enemyImage = new Image();
enemyImage.src = "rocketforgame.png";

class Enemy {
  constructor(){
    this.x = canvas.width + 200;
    this.y = Math.random() *  (canvas.height - 150) + 90;
    this.width = 180;
    this.height = 40;
    this.speed = Math.random() * 2 + 2;
    this.frame = 0;
    this.frameY = 0;
    this.spriteWidth = 827;
    this.spriteHeight = 189;
  }
  draw(){
    ctx.drawImage(enemyImage, 0, this.frameY * this.spriteHeight,
    this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
  update(){
    this.x -= this.speed * gamespeed/10;
    if(this.x < 0 - this.width){
      this.x = canvas.width + 200;
      this.y = Math.random() *  (canvas.height - 150) + 90;
      this.speed = Math.random() * 2 + 2;
    }
    if (gameFrame % 5 == 0){
      this.frameY++;
      if (this.frameY == 3){this.frameY = 0;}
    }
    function clamp(min, max, value) {
      if(value < min){
        return min;
      }else if(value > max){
        return max;
      }else{
        return value;
      }
    }
    const dx2 = clamp(this.x, this.x + this.width, player.x) - player.x;
    const dy2 = clamp(this.y, this.y + this.height, player.y) - player.y;
    var distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    if(distance < player.radius){
      GameOver();
    }
  }
}
const enemy1 = new Enemy();
function handleEnemies(){
  enemy1.draw();
  enemy1.update();
}
function GameOver(){
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER, you reached score " + score, 110, 250);
  gameOver = true;
}
//animation loop
function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleBubbles();
  player.update();
  player.draw();
  handleEnemies();
  Gui();
  if(score < 0){score = 0}
  gameFrame++;
  if (gameFrame % 300 == 0){
    gamespeed++;
  }
  if(!gameOver) requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", function(){
  canvasPosition = canvas.getBoundingClientRect();
});
