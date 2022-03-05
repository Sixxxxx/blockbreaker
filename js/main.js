    
    window.onload = function(){
        
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        
        var x = canvas.width/2;
        var y = canvas.height-30;
        var dx = 4;
        var dy = -4;
        
        var ballRadius = 10;
        
        var paddleHeight = 10;
        var paddleWidth = 150;
        var paddleX = (canvas.width-paddleWidth)/2;
        var brickColumnCount = 15;
        var brickRowCount = 10;
        var brickWidth = 75;
        var brickHeight = 20;
        var brickPadding = 10;
        var brickOffsetTop = 30;
        var brickOffsetLeft = 30;
        var bricks = [];

        for(var c=0; c<brickColumnCount; c++) {
            bricks[c] = [];
            for(var r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1};
            }
        }
        
        var rightPressed = false;
        var leftPressed = false;
        
        var score = 0;
        var lives = 3;
            
       

        addEventListeners();
        draw();

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            collisionDetection();
            gameMechanics();
            drawBricks();


            
            requestAnimationFrame(draw);
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
            
        function drawBricks() {
            for(var c=0; c<brickColumnCount; c++) {
                for(var r=0; r<brickRowCount; r++) {
                    if(bricks[c][r].status == 1) {

                        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                        var brickY = (c*(brickWidth+brickPadding))+brickOffsetTop;
                        bricks[c][r].y = brickY;
                        bricks[c][r].x = brickX;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#0095DD";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Score: "+score, 8, 20);
        }

        function drawLives() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Lives: "+lives, canvas.width-65, 20);
        }

        function collisionDetection() {
            for(var c=0; c<brickColumnCount; c++) {
                for(var r=0; r<brickRowCount; r++) {
                    var b = bricks[c][r];
                    if(b.status == 1) {
                        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score++;
  
                            if(score == brickRowCount*brickColumnCount) {
                                alert("YOU WIN, CONGRATULATIONS!");
                                document.location.reload();                                 
                            }
                        }
                    }
                }
            }
        }

        function gameMechanics(){
            x += dx;
            y += dy;
            
            if(x + dx > canvas.width - ballRadius || x + dx < 0) {
                dx = -dx;   
            }

            if(y + dy < ballRadius) {
                dy = -dy;
            } 
            else if(y + dy > canvas.height-ballRadius) {
                if(x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                
                    if (x > paddleX + 3 * paddleWidth/4 && dx < 0) {
                        dx = -dx;
                    }
                    else if(x < paddleX + paddleWidth/4 && dx > 0){
                        dx = -dx;
                    }
                }
                else{
                    lives--;
                    
                    if(!lives) {
                        alert("GAME OVER");
                        document.location.reload();
                    }
                    else {
                        x = canvas.width/2;
                        y = canvas.height-30;
                        dx = 4;
                        dy = -4;
                        paddleX = (canvas.width-paddleWidth)/2;
                    }
                }
            }
         
            if(rightPressed && paddleX < canvas.width-paddleWidth) {
               paddleX += 7;
            }
            else if(leftPressed && paddleX > 0) {
                paddleX -= 7;
            }    
        }

        function keyDownHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = true;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = false;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = false;
            }
        }

        function mouseMoveHandler(e) {
            var relativeX = e.clientX - canvas.offsetLeft;
            if(relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth/2;
            }
        }

        function addEventListeners(){
            document.addEventListener("keydown", keyDownHandler, false);
            document.addEventListener("keyup", keyUpHandler, false);
            document.addEventListener("mousemove", mouseMoveHandler, false);
        }    
    }


    

	
			
			