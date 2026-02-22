// code

const circle = document.getElementById("circle"); // it will search element by id. 
const letterSpan = document.getElementById("letter");   // this is for letter 
const scoreCard = document.getElementById("scoreCard"); // score display element  // for getting the socre here. 

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let currentLetter = getRandomLetter(null); // at first it has no letter. 
letterSpan.textContent = currentLetter;

let score = 0; // global score variable 





// for getting random letter in it. 
function getRandomLetter(previous) {
    let newLetter; 

    do {
        newLetter = alphabets[Math.floor(Math.random() * alphabets.length)];
    } while(newLetter === previous);

    return newLetter; 
}

// function to update score - adds points for correct answer, deduces for incorrect
function updateScore(isCorrect) {
    if (isCorrect) {
        score += 10; // add 10 points for correct answer
    } else {
        score = Math.max(0, score - 5); // deduct 5 points for wrong answer, but score can't go below 0
    }
    updateScoreDisplay(); // update the score on screen
}

// function to update the score display in the DOM
function updateScoreDisplay() {
    scoreCard.innerHTML = `<span><br>  Score: ${score} </span>`;
}

 // creating a function for vfx thiat correct or not. 

 function flashColor(className){
    circle.classList.remove("correct","incorrect");
    circle.classList.add(className); // for adding the correct or not. 

    setTimeout(() =>{
        // for setting the effect we make  it.     
        circle.classList.remove(className)
    }, 500);        // thatis for 500 seconds we take it. 
 }


 // last methods ofr key pressed or strokes we make it. 

 function handleKeyPress(key) {
key = key.toLowerCase();    // it will still compare correct

if(!key.match(/^[a-z]$/)){
    flashColor("incorrect");
    return;
}

if (key === currentLetter.toLowerCase()) {
    flashColor("correct");
    updateScore(true); // update score for correct answer
    const newLetter = getRandomLetter(currentLetter);
    currentLetter = newLetter; 
    letterSpan.textContent = currentLetter; 
}   else {
    flashColor("incorrect");
    updateScore(false); // deduct score for incorrect answer
}


}

document.addEventListener("keydown", (e) => {
    handleKeyPress(e.key); // for pressing the keydown 
    // and easy to understand that . 
});



