// This file contains the main game logic for the Flap Bird game.
// It initializes the game, handles user input, updates the game state, and renders the game on the canvas.

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const marioImage = new Image();
marioImage.src = 'assets/mario.png';

let frameCount = 0;
let bird;
let gravity = 0.6;
let lift = -15;
let isGameOver = false;
let pipes = [];
let score = 0;

function setup() {
  bird = new Bird();
  pipes.push(new Pipe());
  document.addEventListener("keydown", handleKeyPress);
  requestAnimationFrame(gameLoop);
}

function handleKeyPress(event) {
  if (event.code === "Space" && !isGameOver) {
    bird.up();
  }
}

function gameLoop() {
  if (!isGameOver) {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  } else {
    displayGameOver();
  }
}

function update() {
  frameCount++;
  bird.update();
  if (frameCount % 75 === 0) {
    pipes.push(new Pipe());
  }
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      score++;
    }
    if (pipes[i].hits(bird)) {
      isGameOver = true;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bird.show();
  for (let pipe of pipes) {
    pipe.show();
  }
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function displayGameOver() {
  ctx.fillStyle = "red";
  ctx.font = "40px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  ctx.font = "20px Arial";
  ctx.fillText(
    `Final Score: ${score}`,
    canvas.width / 2 - 70,
    canvas.height / 2 + 30
  );
}

class Bird {
  constructor() {
    this.y = canvas.height / 2; // Corrigido aqui
    this.x = 50;
    this.velocity = 0;
    this.width = 34; // Width of Mario character
    this.height = 24; // Height of Mario character
  }

  up() {
    this.velocity += lift;
  }

  update() {
    this.velocity += gravity;
    this.y += this.velocity;
    if (this.y > canvas.height) {
      isGameOver = true;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  show() {
        ctx.drawImage(marioImage, this.x, this.y, this.width, this.height);
    }
}

class Pipe {
  constructor() {
    this.top = Math.random() * (canvas.height / 2);
    this.bottom = Math.random() * (canvas.height / 2);
    this.x = canvas.width;
    this.width = 50;
    this.highlight = false;
  }

  update() {
    this.x -= 2;
  }

  offscreen() {
    return this.x < -this.width;
  }

  hits(bird) {
    if (bird.x + bird.width > this.x && bird.x < this.x + this.width) {
      if (
        bird.y < this.top ||
        bird.y + bird.height > canvas.height - this.bottom
      ) {
        this.highlight = true;
        return true;
      }
    }
    return false;
  }

  show() {
    ctx.fillStyle = this.highlight ? "red" : "green";
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
}

setup();
