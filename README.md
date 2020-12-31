<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>New webpage</title>
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

    function init(){
        // Get a reference to the canvas
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');

        draw();
    }
    
    function draw(){

    // Get a random color, red or blue
    let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';

    // Draw a rectangle
    context.fillStyle = randomColor;
    context.fillRect(100, 50, 200, 175);
    }
</script>
    </body>
</html>
