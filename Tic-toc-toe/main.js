console.log("hellow");

// DECLARE SOME VARIABLE IN HERE 

const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

// make a btn here 
let board = ["", "", "", "", "", "", "", "", "", "", "", ""];
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

function updateBoard(index) {
    board[index] = currentPlayer;
}

function renderCell(cell, index) {
    cell.textContent = board[index];
}

function makeMove(cell, index) {
    updateBoard(index);
    renderCell(cell, inddex);
}

function isWiningMove() {
    return winingCondition.some(
        ([a, b, c]
        ) => {
            return board[a] && board[a] === board[b] && board[b] === board[c];
        });
}


function isDraw() {
    return board.every((cell) => cell !== "");
}

function updateStatus() {
    statusDiv.textContent = `it's ${currentPlayer}'s turn `;
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
}
function endGame(message) {
    isGameActive = false;
    statusDiv.textContent = message;
}

//evaluate game 
function evaluateGame() {
    if (isWiningMove()) {
        endGame(`Player ${currentPlayer} has won`);
    } else if (isDraw()) {
        endGame("Game endded in draw!")
    } else {
        switchPlayer();
    }
}


// function is valid of rnot 

function isValidMove(index) {
    return board[index] === "" && isGameActive;
}

function handleCellClick(e) {
    const clickedIndex = parseInt(e.target.getAttribute("data-index"));
    if (!isValidMove) {
        makeMove(e.target, clickedIndex);
    }
}