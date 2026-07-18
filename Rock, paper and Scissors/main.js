// create a logic for button 

const buttons = document.querySelectorAll(".choices button");
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const winnerDisplay = document.getElementById("winner");
const choices = ["rock", "paper", "scissors"];
// list the categories of the rock, papaer and scissors. 

// alert("hi")


function getComputerChoice() {
    const randomIndex = Math.floor(
        Math.random() * choices.length
    );
    return choices[randomIndex];
}


function getWinner(user, computer) {
    if (user == computer) return "it is a tie";

    const winConditions = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper",
    };

    return winConditions[user] === computer ? "You win!" : "computer wins!";

}

function handleUserChoice(event) {
    const selectedButton = event.currentTarget;
    const userChoice = event.currentTarget.getAttribute("data-choice");
    const computerChoice = getComputerChoice();
    const winner = getWinner(userChoice, computerChoice);

    buttons.forEach((button) => button.classList.remove("is-selected"));
    selectedButton.classList.add("is-selected");
    animateChoice(selectedButton);
    updateUI(userChoice, computerChoice, winner);

}


function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function updateUI(userChoice, computerChoice, winner) {
    userChoiceDisplay.textContent = `Your choice: ${capitalize(userChoice)}`;
    computerChoiceDisplay.textContent = `Computer choice: ${capitalize(
        computerChoice
    )}`;
    winnerDisplay.textContent = `Result ${winner}`;

    [userChoiceDisplay, computerChoiceDisplay, winnerDisplay].forEach(
        playRevealAnimation
    );
}

function playRevealAnimation(element) {
    element.animate(
        [
            { opacity: 0, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 450, easing: "ease-out" }
    );
}

function animateChoice(button) {
    button.animate(
        [
            { transform: "scale(1) rotate(0deg)" },
            { transform: "scale(1.2) rotate(-5deg)", offset: 0.45 },
            { transform: "scale(0.95) rotate(3deg)", offset: 0.75 },
            { transform: "scale(1) rotate(0deg)" },
        ],
        { duration: 700, easing: "ease-out" }
    );
}


buttons.forEach(
    (button) => {
        button.addEventListener("click", handleUserChoice);
    }
);
