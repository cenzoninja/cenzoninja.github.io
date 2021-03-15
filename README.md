<DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Plane Turn</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <canvas id="canvas1"></canvas>
    <script>const canvas = document.getElementById("canvas1");
		const ctx = canvas.getContext("2d");
		canvas.width = 960;
		canvas.height = 960;
		ctx.fillStyle = "red";
    		ctx.beginPath();
    		ctx.rect(this.x, this.y, this.width, this.height);
    		ctx.fill();</script>
  </html>
