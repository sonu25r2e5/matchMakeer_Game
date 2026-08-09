// DOM references for the two game boards, UI status elements, and controls
const playerBoardE1 = document.getElementById("player-board");
const aiBoardE1 = document.getElementById("ai-board");
const statusE1 = document.getElementById("status");
const resetButton = document.getElementById("reset-button");
const fullscreenButton = document.getElementById("fullscreen-button");
const commentaryE1 = document.querySelector("#commentary");
const celebrationE1 = document.getElementById("celebration");
const playAgainButton = document.getElementById("play-again-button");
const maybeLaterButton = document.getElementById("maybe-later-button");
const infoToggle = document.getElementById("info-toggle");
const gameDescription = document.getElementById("game-description");

// Game configuration constants
const gridSize = 10;
const numShips = 2;

// Runtime state variables
let playerShipPositions = [];
let aiShipPositions = [];
let gameOver = false;

// Update the status line with how many enemy ships are left to hit
function updateStatus() {
    const remainingShips = aiShipPositions.length;
    statusE1.textContent = `Ships to fire: ${remainingShips}/${numShips}`;
}

// Show the win celebration overlay and animate confetti
function showCelebration() {
    if (!celebrationE1) return;
    celebrationE1.classList.remove("hidden");
    commentaryE1.textContent = "Congratulations! You sank the enemy fleet. Would you like to play again?";
    const colors = ["#ff5e5e", "#ffd23f", "#5ee6ff", "#8d6bff", "#2bd37b"];
    for (let i = 0; i < 26; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.style.left = `${Math.random() * 90 + 5}%`;
        piece.style.top = `${Math.random() * 20 + 5}%`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = `${1.2 + Math.random() * 0.8}s`;
        piece.style.animationDelay = `${Math.random() * 0.35}s`;
        celebrationE1.appendChild(piece);
    }
    setTimeout(() => {
        celebrationE1.querySelectorAll(".confetti-piece").forEach((piece) => piece.remove());
    }, 2200);
}

// Hide the win celebration and clean up any remaining confetti pieces
function hideCelebration() {
    if (!celebrationE1) return;
    celebrationE1.classList.add("hidden");
    celebrationE1.querySelectorAll(".confetti-piece").forEach((piece) => piece.remove());
}

// Render the board labels for a given board prefix (player or AI)
function renderLabels(prefix) {
    const rowContainer = document.getElementById(`${prefix}-labels-row`);
    const colContainer = document.getElementById(`${prefix}-labels-col`);

    // A - J labels across the top like a chess board
    for (let i = 0; i < gridSize; i++) {
        const label = document.createElement("div");
        label.textContent = String.fromCharCode(65 + i);
        rowContainer.appendChild(label);
    }

    // 1 - 10 labels down the side like a chess board
    for (let i = 0; i < gridSize; i++) {
        const label = document.createElement("div");
        label.textContent = i + 1;
        colContainer.appendChild(label);
    }
}

// Create the grid cells for a board and wire AI cells to the player click handler
function initBoard(boardE1, isAI = false) {
    boardE1.innerHTML = "";
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        if (isAI) {
            cell.addEventListener("click", playerTurn);
        }
        boardE1.appendChild(cell);
    }
}

// Randomly choose non-overlapping ship locations for a board
function placeMultipleShips() {
    const positions = new Set();
    while (positions.size < numShips) {
        positions.add(Math.floor(Math.random() * gridSize * gridSize));
    }
    return Array.from(positions);
}

// Check whether the cell has already been hit or missed
function isCellTriad(cell) {
    return cell.classList.contains("hit") || cell.classList.contains("miss");
}


function getRandomAvailableIndex(boardE1) {
    let index, cell;
    while (true) {
        index = Math.floor(Math.random() * gridSize * gridSize);
        cell = boardE1.children[index];
        if (!isCellTriad(cell)) {
            return { index, cell };
        }
    }
}


// for making it we place here
// Mark a cell as a hit and show the appropriate commentary text
function markHit(cell, coord, isPlayer = false) {
    cell.classList.add("hit");
    const message = isPlayer ? `Enemy fired at ${coord} and hit!` : `You fired at ${coord} and hit!`;
    commentaryE1.textContent = message;
}

// Mark a cell as a miss and show the appropriate commentary text
function markMiss(cell, coord, isPlayer = false) {
    cell.classList.add("miss");
    const message = isPlayer ? `Enemy fired at ${coord} and missed!` : `You fired at ${coord} and missed!`;
    commentaryE1.textContent = message;
}

function checkWinCondition(positions, isPlayer = false) {
    if (positions.length === 0) {
        gameOver = true;
        if (isPlayer) {
            statusE1.textContent = "You lose!";
            commentaryE1.textContent = "The enemy sank your ships. Try again?";
        } else {
            statusE1.textContent = "You win!";
            showCelebration();
        }
        return true;
    }
    return false;
}



// function for index we placed here. 
// Convert a numeric index into board coordinates like A0, B4, etc.
function indexToCoordString(index) {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    return String.fromCharCode(65 + col) + row;
}

// AI makes a random shot at the player's board
function aiTurn() {
    if (gameOver) return;
    const { index, cell } = getRandomAvailableIndex(playerBoardE1);
    const coord = indexToCoordString(index);

    if (playerShipPositions.includes(index)) {
        markHit(cell, coord, true);
        playerShipPositions = playerShipPositions.filter((pos) => pos !== index);
        checkWinCondition(playerShipPositions, true);
    } else {
        markMiss(cell, coord, true);
    }
}



// Handle player clicks on the hidden AI board
function playerTurn(event) {
    if (gameOver) return;
    const index = parseInt(event.target.dataset.index);
    const cell = event.target;
    if (isCellTriad(cell)) return;

    const coord = indexToCoordString(index);
    const isHit = aiShipPositions.includes(index);

    // On miss, let the AI take its turn
    if (!isHit) {
        markMiss(cell, coord);
        aiTurn();
        return;
    }

    // On hit, remove the ship and update status
    markHit(cell, coord);
    aiShipPositions = aiShipPositions.filter((pos) => pos !== index);
    updateStatus();
    checkWinCondition(aiShipPositions);
}

// Start a fresh game by resetting board state and placing new ships
function startGame() {
    hideCelebration();
    gameOver = false;
    commentaryE1.textContent = "";

    initBoard(playerBoardE1);
    initBoard(aiBoardE1, true);

    playerShipPositions = placeMultipleShips();
    aiShipPositions = placeMultipleShips();
    updateStatus();

    playerShipPositions.forEach((pos) => {
        playerBoardE1.children[pos].classList.add("ship");
    });
}

// Reset button starts a new game immediately
resetButton.addEventListener("click", startGame);
playAgainButton?.addEventListener("click", () => {
    hideCelebration();
    startGame();
});

maybeLaterButton?.addEventListener("click", () => {
    hideCelebration();
    commentaryE1.textContent = "Game over. Click Restart Game to play again.";
});

if (fullscreenButton) {
    fullscreenButton.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {
                commentaryE1.textContent = "Fullscreen is not available in this browser.";
            });
        } else {
            document.exitFullscreen();
        }
    });
}

if (infoToggle && gameDescription) {
    infoToggle.addEventListener("click", () => {
        const isHidden = gameDescription.hasAttribute("hidden");

        if (isHidden) {
            gameDescription.removeAttribute("hidden");
            infoToggle.setAttribute("aria-expanded", "true");
            infoToggle.textContent = "Hide game description";
        } else {
            gameDescription.setAttribute("hidden", "true");
            infoToggle.setAttribute("aria-expanded", "false");
            infoToggle.textContent = "About this game";
        }
    });
}

renderLabels("player");
renderLabels("ai");
startGame();