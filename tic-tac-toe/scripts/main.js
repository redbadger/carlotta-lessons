const gridItems = document.querySelectorAll(".js-board-item");
let currentPlayer = "x";
let board = [null, null, null, null, null, null, null, null, null];
const winnerBoard = document.getElementById("js-winner-board");
const winnerPlayer = document.getElementById("js-winner-player");
const clearButton = document.getElementById("js-clear-button");
const ANSWERS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
];

const togglePlayer = player => {
  player === "x" ? (currentPlayer = "o") : (currentPlayer = "x");
};

const removeEventListener = element => {
  element.removeEventListener("click", handleGridItemClick);
};

const renderCurrrentPlayer = element => {
  const text = document.createTextNode(currentPlayer);
  element.appendChild(text);
  togglePlayer(currentPlayer);
};

const moveToBoard = position => {
  board[position] = currentPlayer;
};

const checkWin = player => {
  return ANSWERS.some(answer => {
    return answer.every(value => {
      return player === board[value];
    });
  });
};

const checkWinner = player => {
  const winner = checkWin(player);
  if (winner) {
    winnerPlayer.innerText = player;
    winnerBoard.classList.remove("winner-board");
  }
};

const handleGridItemClick = event => {
  const position = event.target.dataset.cell;
  moveToBoard(position);
  checkWinner(currentPlayer);
  renderCurrrentPlayer(event.target);
  removeEventListener(event.target);
};

gridItems.forEach(gridItem => {
  gridItem.addEventListener("click", handleGridItemClick);
});

const clearHtmlBoard = () => {
  gridItems.forEach(gridItem => {
    gridItem.innerText = "";
  });
};

const clearBoard = () => {
  board = [null, null, null, null, null, null, null, null, null];
  clearHtmlBoard();
  currentPlayer = "x";
};

clearButton.addEventListener("click", clearBoard);
