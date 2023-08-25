// Define the Ball class
class Ball {
    // Constructor function to initialize a new Ball instance
    constructor(x, y) {
      this.xpos = x;
      this.ypos = y;
      this.xvel = 0;
      this.yvel = 0;
      this.xacc = 0;
      this.yacc = 0.4;
    }
  
    // Method to update the ball's position and velocity
  // Method to update the ball's position and velocity
update() {
    this.xpos += this.xvel;
    this.ypos += this.yvel;
    this.xvel += this.xacc;
    this.yvel += this.yacc;
  
    // Check if the ball has hit the ground
    if (this.ypos > height) {
      // If it has, reverse its direction and reduce its velocity
      this.ypos = height;
      this.yvel *= -0.8;
    }
  
    // Check if the ball has hit the right edge of the canvas
    if (this.xpos > width) {
      // If it has, reverse its direction and reduce its velocity
      this.xpos = width;
      this.xvel *= -0.8;
    }
  
    // Check if the ball has hit the left edge of the canvas
    if (this.xpos < 0) {
      // If it has, reverse its direction and reduce its velocity
      this.xpos = 0;
      this.xvel *= -0.8;
    }
  }
  
    // Method to draw the ball on the canvas
    draw() {
      push();
      translate(this.xpos, this.ypos);
      rotate(radians(this.xvel));
      fill(255, 0, 0);
      ellipse(0, 0, 20, 20);
      pop();
    }
  }
  
  // Create a new Ball instance
  let ball;
  
  function setup() {
    // Create the canvas
    createCanvas(600, 600);
  
    // Set the background color to red
    background(255, 70, 0);
  
    // Create a new Ball instance
    ball = new Ball(100, 0);
    ball.xvel = 5;
  }
  
  function draw() {
    // Clear the canvas
    clear();
  
    // Update the ball's state
    ball.update();
  
    // Draw the ball on the canvas
    ball.draw();
  }