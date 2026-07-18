


const wordE1 = document.getElementById("word");
const wrongGuessesE1 = document.getElementById("wrong-guesses");
const remainingEL = document.getElementById("remaining");
const keyboardE1 = document.getElementById("keyboard");
const resetBtn = document.getElementById("reset-btn");



const words = [
    "javascript",
    "sonu",
    "sister",
    "father",
    "monoscript",
    "algorithm",
    "kathmandu",
];

let selectedWord = "";
let guessesLetters = new Set();
let wrongGuesses = new Set();
const maxWrong = 6;

//function for gaming
// function init() {
//     selectedWord = words[
//         Math.floor(Math.random() * words.length)
//     ];
// }


function pickRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function isGameWon(word, guessedLetters) {
    return word.split("").every(
        (char) => guessedLetters.has(char)
    );
}

function isGameOver(wrongGuesses, maxWrong) {
    return wrongGuesses.size >= maxWrong;
}

// get nine guess then it ges wrong 
function getDisplayWord(word, guessedLetters) {
    return word.split("").map(
        (char) => (guessedLetters.has(char) ? char : "_")
    ).join(" ");
}

function renderWord(word, guessedLetters) {
    wordE1.textContent = getDisplayWord(word, guessedLetters);
}

function renderWrongGuesses(wrongGuesses) {
    wrongGuessesE1.textContent = Array.from(wrongGuesses).join(",");
}

// for remaining time join 
function renderRemainingGuesses(wrongGuesses, maxWrong) {
    remainingEL.textContent = maxWrong - wrongGuesses.size;
}
// disabled all the keys here. 
function disableAllKeys() {
    const keys = keyboardE1.querySelectorAll(".key");
    keys.forEach(
        (key) => {
            key.disabled = true;
            key.classList.add("disabled");
        }
    );
}

function disableKeybutton(button) {
    button.disabled = true;
    button.classList.add("disabled");
}

function handleCorrectGuess(letter, guessedLetters, word) {
    guessedLetters.add(letter);
    renderWord(word, guessedLetters);
    if (isGameWon(word, guessedLetters)) {
        alert("Congraluation! you won");
        disableAllKeys();
    }
}

function handleWrongGuess(letter, wrongGuesses, word, maxWrong) {
    wrongGuesses.add(letter);
    renderWrongGuesses(wrongGuesses);
    renderRemainingGuesses(wrongGuesses, maxWrong);
    if (isGameOver(wrongGuesses, maxWrong)) {
        alert(`You lost! The word was "${word}`);
        disableAllKeys();
    }
}

// for handling gudessing 

function handleGuess(letter, button, word, guessedLetters, wrongGuesses, maxWrong) {
    if (guessedLetters.has(letter) || wrongGuesses.has(letter)) {
        return;
    }

    if (word.includes(letter)) {
        handleCorrectGuess(letter, guessedLetters, word);
    } else {
        handleWrongGuess(letter, wrongGuesses, word, maxWrong);
    }
    disableKeybutton(button);
}

function createKeyboard(onKeyPress) {
    const layout = [
        ["q", "w", "e", "r", "t", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"],
    ];

    keyboardE1.innerHTML = "";
    layout.forEach((row) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("key-row");    // for adding key-row in it. 
        row.forEach((letter) => {
            const keyBtn = document.createElement("button");
            keyBtn.classList.add("key");
            keyBtn.textContent = letter;
            keyBtn.addEventListener("click", () => onKeyPress(letter, keyBtn));
            rowDiv.appendChild(keyBtn);

        })
        keyboardE1.appendChild(rowDiv);

    })

}

function initGame() {
    selectedWord = pickRandomWord(words);
    guessedLetters = new Set();
    wrongGuesses = new Set();

    renderWord(selectedWord, guessesLetters);
    renderWrongGuesses(wrongGuesses);
    renderRemainingGuesses(wrongGuesses, maxWrong);

    createKeyboard((letter, button) =>
        handleGuess(
            letter, button, selectedWord, guessesLetters, wrongGuesses, maxWrong
        )
    );
}

resetBtn.addEventListener("click", initGame);
initGame();
