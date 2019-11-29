/*
Example of sending text to a model in RunwayML

Generate an image from text with AttnGAN using RunwayML, https://runwayml.com/
Make sure the model is running in RunwayML before submitting text!

Note: RunwayML automatically stops running models after 10 minutes of inactivity.
If this happens you might see "TypeError" in the console.

p5.js reference for HTTP POST request: https://p5js.org/reference/#/p5/httpPost
*/

let myInput, button, myText, generatedImage;
let song;
let lyrics;
var timetrack;
var counter = 0;
var seconds, minutes;


function setup() {
  createCanvas(1000, 1000);

  // create an input field
  myInput = createInput();
  frameRate(60);
  lyrics = loadStrings('assets/painkiller.txt');
  song = loadSound('assets/painkiller.mp3')
  // when you type, call a function to send the input to AttnGAN
  myInput.input(txt2img);
  setInterval(timeIt, 1000);
  // create a button to clear the input field
  button = createButton('clear').mousePressed(clearInput);
}


function txt2img() {
  // store the value of the input field to draw it on the canvas later
  myText = myInput.value();

  // the path to send data to RunwayML, see Network tab > Routes > POST ->
  const path = "http://localhost:8000/query";

  // format the data to send to RunwayML, see Network tab > Input Specification
  const data = {
    caption: myText
  };

  // make a HTTP POST request to model in RunwayML
  httpPost(path, 'json', data, gotImage, gotError);
}


// callback for when RunwayML returns the generated image
function gotImage(data) {
  // console.log(data);

  // get the image according to AttnGAN's Output Specification
  // and store it in a variable
  generatedImage = createImg(data.result);

  // hide it from the DOM because we'll draw it on the canvas
  generatedImage.hide()
}


// callback if there is an error
function gotError(error) {
  console.error(error);
}


// clear the input field so it's ready for new text
function clearInput() {
  myInput.value('');
}


function draw() {
  background(220);

  // draw the image on the canvas with the input text
  if (generatedImage) {
    imageMode(CENTER);
    image(generatedImage, width / 2, height / 2);

    textSize(24)
    textAlign(CENTER, CENTER);
    text(myText, width / 2, height * 0.85);
  }

}


function timer(){

  if(counter < 500){
    counter++;
    }
minutes = floor(counter / 60);
seconds = counter % 60;

}
