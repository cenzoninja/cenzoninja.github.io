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

    function init(){
        // Get a reference to the canvas
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        window.requestAnimationFrame(gameloop);
    };
    // game loop here
    function gameloop(timeStamp) {
    
    
    sencondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    
    
    fps = Math.round(1 / secondsPassed);
    
    context.fillStyle = '006600';
    context.fillText("FPS: " + fps, 10, 30);
    
    draw();
    
    window.requestAnimationFrame(gameloop);
    };
    function draw(){

    // Get a random color, red or blue
    let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';

    // Draw a rectangle
    context.fillStyle = randomColor;
    context.beginPath();
    context.arc(Math.random()*750, Math.random()*400, Math.random()*150, 0, 2 * Math.PI);
    context.strokeStyle = Math.random() > 0.5? '#ff8080' : '#0099b0';
    context.fill();
    context.lineWidth = 5;
    context.stroke();
    
    };
</script>
    </body>
</html>
