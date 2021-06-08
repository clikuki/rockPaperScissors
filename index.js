const imageChoices = document.querySelectorAll('.choices');

// options for computer, and also to check if user input is valid
const options = Object.freeze([
    'rock',
    'paper',
    'scissors'
]);

const winCounter = {
    player: 0,
    computer: 0,
}

let anonFunc = e => {
    startRound(e.target.id)
}

function setGame() {
    winCounter.player = 0;
    winCounter.computer = 0;

    addEventListener();
}

function addEventListener() {
    imageChoices.forEach(image => {
        image.addEventListener('click', anonFunc)
    })
}

function removeEventListener() {
    imageChoices.forEach(image => {
        image.removeEventListener('click', anonFunc)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startRound(playerSelection) {
    // The main function that calls other functions
    const computerSelection = options[getRandomInt(0, 2)];

    // Check user's input
    if(!checkIfValidInput(playerSelection)) return console.log('Invalid choice, reload page to try again.');

    const winner = checkWinner(computerSelection, playerSelection);

    if(winner === 'tie') {
        console.log(`Computer played ${computerSelection}, player played ${playerSelection}. It is a tie.`);
    }else {
        if(winner === 'player') {
            winCounter.player += 1;
        }else {
            winCounter.computer += 1;
        }

        console.log(`Computer played ${computerSelection}, player played ${playerSelection}. The ${winner} won this round!`);
    }

    if(winCounter.player === 5 || winCounter.computer === 5) {
        finishGame();
    }
}

function finishGame() {
    removeEventListener();

    let winMessage = 'The game is finished! The winner is ';

    if(winCounter.player === 5) {
        winMessage += 'player!';
    }else {
        winMessage += 'computer!'
    }

    console.log(winMessage);
}

function checkWinner(computerSelection, playerSelection) {
    // If the playerSelection === computerSelection, then it is a tie
    if(playerSelection === computerSelection) return 'tie';

    // If playerSelection === choice, then player is the winner
    switch (computerSelection) {
        case 'rock':
            if(playerSelection === 'paper') return 'player';
            break;

        case 'paper':
            if(playerSelection === 'scissors') return 'player';
            break;

        case 'scissors':
            if(playerSelection === 'rock') return 'player';
            break;
    }
    
    // Return 'Computer' if computer is the winner 
    return 'computer';
}

function checkIfValidInput(input) {
    // Checks if the user's input is a valid option by getting its index from global variable option;
    const index = options.indexOf(input);

    // If index === -1, that means the user's choice is not valid. Otherwise, it is valid
    if(index !== -1) return true;
    return false;
}

setGame();
