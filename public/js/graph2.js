


let canvasWidth = 500;
let canvasHeight = 800;


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(30); // set the frame rate to 30 frames per second
}

let x = canvasWidth/2; // initialize the x position of the circle
let y = 100;
let tmp = 0;

function draw() {

    background(220); // clear the background on each frame  
    fill(255, 0, 0); // set the fill color to red

    circle(x, y , 50); // draw a circle at the current x position

    y += 1; // increment the x position for the next frame

    if (y > canvasHeight) { // if the circle reaches the edge of the canvas
        y = 100; // reset the x position to the left edge
    }
    console.log(y)
}

