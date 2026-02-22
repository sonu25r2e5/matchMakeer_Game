// code

const circle = document.getElementById("circle"); // it will search element by id. 
const letterSpan = document.getElementById("letter");   // this is for letter 

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let currentLetter = getRandomLetter(null); // at first it has no letter. 
letterSpan.textContent = currentLetter;


// gor getting random leteter in it. 
function getRandomLetter(previous) {
    let newLetter; 

    do {
        newLetter = alphabets[Math.floor(Math.random() * alphabets.length)];
    } while(newLetter === previous);

    return newLetter; 
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
    const newLetter = getRandomLetter(currentLetter);
    currentLetter = newLetter; 
    letterSpan.textContent = currentLetter; 
}   else {
    flashColor("incorrect");
}


}

document.addEventListener("keydown", (e) => {
    handleKeyPress(e.key); // for pressing the keydown 
    // and easy to understand that . 
});