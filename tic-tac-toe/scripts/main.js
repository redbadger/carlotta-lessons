const cells = document.querySelectorAll(".js-cell");
let currentPlayer = "+";
let currentBoard = [null, null, null, null, null, null, null, null, null];
const winnerBoardContainer = document.getElementById(
  "js-winner-board-container"
);
const winnerBoard = document.getElementById("js-winner-board");
const clearButton = document.getElementById("js-clear-board");
const winnerPlayer = document.getElementById("js-winner-player");

const ANSWERS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Add event listerners
const start = () => {
  for (cell of cells) {
    cell.addEventListener("click", renderPlay);
  }
};

const removeWinnerBoard = () => {
  return winnerBoard.classList.remove("active");
};

const removeNodesContent = nodes => {
  for (node of nodes) {
    if (node.firstElementChild) {
      node.firstElementChild.remove();
    }
  }
};

const removeWinnerPlayer = () => {
  return (winnerPlayer.innerText = "");
};

const clearBoard = event => {
  event.preventDefault();
  start();
  removeWinnerBoard();
  removeNodesContent(cells);
  removeWinnerPlayer();
  currentPlayer = "+";
  currentBoard = [null, null, null, null, null, null, null, null, null];
};

clearButton.addEventListener("click", clearBoard);

const getPosition = element => {
  return Number.parseInt(element.dataset.cell, 10);
};

const changePlayer = player => {
  return player === "+" ? (currentPlayer = "o") : (currentPlayer = "+");
};

const showWinner = player => {
  const content = document.createTextNode(player);
  winnerPlayer.appendChild(content);
  winnerBoard.classList.add("active");
};

checkWinnerPlayer = player => {
  let winner = checkWin(currentPlayer);
  if (winner) {
    return showWinner(currentPlayer);
  }
  return changePlayer(currentPlayer);
};

const renderPlayer = element => {
  const span = document.createElement("span");
  const content = document.createTextNode(currentPlayer);
  span.appendChild(content);
  element.appendChild(span);
  checkWinnerPlayer(currentPlayer);
};

const fillBoard = position => {
  return (currentBoard[position] = currentPlayer);
};

const removeListener = element => {
  return element.removeEventListener("click", renderPlay);
};

const renderPlay = event => {
  const element = event.target;
  const position = getPosition(element);
  fillBoard(position);
  renderPlayer(element);
  removeListener(element);
};

const checkWin = player => {
  return ANSWERS.some(answer => {
    return answer.every(value => {
      return player === currentBoard[value];
    });
  });
};

start();
