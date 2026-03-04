// we determine first holes in it. 

// collect all the hole elements (querySelector gives only one, we need the list)
const holes = Array.from(document.querySelectorAll(".hole")); // target all the holes in the html 
const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");

// for scoring the game we make tjhe logic here
let score = 0; 
let currentTime  = 30;  // timer is in for 30 seconds understand that . 
let moleTimer = null; 
let timerId = null; 
let gameRunning = false; 
let isPaused = false; 
// animal emojii should be inserted here get iit form the internet boy . 
// understand that. 
const animals = ["🐒","🦋","🐘","🦒","🐶","🐱","🦁","🐸","🐢"]; 


function getRandomItem(arr){
    return arr[Math.floor(Math.random()* arr.length)];
}

// for clearning the holes we make this code understand that. 
function clearHoles() {
    holes.forEach(hole => {
        hole.innerHTML = "";
        // clear any previous click handler (we use onclick property below)
        hole.onclick = null; 
    });
}

function updateTimeDisplay() {
    timeLeftDisplay.textContent = currentTime;          // current time means 30 seconds. 
}

function updateScore() {
    scoreDisplay.textContent = score;
}



// for starting the botton 
function enableStartButton() {
    startButton.disabled = false; 
    startButton.classList.remove("disabled");
}


function disableStartButton() {
    startButton.disabled = true; 
    startButton.classList.add(
    "disabled"
    );
}



// NOW THE MANIN LOGIC STARTS HERE. 

function handleAnimalClick(hole, animal){
    if (hole.innerHTML.includes(animal)) {
        score++;
        updateScore(); 
        hole.innerHTML = "";
    }
}


function showAnimalInRandomHole() {
    clearHoles(); 

    // holes is a NodeList, getRandomItem works with array-like objects
    const hole = getRandomItem(holes);
    const animal = getRandomItem(animals);

    // create span element to allow adding class for animation
    hole.innerHTML = `<span class="animal">${animal}</span>`;
    const span = hole.querySelector('span');
    // trigger transition
    setTimeout(() => span.classList.add('show'), 20);

    // assign handler via onclick so that clearHoles can easily remove it
    hole.onclick = () => handleAnimalClick(hole, animal);
}

// pause/resume control
function pauseGame() {
    if (!gameRunning) return;

    if (!isPaused) {
        // pause both movement and countdown
        stopCountdown();
        stopMoleMovement();
        pauseButton.textContent = "Resume";
        isPaused = true;
    } else {
        // resume
        startMoleMovement();
        startCountdown();
        pauseButton.textContent = "Pause";
        isPaused = false;
    }
}


function startMoleMovement() {
    moleTimer = setInterval(showAnimalInRandomHole, 700);
}


function stopMoleMovement() {
    clearInterval(moleTimer);
}



function startCountdown() {
    timerId = setInterval(()=> {
        currentTime--; 
        updateTimeDisplay(); 
        if (currentTime === 0 ) {
            endGame();
        }
    }, 1000);       // every one seconds divisialbe by one 
}


function stopCountdown() {
     clearInterval(timerId); 
}

function resetGame(){
    score = 0; 
    currentTime = 30; 
    updateScore(); 
    updateTimeDisplay();
    clearHoles();
}


function startGame() {
    if(gameRunning) return; 
    gameRunning = true; 

    disableStartButton(); 
    pauseButton.disabled = false;
    pauseButton.textContent = "Pause";
    isPaused = false;

    resetGame(); 
    startMoleMovement(); 
    startCountdown(); 

}

function endGame() {
    gameRunning = false; 
    stopCountdown(); 
    stopMoleMovement();
    clearHoles(); 
    enableStartButton(); 
    pauseButton.disabled = true;
    // giveing the final score
    alert(`Game Over! Final Score: ${score}`);
}

// initialize displays so they aren't empty on load
updateScore();
updateTimeDisplay();

startButton.addEventListener("click", startGame);

pauseButton.addEventListener("click", pauseGame);