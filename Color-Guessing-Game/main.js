const rgbDisplay = document.getElementById("rgbDisplay");
const choicesContainer = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

let correctColor = " ";
let gameOver = false; 

function getRandomColor() {
    const red = Math.floor(
        Math.random() * 256     // for red color balue
    );

    const green = Math.floor(
        Math.random() * 256
    );

    const blue = Math.floor(
        Math.random() * 256
    );


    return `rgb(${red}, ${green}, ${blue})`;


}


// for randomize function 

function randomize(array){
    return array.sort(
        () => Math.random() - 0.5 );
}


// generating the random color in it. 

function generateChoices(correct, total=6){
    const choices = [correct];
    while (choices.length < total) {
        const color = getRandomColor();
        if(!choices.includes(color)) choices.push(color);
    }
    return randomize(choices); 
}


function showFeedback(message, color) {
    feedback.textContent = message; 
    feedback.style.color = color; 
}


function disableAllBoxes() {
    document.querySelectorAll(".color-box").forEach((el) => {
        el.style.pointerEvents = "none"; // for selecting the all one . 
    });
}


function enableAllBoxes() {
    document.querySelectorAll(".color-box").forEach(
        (el) => {
            el.style.pointerEvents = "auto"; 
        }
    );
}


// for clicking the boxes here 
function handleBoxClick(selectedColor) {
    if(gameOver) return; 

    if(selectedColor !== correctColor ) {
        showFeedback("Try again!", "#FF0000");
        return;
    }

    // for correct answer 
    showFeedback("Correct! yuppee man", "#98FB98")
    disableAllBoxes();
    gameOver = true; 
}


// crating the 6 box here. 
function createColorBox(color) {
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color; 
    box.onclick = () => handleBoxClick(color);
    return box; 
}


// reseting the state here. okay buddy. 
function resetGameState( ) {
    feedback.textContent = " ";
    feedback.style.color = "" ;
    choicesContainer.innerHTML = "";
    gameOver = false; 

}


function renderChoices(choices) {
    choices.forEach(
        (color) => {
            const box = createColorBox(color);
            choicesContainer.appendChild(box);
        }
    );
}

// rendering the game here includes here understand thhat. 

function renderGame() {
 resetGameState(); // for reseting the game 
 correctColor = getRandomColor(); 
 rgbDisplay.textContent = correctColor; 

 const choices = generateChoices(correctColor, 6); // 6 times in a row and column 
 renderChoices(choices); 
}

nextBtn.onclick = () => {
    enableAllBoxes(); 
    renderGame(); 
};

renderGame(); 