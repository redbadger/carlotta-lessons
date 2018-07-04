//Elements
var canvas = document.getElementById("canvas");
var buttonRed = document.getElementById("button-red");
var buttonBlue = document.getElementById('button-blue');
var buttonYellow = document.getElementById('button-yellow');

//Events
buttonRed.addEventListener("click", paintRed);
buttonBlue.addEventListener('click', paintBlue);
buttonYellow.addEventListener('click', paintYellow);

//Executions
function paintRed() {
  return (canvas.style.backgroundColor = "red");
}

function paintBlue() {
    return (canvas.style.backgroundColor = 'blue');    
}

function paintYellow() {
    return (canvas.style.backgroundColor = 'yellow');
}