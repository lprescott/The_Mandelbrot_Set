/*
  @author: lprescott 
  https://github.com/lprescott/
*/

// Initialized global variables
var scalar = 5;           // The initial value of zoom speed modifier
var xTranslate = 5;       // The initial value of x-axis zoom speed
var controlsWidth = 150;  // The width of the left bar.
var running = true;       // Boolean affecting runtime
var fps = 10;             // The speed of the animation in frames/second.


// Declared global variables
var height;
var width;
var speedSlider;
var xoffset;
var yoffset;
var yTranslate; 

// These variables affect the red green blue coloring of the
// sketch
var redshift;
var greenshift;
var blueshift;

function setup() {

  // Set height and width of sketch
  height = innerHeight;
  width = innerWidth-controlsWidth;

  // Creates a canvas element in the document, and 
  // sets the dimensions of it in pixels. 
  // createCanvas(): https://p5js.org/reference/#/p5/createCanvas
  canvas = createCanvas(width, height);
  canvas.position(controlsWidth, 0);
  canvas.style('z-index', '-1');

  pixelDensity(1);

  // Label for speed slider
  createDiv('&nbsp;Zoom speed:');
  // Slider for speed
  speedSlider = createSlider(0.5, 1, 0.99, 0.001);

  // Number of iterations
  createDiv('<br>&nbsp;Num. of iterations:');
  iterations = createSlider(0,1000,20,10);

  // x offset
  createDiv('<br><br>&nbsp;x-Offset:');
  xoffset = createSlider(-1,1,-0.805,0.01);

  // y offset
  createDiv('<br>&nbsp;y-Offset:');
  yoffset = createSlider(-250,250,0,1);

  // red
  createDiv('<br><br>&nbsp;Red:');
  redshift = createSlider(-1,1,1,.1);

  // green
  createDiv('<br>&nbsp;Green:');
  greenshift = createSlider(-1,1,1,.1);

  // blue
  createDiv('<br>&nbsp;Blue:');
  blueshift = createSlider(-1,1,1,.1);

  // Controls
  createDiv('<br><br>&nbsp;Controls:'); 
  createDiv('&nbsp;- SPACE: stop');

  // Initialize yTranslate (zoom speed)
  yTranslate = (height / 2 - width / 2) - yoffset.value();
}

function draw() {

  // This allows for a pause feature, see function keyPressed()
  if(!running) return;

  //The maximum number of iterations to the below loop
  var maxIterations = iterations.value();

  // Set yTranslate (zoom speed)
  yTranslate = (height / 2 - width / 2) + yoffset.value();

  loadPixels();
  //This nested for-loop touches every pixel
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      //a + bi
      var a = map(x, 0 + xTranslate, width + xTranslate, -scalar, scalar);
      var b = map(y, 0 + yTranslate, width + yTranslate, -scalar, scalar);

      //Temp var
      var tempA = a;
      var tempB = b;

      //Calculate real-components of each iteration
      var n = 0 //count variable

      while (n < maxIterations) {

        //Calculating components of next iterations:
        //(a + bi) * (a + bi)
        //a^2 + abi + abi + b^2 * i^2
        //a^2 + 2abi - b^2
        //a^2 - b^2 + 2abi

        var a_component = a * a - b * b;
        var b_component = 2 * a * b;

        //A is set to the calculated component + the previous value
        a = a_component + tempA;
        b = b_component + tempB;

        //Does the iteration diverge?
        if (a * a + b * b > 16) {
          break;
        }

        n++;
      }

      // Find RGB values
      var red = map(sin(n * 0.25), -1, 1, 0, 145);
      var green = map(cos(n * 0.25), -1, 1, 170, 0);
      var blue = map(sin(n * 0.25), -1, 1, 150, 0);

      // Set pixel color
      var pix = (x + y * width) * 4;
      pixels[pix + 0] = red * redshift.value();
      pixels[pix + 1] = green * greenshift.value();
      pixels[pix + 2] = blue * blueshift.value();
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();

  //Update zoom, and xTranslate zoom speed
  scalar *= speedSlider.value();
  xTranslate = (1 / scalar) * (width * -xoffset.value());
}

// The keyPressed() function is called once every time a key is 
// pressed. 
function keyPressed() {

  // Play/pause on space
  if (keyCode == 32 ) {
    running = false;
  } 
}

// The mousePressed() function is called once after every time 
// a mouse button is pressed over the element. .
function mousePressed() {
  scale(2);
}
