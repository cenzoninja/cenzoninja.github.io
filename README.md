<!DOCTYPE html>

<html>

  <head>

    <title>Objects And Vars</title>

  </head>

  <body>
    <canvas id="canvas" width="960" height="960" style="border:1px solid lightgrey;">
    Your browser does not support the HTML5 canvas tag.
    </canvas>
    	<script>
	        const canvas = document.getElementById("canvas1");
		const ctx = canvas.getContext("2d");
		canvas.width = 960;
		canvas.height = 960;
		ctx.fillStyle = "red";
    		ctx.beginPath();
    		ctx.rect(this.x, this.y, this.width, this.height);
    		ctx.fill();
	</script>

  </body>

</html>
