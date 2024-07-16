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
    return shuffledCardsArray;
};

// shuffle the cards to start the game
shuffle(allCards, shuffledCards);


// add cards to the HTML
const gameBoard = document.getElementById('game-board');

shuffledCards.forEach(card => {
    let gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.setAttribute('data-value', card.value)
    // gameCard.innerHTML = card.value;

    // add images front and back
    let gameCardImage = document.createElement('img');
    gameCardImage.setAttribute('src', card.img);
    gameCard.appendChild(gameCardImage);
    let gameCardBackImage = document.createElement('img');
    gameCardBackImage.setAttribute('src', './assets/images/back.png');
    gameCardBackImage.setAttribute('class', 'back-image');
    gameCard.appendChild(gameCardBackImage);

    gameBoard.append(gameCard);
});


// chronometer to calc the game time
let minutes = 0;
let seconds = 0;
let chronometer;

function startChronometer() {
    chronometer = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        document.getElementById("chronometer").innerHTML =
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;
    }, 1000);
}

function stopChronometer() {
    clearInterval(chronometer);
}


// variable to set game rules
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

    // add class to show the card
    card.classList.add('check');

    // start chronometer
    if (minutes === 0 && seconds === 0 && checkedCards.length === 0) {
        startChronometer();
    };

    if (firstCard == null && firstCardIndex == null) {
        // if is the first card set it as first card else check for equel value
        firstCard = cardValue;
        firstCardIndex = cardIndex
    } else if (cardIndex === firstCardIndex) {
        // if double click a card just hide, no error
        card.classList.remove('check');
        firstCard = null;
        firstCardIndex = null
    } else {
        gameCards.forEach(card => {
            card.removeEventListener('click', card.eventListener);
        });
        setTimeout(() => {
            let secondCard = cardValue;
            let secondCardIndex = cardIndex;
            if (secondCard === firstCard && secondCardIndex !== firstCardIndex) {
                // if cards have equal value push in checked cards array
                checkedCards.push(firstCard);
                firstCard = null;
                firstCardIndex = null;
                gameCards.forEach(card => {
                    card.addEventListener('click', card.eventListener);
                });
                if (checkedCards.length === 6) {
                    const endMessage = document.getElementById('end-message');
                    endMessage.setAttribute('class', 'show');
                    endMessage.innerHTML = `You win!! <br> in ${minutes} minutes and ${seconds} seconds <br> with ${errorCount} errors`;
                    stopChronometer();
                }
            } else {
                // remove class to hide cards that have not equal value
                gameCards.forEach(card => {
                    if (!checkedCards.includes(card.attributes[1].value)) {
                        card.classList.remove('check');
                    }
                });
                errorCount++;
                document.getElementById('errors').innerHTML = `Errors: ${errorCount}`;
                firstCard = null;
                firstCardIndex = null;
                gameCards.forEach(card => {
                    card.addEventListener('click', card.eventListener);
                });
            }
        }, 600);
    };
};


// select all cards and add event listener
const gameCards = document.querySelectorAll('.game-card');

gameCards.forEach((card, index) => {
    let cardValue = card.attributes[1].value;
    let cardIndex = index;
    card.eventListener = function (e) {
        cardCheck(card, cardValue, cardIndex);
    };
    card.addEventListener('click', card.eventListener);
});