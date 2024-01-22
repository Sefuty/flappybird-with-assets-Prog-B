let bird;
let pipes = [];
let birdimg;
let pipeimg;
let pipeimg2;
let gameOver = false;
let background2;

function preload() {
  birdimg = loadImage('media/flappybird-animation.gif');
  pipeimg = loadImage("media/pipe-bottom.png");
  pipeimg2 = loadImage("media/pipe-top.png");
  background2 = loadImage("media/background.png")
}

function setup() {
  createCanvas(1450, 900);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(background2);


  if (!gameOver) {
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        gameOver = true;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.update();
    bird.show();

    if (frameCount % 200 == 0) {
      pipes.push(new Pipe());
    }
  } else {
    textAlign(CENTER);
    textSize(64);
    fill(255, 0, 0);
    text("Game Over", width / 2, height / 2);
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}