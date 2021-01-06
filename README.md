<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>lazer battle</title>
    </head>
    <body>
        <canvas id="canvas" width="750" height="400" style="border:1px solid lightgrey;">
        Your browser does not support the HTML5 canvas tag.
        </canvas>
        
        <script>
    "use strict";
    let canvas;
    let context;
    window.onload = init;
    let oldTimeStamp;
    let fps;
    let timePassed = 0;
    let secondsPassed;
    let rectY = 0;
    let rectX = 0;
    function init(){
        // Get a reference to the canvas
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        window.requestAnimationFrame(gameloop);
    };
    
    class GameObject
    {
        constructor (context, x, y, vx, vy){
            this.context = context;
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            
            this.isColliding = false;
        }
    }
    class Square extends GameObject
        {
    
        static width = 50;
        static height = 50;
    
        constructor (context, x, y, vx, vy){
            super(context, x, y, vx, vy);
        }
        function update(secondsPassed) {
            this.x += this.vx * secondsPassed;
            this.y += this.vy * secondsPassed;
        }
    
        function draw(){
            // Draw a rectangle
            this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
            this.context.fillRect(this.x, this.y, Square.width, Square.height);
        }
    }
    let gameObjects;

    function createWorld(){
        gameObjects = [
            new Square(context, 250, 50, 0, 50),
            new Square(context, 250, 300, 0, -50),
            new Square(context, 150, 0, 50, 50),
            new Square(context, 250, 150, 50, 50),
            new Square(context, 350, 75, -50, 50),
            new Square(context, 300, 300, 50, -50)
        ];
    }
   function gameloop(timeStamp) {
    
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
        secondsPassed = Math.min(secondsPassed, 0.1);
        fps = Math.round(1 / secondsPassed);
    
        for (let i = 0; i < gameObject.length; i++){
            gameObjects[i].update(secondsPassed);
        }
        
        context.fillStyle = 'white';
        context.fillRect(0, 0, 750, 400);
        context.font = "25px Arial";
        context.fillStyle = '#006600';
        context.fillText("FPS: " + fps, 10, 30);
    
        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].draw();
        }
    
        window.requestAnimationFrame(gameloop);
    } 
    
</script>
    </body>
</html>
