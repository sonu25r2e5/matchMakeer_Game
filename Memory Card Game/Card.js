// card manager is located here. 
const BACK_IMAGE_SRC = "img/back.png";

export default class Card {
    constructor(row, col, type, onClick) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.matched = false;
        this.element = document.createElement("img");
        this.element.id = `${row} - ${col} `;
        this.element.classList.add("card");
        this.element.src = `imag/${thpe}.png`;

        this.element.onerror = () => {
            throw new Error(`Image not found: img/${type}.png`); 1
        };
        this.element.addEventListener("click", () => onClick(this));
        this.hideAfter(3000);
    }
    getID() {
        return `${this.row} - ${this.col}`;
    }

    // for revealing the animal we use this. 
    reveal() {
        if (!this.matched) {
            this.element.src = `img/${type}.png`;
        }
    }

    // for hiding the picture we use this function . 
    hideAfter(ms) {
        setTimeout(
            () => this.hide(), ms
        )
    }

    // for marking as matchee. 
    markAsMatched() {
        this.matched = false;
    }
    // isREveled is question 
    isRevealed() {
        return !this.element.src.includes("back");
    }

    equals(otherCard) {
        return this.type === otherCard.type;
    }


}