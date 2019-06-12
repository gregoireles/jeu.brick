var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ball = {
  radius: 8,
  x: canvas.width / 2,
  y: canvas.height - 30,
  dx: -2,
  dy: -2
};

var paddle = {
  height: 10,
  width: 75,
  x: (canvas.width - 75) / 2
};

document.addEventListener("keydown", keyRight);
document.addEventListener("keyup", keyLeft); //le mettre dans un set interval

// ----------------------------------------------- //

function keyRight(evt) {
  //console.log(canvas.width);
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
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  if (
    ball.x + ball.dx < ball.radius ||
    ball.x + ball.dx > canvas.width - ball.radius
  ) {
    ball.dx = -ball.dx;
  }
  if (
    ball.y + ball.dy < ball.radius ||
    ball.y + ball.dy > canvas.height - ball.radius
  ) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius)
    if (ball.x > paddle.x && ball.x <= paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      var modal = document.querySelector(".modal");
      modal.style.display = "block";
      setTimeout(() => document.location.reload(true), 3000);
    }
  drawPaddle();
  ball.x += ball.dx;
  ball.y += ball.dy;
}

setInterval(draw, 10);
/*

drawAllBrick();
checkCollision();

var imageSrc = "./fissure-brique.jpg";
var allBricks = [];
for (let i = 0; i < 3; i++) {
  allBricks[i] = new Image();
  allBricks[i].src = imageSrc;
  allBricks[i].onload = function() {
    ctx.drawImage(this, 0, 0, 40, 20);
  };
}

console.log(allBricks[0]);

drawAllBrick = () => {
  var x = -85;
  var y = -50;
  for (let i = 0; i < allBricks.length; i++) {
    ctx.drawImage(allBricks[i], (x += 85), 50, 60, 20);
    // if (5 < i <= 10) {
    //   ctx.drawImage(allBricks[i], (y += 50), 50, 60, 20);
    // }
    // if (11 < i <= 17) {
    //   ctx.drawImage(allBricks[i], (y += 15), 100, 60, 20);
    // }
  }
};

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
      console.log("YES");
    }
  }
}
*/
