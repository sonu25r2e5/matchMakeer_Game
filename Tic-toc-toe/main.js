console.log("hellow");

// DECLARE SOME VARIABLE IN HERE 

const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

// make a btn here 
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winingCondition = [
    [0, 1, 2],    // STRAIGHT LINE 
    [3, 4, 5],    // STRAIGHT LINE 
    [6, 7, 8],    // ONE CONDITION STRAGIHT LINE 
    [0, 3, 6],      // STRIGHT LINE IN DOWN DIRECTION 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  // CROSS SECTION OF BAR 
    [2, 4, 6],
];

// update the board data array with the current player's symbol
function updateBoard(index) {
    board[index] = currentPlayer;
}

// update the clicked cell's visible text using the board state
function renderCell(cell, index) {
    cell.textContent = board[index];
}

// perform a move: update board data and render the clicked cell
function makeMove(cell, index) {
    updateBoard(index);
    renderCell(cell, index);
}

// check whether the current board contains any winning line
function isWiningMove() {
    return winingCondition.some(([a, b, c]) => {
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

// check whether all board cells are filled without a winner
function isDraw() {
    return board.every((cell) => cell !== "");
}

// show the current player's turn in the status area
function updateStatus() {
    statusDiv.textContent = `it's ${currentPlayer}'s turn `;
}

// switch between player X and O, then update the status text
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
}

// end the game and display a final message
function endGame(message) {
    isGameActive = false;
    statusDiv.textContent = message;
}

// evaluate the board after a move and decide win/draw/next player
function evaluateGame() {
    if (isWiningMove()) {
        endGame(`Player ${currentPlayer} has won`);
    } else if (isDraw()) {
        endGame("Game endded in draw!")
    } else {
        switchPlayer();
    }
}

// validate that the clicked cell is empty and the game is still running
function isValidMove(index) {
    return board[index] === "" && isGameActive;
}

// handle a cell click: make a move and evaluate the game
function handleCellClick(e) {
    const clickedIndex = parseInt(e.target.getAttribute("data-index"));
    if (!isValidMove(clickedIndex)) return;
    makeMove(e.target, clickedIndex);
    evaluateGame();
}

// reset the board and game state for a new round
function resetGame() {
    board = Array(9).fill("");
    isGameActive = true;
    currentPlayer = "X";
    cells.forEach((cell) => (cell.textContent = ""));
    updateStatus();
}

// attach click listeners to cells and the reset button
function attachEventListeners() {
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    resetBtn.addEventListener("click", resetGame);
}

// initialize the game when the page loads
function initializeGame() {
    attachEventListeners();
    updateStatus();
}

initializeGame(); 