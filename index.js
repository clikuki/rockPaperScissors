const roundWinMessageDisplay = document.querySelector('#roundWinMessageDisplay');
const gameWinMessageDisplay = document.querySelector('#gameWinMessageDisplay');
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

const scoreNeededToWin = 5;

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

    if(counter.playerWins >= scoreNeededToWin || counter.computerWins >= scoreNeededToWin) {
        displayGameWinMessage();
    }
}

// ===========================
//      Helper Funcs
// ===========================

function resetWinMessageDisplays() {
    gameWinMessageDisplay.classList.add('invis');

    gameWinMessageDisplay.textContent = 'dummy text';
    roundWinMessageDisplay.textContent = 'Click one of the 3 choices to start the game';
}

function addEventListeners() {
    for(const image of imageChoices) {
        image.addEventListener('click', e => {
            counter.numOfRounds += 1;
            if(counter.playerWins < scoreNeededToWin && counter.computerWins < scoreNeededToWin) {
                playRound(e.target.id)
            }
        })
    }

    document.querySelector('#resetGame').addEventListener('click', () => {
        setGame();
    });
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
    let conculusion;

    if(winner === 'tie') {
        conculusion = 'It was a tie.'
    }else {
        conculusion = `The ${winner} won this round!`
    }

    let winMessage = `Computer played ${computerSelection}, You played ${playerSelection}. ${conculusion}`;

    roundWinMessageDisplay.textContent = winMessage;
}

function displayGameWinMessage() {
    let winner;

    if(counter.playerWins >= scoreNeededToWin) {
        winner = 'player';
    }else {
        winner = 'computer'
    }

    const winMessage = `The game is finished! The winner is ${winner}! There were a total of ${counter.numOfRounds} rounds!`;

    gameWinMessageDisplay.classList.remove('invis');
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
