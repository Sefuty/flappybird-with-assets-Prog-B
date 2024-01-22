

function Pipe() {
    this.mellemrum = 200;
    this.top = random(height / 6, 3 / 4 * height);
    this.bottom = height - (this.top + this.mellemrum);
    this.x = width;
    this.w = 85;
    this.speed = 4;
  
    this.highlight = false;
  
    this.hits = function(bird) {
      if (bird.y < this.top || bird.y > height - this.bottom) {
        if (bird.x > this.x && bird.x < this.x + this.w) {
          this.highlight = true;
          return true;
        }
      }
      this.highlight = false;
      return false;
    } 
  
    this.show = function() {
      fill(0,0,0);
      if (this.highlight) {
        fill(0,0, 0);
      }
      rect(this.x, 0, this.w, this.top);
      rect(this.x, height - this.bottom, this.w, this.bottom);
      image(pipeimg,this.x, height - this.bottom, this.w, this.bottom);
      image(pipeimg2,this.x, 0, this.w, this.top)

    }
  
    this.update = function() {
      this.x -= this.speed;
    }
  
    this.offscreen = function() { // checker hvis røret er ude for x
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
  
  
  }