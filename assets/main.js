// cards array
const cards = [
    {
        img: 'img_url',
        value: 1
    },
    {
        img: 'img_url',
        value: 2
    },
    {
        img: 'img_url',
        value: 3
    },
    {
        img: 'img_url',
        value: 4
    },
    {
        img: 'img_url',
        value: 5
    },
    {
        img: 'img_url',
        value: 6
    },
];

// cards array duplicated to have the couples
const allCards = cards.concat(cards);

let shuffledCards = [];

/**
 * shuffle the array elemnts and insert in the shuffled array
 * @param {Array} cardsArray array of cards to be shuffled
 * @param {Array} shuffledCardsArray array of shuffled cards
 * @returns shuffled cards array
*/
function shuffle(cardsArray, shuffledCardsArray) {
    while (cardsArray.length > 0) {
        let randomIndex = Math.floor(Math.random() * cardsArray.length);
        shuffledCardsArray.push(cardsArray[randomIndex]);
        let x = cardsArray.splice(randomIndex, 1);
    }
    // console.log(shuffledCards);
    return shuffledCardsArray;
};

// shuffle the cards to start the game
shuffle(allCards, shuffledCards);
// console.log(shuffledCards);

// add cards to the HTML
const gameBoard = document.getElementById('game-board');
console.log(gameBoard);
shuffledCards.forEach(card => {
    let gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.innerHTML = card.value;
    console.log(gameCard);
    gameBoard.append(gameCard);
});

