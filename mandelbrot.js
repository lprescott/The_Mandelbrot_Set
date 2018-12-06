var minSlider;
var maxSlider;

//w is the windows width, h is the height
var w = window.innerWidth
var h = window.innerHeight

function setup() {
  //Full sized canvas
  createCanvas(w, h);
  pixelDensity(1);

  //Sliders to zoom with
  minSlider = createSlider(-2.5, 0, -2.5, 0.01);
  maxSlider = createSlider(0, 2.5, 2.5, 0.01);
}

function draw() {

  //The maximum number of iterations to the below loop
  var maxIterations = 100;

  loadPixels();
  //This nested for-loop touches every pixel
  for(var x = 0; x < width; x++){
    for(var y = 0; y < height; y++){

      //a + bi
      var a = map(x, 0, width, minSlider.value(), maxSlider.value());
      var b = map(y, 0, height, minSlider.value(), maxSlider.value());

      //Temp var
      var tempA = a;
      var tempB = b;

      //Calculate real-components of each iteration
      var n  = 0 //count variable

      while (n < maxIterations){

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
        if(a * a + b * b > 16) {
          break;
        }

        n++;
      }

      //background, set diverges:
      var brightness = map(n, 0, maxIterations, 0, 1);
      brightness = map(sqrt(brightness), 0, 1, 0, 255);


      //foreground, set converges:
      if(n == maxIterations){ 
        brightness = 0;
      }

      //Assign all pixels to brightness
      var pix = (x + y * width) * 4;
      pixels[pix + 0] = brightness;
      pixels[pix + 1] = brightness;
      pixels[pix + 2] = brightness;
      pixels[pix + 3] = 255;

    }
  }
  updatePixels();
}