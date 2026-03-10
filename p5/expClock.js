/*
 * Title: Internet Art project#2
 * Author: Christian Lewis
 * Date: SP 2026
 * Simple Description: Simple time based program
 * Instructions: Program has several frames it can be set to, "m" will set the clock to 11:59 pm, "e" to 5:30 pm, "d" to 7:20 am, "s" sets to 1:00 pm, and "r" resets the program.
 */

let numHours; //global variable so functions can change them
let numMinutes; //global variable so functions can change them

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(120);

  numHours = hour(); //variable to hold the current hour
  let outerRadius = width / 5; //sets radius of hour ring
  let hourSize = 70; //sets the size of the shapes in the hour ring
  let o = color("orange"); //beginning color to hour ring
  let p = color("purple"); //ending color to hour ring
  let gradeHour = 0; //hour gradient

  numMinutes = minute(); //variable to hold the current minute
  let innerRadius = width / 7; //sets the radius of the minute ring
  let minuteSize = 20; //sets the size of the minute shape
  let b = color(0); //beginning color to minute ring
  let w = color(255); //ending color to minute ring
  let gradeMin = 0; //minute gradient

  keyPressed(); //function for setting the time manually

  push(); //so the rotates and translates of each circle don't interfere with eachother
  translate(width / 2, height / 2); //so rotate works properly
  rotate(frameCount * 0.0005); //slow and steady clockwise roation
  for (let i = 0; i < numHours; i++) {
    let color = lerpColor(o, p, gradeHour); //goes from orange to purple
    fill(color); //filles the hours shapes with the gradient color
    let angle = (TWO_PI / numHours) * i; //divides the circle into the necessary amount of "sections"
    let x = -cos(angle) * outerRadius; //begins the circle on the "left"
    let y = +sin(angle) * outerRadius; //draws the shapes counter-clockwise
    if (i < 12) {
      circle(x, y, hourSize);
    } else {
      rectMode(CENTER);
      square(x, y, hourSize);
    }
    gradeHour += 1 / numHours + 0.01; //iterates the gradient
  }
  pop();

  push(); //so the rotates and translates of each circle don't interfere with eachother
  translate(width / 2, height / 2); //so rotate works properly
  rotate(frameCount * -0.0015); //slightly faster counter-clockwise rotation
  for (let i = 0; i < numMinutes; i++) {
    let color = lerpColor(b, w, gradeMin); //black to white gradient
    fill(color); //fills in the gradient
    let angle2 = (TWO_PI / numMinutes) * i; //divides the circle into the necessary amount of "sections"
    let x2 = +cos(angle2) * innerRadius; //begins the circle to  the "right"
    let y2 = +sin(angle2) * innerRadius; //moves it clockwise
    ellipse(x2, y2, minuteSize, minuteSize / 2);
    gradeMin += 1 / numMinutes + 0.01; //iterates the gradient
  }
  pop();
}

function keyPressed() {
  if (key === "m") {
    numHours = 23;
    numMinutes = 59; //sets the clock to 11:59 or "midnight"
  }

  if (key === "r") {
    numHours = hour();
    numMinutes = minute(); //resets the clock to the actual time
  }

  if (key === "e") {
    numHours = 17;
    numMinutes = 30; //sets the clock to 5:30
  }

  if (key === "d") {
    numHours = 7;
    numMinutes = 20; //sets the clock to 7:20 or "dawn"
  }

  if (key === "s") {
    numHours = 13;
    numMinutes = 0; //sets the clock to 5:00
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); //insurances that the canvas is the correct size
}
