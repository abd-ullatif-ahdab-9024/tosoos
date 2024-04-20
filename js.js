const gameBoard = document.querySelector("#gameBorder");
const ctx = gameBoard.getContext("2d");
const scoreElement = document.querySelector(".score");
const resetBtn = document.querySelector(".resetBtn");
const gameHieght = gameBoard.hieght;
const gameWidth = gameBoard.width;
const backgroundColor = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let x = unitSize;
let y = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
gameStart();

function gameStart() {
  running = true;
  scoreElement.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  } else {
    gameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, gameWidth, gameHieght);
}
function createFood() {
  function randomFood(min, max) {
    const random = Math.round((Math.random() * (max - min + min)) / unitSize) * unitSize;

    return random
  }

  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  const head = { x: snake[0].x + x, y: snake[0].y + y };
  snake.unshift(head);
  console.log(snake[0].x == foodX && snake[0].y == foodY);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreElement.textContent = score;
    createFood();
  } else {
    console.log(snake);
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function changeDirection(event) {
  const key = event.keyCode;
  const left = 37;
  const right = 39;
  const down = 40;
  const up = 38;
  const goingUp = y == -unitSize;
  const goingDown = y == unitSize;
  const goingLeft = y == -unitSize;
  const goingRight = y == unitSize;
  switch (true) {
    case key === left && !goingRight:
      x = -unitSize;
      y = 0;
      break;
    case key === right && !goingLeft:
      x = unitSize;
      y = 0;
      break;
    case key === up && !goingDown:
      x = 0;
      y = -unitSize;
      break;
    case key === down && !goingUp:
      x = 0;
      y = unitSize;
      break;
  }
  console.log(key);
}
function checkGameOver() {}
function gameOver() {}
function resetGame() {}
