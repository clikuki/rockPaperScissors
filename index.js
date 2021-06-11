const roundWinMessageDisplay = document.querySelector('#roundWinMessageDisplay');
const gameWinMessageDisplay = document.querySelector('#gameWinMessageDisplay');
const requiredScoreInput = document.querySelector('#requiredScoreInput');
const submitRequiredScoreBtn = document.querySelector('#submitRequiredScore');
const resetGame = document.querySelector('#resetGame');
const imageChoices = document.querySelectorAll('#playerChoices > img');
const counterDiv = document.querySelector('#counter');
const computerCounter = counterDiv.querySelector('#computer');
const playerCounter = counterDiv.querySelector('#player');

// options for computer, and also to check if user input is valid
const options = [
    'rock',
    'paper',
    'scissors'
];

const counter = {
    playerWins: 0,
    computerWins: 0,
    numOfRounds: 0,
}

let requiredScore = 5;

function setGame() {
    counter.playerWins = 0;
    counter.computerWins = 0;
    counter.numOfRounds = 0;

    resetWinMessageDisplays();
    updateCounterDisplay();
}

function playRound(playerSelection) {
    // The main function that calls other functions
    const computerSelection = options[getRandomInt(0, 2)];

    const winner = checkWinner(computerSelection, playerSelection);
    
    if(winner === 'player') {
        counter.playerWins += 1;
    }else if(winner === 'computer') {
        counter.computerWins += 1;
    }

    updateRoundWinMessage(computerSelection, playerSelection, winner);
    updateCounterDisplay();

    if(counter.playerWins >= requiredScore || counter.computerWins >= requiredScore) {
        displayGameWinMessage();
    }
}

function changeRequiredScore() {
    if(requiredScoreInput.value === '') return;

    requiredScore = +requiredScoreInput.value;
    setGame();
}

// ===========================
//      Helper Funcs
// ===========================

function resetWinMessageDisplays() {
    gameWinMessageDisplay.textContent = `Reach ${requiredScore} points to win the game!`;
    roundWinMessageDisplay.textContent = 'Click one of the 3 choices to start the game';
}

function addEventListeners() {
    resetGame.addEventListener('click', () => {
        setGame();
    });
    
    submitRequiredScoreBtn.addEventListener('click', () => {
        changeRequiredScore();
    })
    
    requiredScoreInput.addEventListener('keydown', e => {
        if(e.keyCode === 13) {
            changeRequiredScore();
        }
    })
    
    requiredScoreInput.addEventListener('input', () => {
        if(!Number.isInteger(+requiredScoreInput.value)) {
            requiredScoreInput.value = +removeDot(requiredScoreInput.value);
        }

        if(+requiredScoreInput !== '') {
            requiredScoreInput.value = +requiredScoreInput.value;
        }

        if(+requiredScoreInput.value > Number.MAX_SAFE_INTEGER) {
            requiredScoreInput.value = Math.floor(+requiredScoreInput.value / 10);
        }
    
        if(+requiredScoreInput.value <= 0) {
            requiredScoreInput.value = Math.abs(+requiredScoreInput.value);
        }
    })

    for(const image of imageChoices) {
        image.addEventListener('click', e => {
            counter.numOfRounds += 1;
            if(counter.playerWins < requiredScore && counter.computerWins < requiredScore) {
                playRound(e.target.id)
            }
        })
    }
}

function removeDot(string) {
    const stringArray = string.split('');
    const dotIndex = stringArray.indexOf('.');
    
    return [...stringArray.slice(0, dotIndex), ...stringArray.slice(dotIndex + 1, stringArray.length)].join('');
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateCounterDisplay() {
    playerCounter.textContent = `Player : ${counter.playerWins}`;
    computerCounter.textContent = `Computer : ${counter.computerWins}`;
}

function updateRoundWinMessage(computerSelection, playerSelection, winner) {
    let winMessage = '';

    if(winner === 'tie') {
        winMessage = 'It was a tie.'
    }else if(winner === 'player') {
        winMessage = `Your ${playerSelection} beat the computer's ${computerSelection}!`
    }else {
        winMessage = `The computer's ${computerSelection} beat your ${playerSelection}!`
    }

    roundWinMessageDisplay.textContent = winMessage;
}

function displayGameWinMessage() {
    let winner;

    if(counter.playerWins >= requiredScore) {
        winner = 'player';
    }else {
        winner = 'computer'
    }

    const winMessage = `After ${counter.numOfRounds} rounds, The first to reach ${requiredScore} points is ${winner}!`;

    gameWinMessageDisplay.textContent = winMessage;
}

function checkWinner(computerSelection, playerSelection) {
    switch (true) {
        case playerSelection === computerSelection:
            return 'tie';

        case computerSelection === 'rock' && playerSelection === 'paper':
        case computerSelection === 'paper' && playerSelection === 'scissors':
        case computerSelection === 'scissors' && playerSelection === 'rock':
            return 'player';

        default:
           return 'computer';
    }
}

addEventListeners();
setGame();
