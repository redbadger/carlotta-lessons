const gridItems = document.querySelectorAll(".js-board-item");
let currentPlayer = "x";

const togglePlayer = player => {
  // if (player === "x") {
  //   return (currentPlayer = "o");
  // } else {
  //   return (currentPlayer = "x");
  // }

  // if (player === "x") {
  //   return (currentPlayer = "o");
  // }
  // return (currentPlayer = "x");

  player === "x" ? (currentPlayer = "o") : (currentPlayer = "x");
};

const renderCurrrentPlayer = element => {
  const text = document.createTextNode(currentPlayer);
  element.appendChild(text);
  togglePlayer(currentPlayer);
};

const handleGridItemClick = event => {
  const position = event.target.dataset.cell;
  renderCurrrentPlayer(event.target);
};

gridItems.forEach(gridItem => {
  gridItem.addEventListener("click", handleGridItemClick);
});
