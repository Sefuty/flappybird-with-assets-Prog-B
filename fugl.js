function Bird() {
  this.y = height/2; // startposition i y retning som jeg har sat til i mellem
  this.x = 64; // startposition i x retningen

  this.gravity = 0.2; // tyngdekraften  på fuglen
  this.lift = -8; // kraften når fuglen hopper opad
  this.velocity = 0.0; // Fuglens hastighed i y

  // viser fuglen
  this.show = function() {
      image(birdimg, this.x, this.y);
  }

  // en funktion for at få fuglen til at hoppe opad
  this.up = function() {
      this.velocity += this.lift;
  }

  // funktion til at opdatere fuglens position og hastighed ved hjælp af update
  this.update = function() {
      this.velocity += this.gravity; // tyngdekraften der påvirker hastigheden
      this.y += this.velocity; // opdaterer fuglens y position baseret på hastighed

      // begrænsning af fuglens position for at forhindre, at den går uden for vores canvas
      if (this.y > height) {
          this.y = height;
          this.velocity = 0;
      }

      if (this.y < 0) {
          this.y = 0;
          this.velocity = 0;
      }
  }
}
