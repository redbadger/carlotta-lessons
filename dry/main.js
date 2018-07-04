//Elements
var buttonRed = document.getElementById("button-red");
var canvas = document.getElementById("canvas");

//Events
buttonRed.addEventListener("click", paintRed);

//Executions
function paintRed() {
  return (canvas.style.backgroundColor = "red");
}
