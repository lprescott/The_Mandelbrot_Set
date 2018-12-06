function setup() {

  //w is the windows width, h is the height
  var w = window.innerWidth
  var h = window.innerHeight

  //Full sized canvas
  createCanvas(w, h);
  pixelDensity(1);
  loadPixels();

  //This nested for-loop touches every pixel
  for(var x = 0; x < width; x++){
    for(var y = 0; y < height; y++){

      //The maximum number of iterations to the below loop
      var maxIterations = 100;

      //a + bi
      var a = map(x, 0, width, -2, 2);
      var b = map(y, 0, height, -2, 2);

      //Temp vars
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
        if(abs(a + b) > 16) {
          break;
        }

        n++;
      }

      var brightness = 200; //background, set diverges
      if(n === maxIterations){ //foreground, set converges
        brightness = 0;
      }

      //Assigne all pixels to brightness
      var pix = (x + y * width) * 4;
      pixels[pix + 0] = brightness;
      pixels[pix + 1] = brightness;
      pixels[pix + 2] = brightness;
      pixels[pix + 3] = 255;

    }
  }
  updatePixels();
}

function draw() {
  // put drawing code here
}