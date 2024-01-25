

function Pipe() {
    this.mellemrum = 200;// spredningen mellem rør
    this.top = random(height / 6, 3 / 4 * height); // øverste rør, position ændring, men skal være i canvas
    this.bottom = height - (this.top + this.mellemrum); // nederste rør beregnet ud fra toppen og mellemrummet 
    this.x = width;// bredde af vores rør
    this.w = 85; 
    this.speed = 6; // hastighed af vores rør
  
    this.highlight = false; // debug kode, for at teste hvis fuglen rammer røret
  
    this.hits = function(bird) { // tjekker hvis fuglen rammer røret
      if (bird.y < this.top || bird.y > height - this.bottom) { // tjekker om fuglens y værdi er enten || over eller under røret
        if (bird.x > this.x && bird.x < this.x + this.w) { // Hvis fuglens y værdi passer, tjekker den om fuglens x værdi er inden for rørets bredde
          this.highlight = true; // Hvis begge betingelser er sande er der highlight
          return true; // returner sandt, siden der er en kollision
        }
      }
      this.highlight = false; // Hvis der ikke er kollision er der ingen highlight
      return false;// returner falsk da der ikke er nogen collision
    } 
  
    this.show = function() {
      fill(0,0,0); // røret bag billedet skal være sort
      if (this.highlight) {
        fill(0,0, 0);
      }
      rect(this.x, 0, this.w, this.top); // det usynlige rør fra toppen 
      rect(this.x, height - this.bottom, this.w, this.bottom); // det usynlige rør fra bunden 
      image(pipeimg,this.x, height - this.bottom, this.w, this.bottom); //det synlige billede rør fra bunden 
      image(pipeimg2,this.x, 0, this.w, this.top)//det synlige billede rør fra toppen 

    }
  
    this.update = function() { // opdatere hastigheden
      this.x -= this.speed;
    }
  
    this.offscreen = function() { // checker hvis røret er ude for x
      if (this.x < -this.w) { // Tjekker om rørets x værdi er mindre end den negative bredde af røret
        return true; // returner sand hvis røret er udenfor skærmen
      } else {
        return false; // returner falsk hvis røret stadig er synligt på skærmen
      }
    }
  
  
  }