x = 0;
y = 0;

var screen_width = 0;
var screen_height = 0;
var speak_data = "";

draw_apple = "";
var apple = "";

var to_number = 0;

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number = Number(content);
  
    if(Number.isInteger(to_number)){
      speak_data = "Started drawing apple";
      draw_apple = "set";
    }
    else{
      speak_data = "The speech has not recognized a number";
    }
}

function setup() {
screen_width = window.innerWidth;
 screen_height= window.innerHeight;
canvas = createCanvas(screen_width,screen_height - 150);
canvas.position(0,150);
}
function preload(){
  apple = loadImage("apple.png")
  
}

function draw() {
  if(draw_apple == "set")
  {
    for(var i = 1; i <= to_number; i++){
      x = Math.floor(Math.random() * screen_width - 50);
      y = Math.floor(Math.random() * screen_height);
     image(apple,x,y,50,50);
     
     }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
   
    speak_data = to_number + "Apples Drawn";

    speak();


   

  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
