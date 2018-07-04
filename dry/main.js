//Elements
var canvas = document.getElementById("canvas");
// var buttonRed = document.getElementById("button-red");
// var buttonBlue = document.getElementById("button-blue");
// var buttonYellow = document.getElementById("button-yellow");

var buttons = document.getElementsByClassName("js-button");

// Events
for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", addClass);
}

//Execution
// function paintRefactored(event) {
//   var color = event.path[0].innerText;
//   paint(color);
// }

// function paint(color) {
//   return (canvas.style.backgroundColor = color);
// }

function addClass(event) {
  var color = event.path[0].innerText;
  canvas.classList = "";
  canvas.classList.add(color);
}

// The following is the "WET code"

//Events
// buttonRed.addEventListener("click", paint(buttonRed.innerText));
// buttonBlue.addEventListener("click", paintBlue);
// buttonYellow.addEventListener("click", paintYellow);

//Executions
// function paintRed() {
//   return (canvas.style.backgroundColor = "red");
// }

// function paintBlue() {
//   return (canvas.style.backgroundColor = "blue");
// }

// function paintYellow() {
//   return (canvas.style.backgroundColor = "yellow");
// }
