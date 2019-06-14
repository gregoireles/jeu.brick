var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var stopGame = false;
var ball = null;
var paddle = null;

document.addEventListener("keydown", keyRight);
document.addEventListener("keyup", keyLeft);

function resetBallAndPaddle() {
  ball = {
    radius: 8,
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 2,
    dy: -2
  };
  paddle = {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2
  };
}

function keyRight(evt) {
  if (evt.code == "ArrowRight" && paddle.x < canvas.width - paddle.width) {
    paddle.x += 27;
  }
}

function keyLeft(evt) {
  if (evt.code == "ArrowLeft" && paddle.x > 0) {
    paddle.x -= 27;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(
    paddle.x,
    canvas.height - paddle.height,
    paddle.width,
    paddle.height
  );
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function bounceBall() {
  if (
    ball.x + ball.dx < ball.radius ||
    ball.x + ball.dx > canvas.width - ball.radius
  ) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius)
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    }
}

function endGame() {
  var modal = document.querySelector(".modal-container");
  modal.style.display = "block";
  setTimeout(() => document.location.reload(true), 3000);
}

class Brick {
  constructor(brickX, brickY, brickWidth, brickHeight) {
    this.x = brickX;
    this.y = brickY;
    this.width = brickWidth;
    this.height = brickHeight;
  }
  drawBrick() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

var allBricks = [];
function createBrick() {
  var x1 = -60;
  var x2 = -60;
  var x3 = -60;
  var x4 = -60;
  var x5 = -60;
  for (let i = 0; i < 40; i++) {
    if (i < 4) {
      allBricks[i] = new Brick((x1 += 112), 0, 40, 15);
    } else if (i < 16) {
      allBricks[i] = new Brick((x2 += 62), 50, 45, 15);
    } else if (i < 24) {
      allBricks[i] = new Brick((x3 += 62), 100, 45, 15);
    } else if (i < 28) {
      allBricks[i] = new Brick((x4 += 110), 150, 45, 15);
    } else if ([i] < 29) {
      allBricks[i] = new Brick((x5 += 280), 200, 45, 15);
    }
  }
}
createBrick();

function drawAllBricks() {
  allBricks.forEach(oneBrick => {
    oneBrick.drawBrick();
  });
}

function collision(ball, brick) {
  return (
    ball.x > brick.x &&
    ball.x < brick.x + brick.width &&
    ball.y <= brick.y + brick.height &&
    ball.y > brick.y
  );
}

function checkCollision() {
  for (let i = 0; i < allBricks.length; i++) {
    if (collision(ball, allBricks[i])) {
      ball.dy = -ball.dy;
      allBricks.splice(i, 1);
      countScore();
    }
  }
}

function winRound() {
  if (allBricks.length === 0) {
    var content = document.querySelector(".modal-container");
    var text = document.querySelector(".modal-text");
    text.innerHTML = "NiCE 0NE - WEL0ME 0NB0ARD 0_R SPACESHiP,";
    content.style.display = "block";
    setTimeout(() => document.location.reload(true), 3000);
  }
}

function score() {
  var score1 = document.querySelector(".score");
  score1.innerHTML = `SC0RE: ${count}`;
}
var count = 0;
function countScore() {
  count++;
}

var life = 3;
function myLife() {
  var life3 = document.querySelector(".life");
  life3.innerHTML = `LIFE: ${life}`;
}

function lifeCount() {
  if (ball.y >= 395) {
    console.log(ball.y >= 395);
    life--;
    myLife();
    resetBallAndPaddle();
  }
  if (life === 0) {
    stopGame = true;
    console.log("oh noooo");
    endGame();
  }
}

// -----------------DRAW FUNCTION------------------//

function draw() {
  if (stopGame) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  bounceBall();
  ball.x += ball.dx;
  ball.y += ball.dy;
  drawAllBricks();
  drawPaddle();
  checkCollision();
  score();
  lifeCount();
  winRound();
}
resetBallAndPaddle();
setInterval(() => draw(), 10);

//-----------------LEVEL2------------------//
