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
    let secondsPassed;
    let rectY = 0;
    let rectX = 0;
    function init(){
        // Get a reference to the canvas
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        window.requestAnimationFrame(gameloop);
    };
    // game loop here
    function gameloop(timeStamp) {
    
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    
    fps = Math.round(1 / secondsPassed);
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, 750, 400);
    context.font = "25px Arial";
    context.fillStyle = '#006600';
    context.fillText("FPS: " + fps, 10, 30);
    
    update();
    draw();
    
    
    window.requestAnimationFrame(gameloop);
    };
    function update() {
        rectX += 60 / fps;
        rectY += 1;
    }
    function draw(){

    // Get a random color, red or blue
    let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';

    // Draw a rectangle
    context.fillStyle = randomColor;
    context.beginPath();
    context.arc(rectX, rectY, Math.random()*100, 0, 2 * Math.PI);
    context.strokeStyle = Math.random() > 0.5? '#ff8080' : '#0099b0';
    context.fill();
    context.lineWidth = 5;
    context.stroke();
    
    };
</script>
    </body>
</html>
