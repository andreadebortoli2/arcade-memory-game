// cards array
const cards = [
    {
        img: './assets/images/alien.png',
        value: 1
    },
    {
        img: './assets/images/bug.png',
        value: 2
    },
    {
        img: './assets/images/duck.png',
        value: 3
    },
    {
        img: './assets/images/rocket.png',
        value: 4
    },
    {
        img: './assets/images/spaceship.png',
        value: 5
    },
    {
        img: './assets/images/tiktac.png',
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
    gameCard.setAttribute('data-value', card.value)
    // gameCard.innerHTML = card.value;
    // add image
    let gameCardImage = document.createElement('img');
    gameCardImage.setAttribute('src', card.img)
    gameCard.appendChild(gameCardImage);

    console.log(gameCard);
    gameBoard.append(gameCard);
});

