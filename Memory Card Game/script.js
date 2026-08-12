// main logic lies here. 
import Card from "./Card.js";
import CardManager from "./CardManager.js";


const boardElement = document.getElementById("board");

const cardManager = new CardManager();
const row = 4;
const columns = 5;
let matches = 0;
let errors = 0;
let board = [];
let card1Selected = null;
let card2Selected = null;
let inputLocked = false;

function showGameCompleteManager() {
    alert(`Congratulations you matched all cards with ${errors} errors`);
}


function handleCardMatchCheck() {
    if (!card1Selected.equals(card2Selected)) {
        card1Selected.hide();
        card2Selected.hide();
        errors++;
        document.getElementById("errors").innerText = errors;
    } else {

        card1Selected.markAsmatched();
        card2Selected.markAsmatched();
        matches++;
        document.getElementById("matches").innerText = matches;
    }

    card1Selected = null;
    card2Selected = null;
    inputLocked = false;

    const totalPairs = (row * columns) / 2;
    if (matches === totalPairs) {
        setTimeout(showGameCompleteManager, 300);
    }
}

function selectedCard(card) {
    if (inputLocked || card.isRevealed() || card === card1Selected) return;
    card.reveal();
    if (!card1Selected) {
        card1Selected = card;
    }
    if (!card2Selected) {
        card2Selected = card;
        inputLocked = true;
        setTimeout(handleCardMatchCheck, 750);
    }
}


// for creating the function of cardd
function createCard(row, col) {
    const type = cardManager.drawCard();
    return new Card(row, col, type, selectedCard);
}

// it will great the row
function createRow(row, boardElement) {
    const rowList = [];
    for (let col = 0; col < columns; col++) {
        const card = createCard(row, col);
        // it will push the array 
        rowList.push(card);
        boardElement.append(card.element);
    }
    return rowList;
}

function buildBoard(boardElement) {
    for (let row = 0; row < rows; row++) {
        const rowList = createRow(row, boardElement);
        board.push(rowList);
    }
}

function startGame() {

}