// variabler
let bird;
let pipes = [];
let birdimg;
let pipeimg;
let genstarttæller = 0;
let pipeimg2;
let background2;
let gameover = false;
let score = 0;
let highscore = 0;
let startGame = false;

// indlæser billeder som vi bruger til vores spil
function preload() {
  birdimg = loadImage('media/flappybird-animation.gif');
  pipeimg = loadImage("media/pipe-bottom.png");
  pipeimg2 = loadImage("media/pipe-top.png");
  background2 = loadImage("media/background.png");

  // henter den tidligere highscore, ved brug af || operatoren 
  highscore = localStorage.getItem('HighScore') || 0;
}


function setup() { // setup funktion
  createCanvas(1496, 894); // laver en canvas
  frameRate(300); // frames pe

  bird = new Bird();
  /*
  jeg opretter en ny instans af Bird klassen ved hjælp af new Bird()
  og i bund og grund et nyt fugleobjekt med sit eget sæt af egenskaber og metoder, der er defineret af Bird klassen
  */
}

// Generalle funktion til at tegne
function draw() {
  // loader vores baggrunds billede s
  background(background2);

  if (!startGame) {
    // viser vores start menu, altså selve teksten
    textAlign(CENTER);
    textSize(64);
    fill(255,255,114);
    text("Flappy Bird Prog B", width / 2, height / 2 - 50);
    textSize(32);
    text("Tryk på mellemrum for at starte", width / 2, height / 2 + 50);

    // hvis vi trykker mellemrum så starter den spillet, ved at sætte vores variabel til true
    if (keyIsPressed && key == ' ') {
      startGame = true;
    }
  } else if (!gameover) { // en betingelse som tjekker om spillet er ovre !gameover og hvis den er sand så køre denne kode
    


    for (let i = pipes.length - 1; i >= 0; i--) { // en "løkke" der tjekker alle pipes/rør i spille, jeg har gjort det så den starter bagfra, istedet for forfra
      pipes[i].show(); // viser vores rør
      pipes[i].update();// opdatere rørs position osv.

      // hvis fuglen rammer et rør så er der gameover, jeg bruger hits funktionen som tjekker hvis fuglen har kollidere med et rør
      if (pipes[i].hits(bird)) {
        gameover = true;
        UpdatehighScore(); // ændre vores highscore med denne funktion
      }


      // hvis et rør er ude for vores canvas, skal den ødelegge røret, og give os et score
      if (pipes[i].offscreen()) { // jeg bruger offscreen, som er et p5 funktion der tjekker hvis noget er ude for canvas
        pipes.splice(i, 1); // i er positionen der skal fjernes, og 1 er antallet der skal fjernes fra vores array pipes
        score++;
      }

    }

  
    bird.update();// Opdatere positionen af fuglen
    bird.show(); // viser fuglen

    if (frameCount % 180 == 0) {
      pipes.push(new Pipe()); // Pusher et nyt rør hver 200 frames
    }

    // Viser score
    textSize(32);
    fill(41 ,81,47);
    text("Score: " + score, 74, 30);
    text("Forsøg: " + genstarttæller, 87, 71); 

  } else {
    // Viser teksten om spillet er slut
    textAlign(CENTER);
    textSize(64);
    fill(255, 0, 0);
    text("Spillet Er Slut", width / 2, height / 2);
    text("Score: " + score, width / 2, height / 2 + 85);
    text("Genstart: " + genstarttæller, 87, 71); 

    // viser highscore
    textSize(32);
    fill(0,150,0);
    text("Højeste Score: " + highscore, width / 2, height / 2 + 123);
    text("Genstarte: " + genstarttæller, width / 2, height / 2 + 160);

    // starter vores spil forfra, med vores genstartspil funktion
    if (keyIsPressed) {
      genstartspil();
    }
  }
}

// hvis vi trykker mellemrum, så flyver fuglen
function keyPressed() {
  if (key == ' ' && !gameover) {
    bird.up();
  }
}

// opdatere highscoren, gemmer den i vores local storage så den kan huske det efter et game er over
function UpdatehighScore() {
  if (score > highscore) { // hvis vores nye score er er højere end vores highscore 
    highscore = score; // opdatere highscoren
    localStorage.setItem('Highscore', highscore); // gemmer highscoren
  }
}

// genstartspil funktion
function genstartspil() {
  // sætter alle variablerne tilbage som de startede ud med
  pipes = [];

  bird = new Bird();
  score = 0;

  gameover = false;
  genstarttæller++;

  startGame = false;
}
