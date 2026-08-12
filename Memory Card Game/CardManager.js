// for managing the card we use this one. 
export default class CardManager {
    constructor() {
        this.orginalCards = [
            "fire",
            "island",
            "king",
            "lightning-bold",
            "lion",
            "mountain",
            "rabbit",
            "sheep",
            "snowflake",
            "candy"
        ];
        this.deck = [];
    }

    shuffle() {
        // it duplicates the original cards. 
        // for shuffle we use this function. 
        const pairedCards = [
            ...this.orginalCards, ...this.orginalCards
        ];

        // we decreasing the counting. 

        for (let i = pairedCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairedCards[i], pairedCards[j]] = [pairedCards[j], pairedCards[i]];
        }
        // for saving the shuffle cards. we use this. one. 
        this.deck = pairedCards;
    }

    // for drawiong the card. we use this. one. 
    drawCard() {
        return this.deck.pop();

    }

    // for drawing the card we use this.one 
    hasCardsLeft() {
        return this.deck.length > 0;
    }


}