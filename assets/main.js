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
// console.log(gameBoard);
shuffledCards.forEach(card => {
    let gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.setAttribute('data-value', card.value)
    // gameCard.innerHTML = card.value;
    // add image
    let gameCardImage = document.createElement('img');
    gameCardImage.setAttribute('src', card.img)
    gameCard.appendChild(gameCardImage);

    // console.log(gameCard);
    gameBoard.append(gameCard);
});

let firstCard = null;
let firstCardIndex = null;
let checkedCards = [];
let errorCount = 0;

/**
 * check if th e clicked card is the first, if is the second check if the cards are equals
 * @param {Node} card 
 * @param {Number} cardValue 
 * @param {Number} cardIndex 
 */
function cardCheck(card, cardValue, cardIndex) {
    // dadd class to show the card
    card.classList.add('check');
    // console.log(card.classList);
    // if is the first card set it as first card else check for equel value
    if (firstCard == null && firstCardIndex == null) {
        firstCard = cardValue;
        firstCardIndex = cardIndex
        // console.log('1st', firstCard, firstCardIndex);
    } else {
        let secondCard = cardValue;
        let secondCardIndex = cardIndex;
        // console.log('2nd', secondCard, secondCardIndex);
        if (secondCard === firstCard && secondCardIndex !== firstCardIndex) {
            // if cards have equal value push in checked cards array
            checkedCards.push(firstCard);
            console.log(checkedCards);
            firstCard = null;
            firstCardIndex = null
            if (checkedCards.length === 6) {
                console.log('end game');
            }
        } else if (secondCardIndex === firstCardIndex) {
            // if double click a card just hide, no error
            card.classList.remove('check');
            firstCard = null;
            firstCardIndex = null
        } else {
            // remove class to hide cards that have not equal value
            gameCards.forEach(card => {
                if (!checkedCards.includes(card.attributes[1].value)) {
                    card.classList.remove('check');
                }
            });
            errorCount++;
            firstCard = null;
            firstCardIndex = null
        }
    }
    // console.log(gameBoard);
    // console.log(errorCount);
}

// select all cards and add event listener
const gameCards = document.querySelectorAll('.game-card');
// console.log(gameCards);

gameCards.forEach((card, index) => {
    let cardValue = card.attributes[1].value;
    let cardIndex = index;
    card.addEventListener('click', function (e) { cardCheck(card, cardValue, cardIndex) });
});
