// Lets player choose the number of rounds to play
const numOfRounds = +prompt('Choose the number of rounds you want to play:', '3');

// options for computer, and also to check if user input is valid
const options = Object.freeze([
    'rock',
    'paper',
    'scissors'
]);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
    // The main function that calls other functions 
    for(let i = 0; i < numOfRounds; i++) {
        const playerSelection = prompt('Choose rock, paper, or scissors', 'rock').toLowerCase();
        const computerSelection = options[getRandomInt(0, 2)];

        // Check user's input
        if(!checkIfValidInput(playerSelection)) return console.log('Invalid choice, reload page to try again.');

        const winner = checkWinner(computerSelection, playerSelection);
    
        if(winner === 'tie') {
            console.log(`Computer played ${computerSelection}, player played ${playerSelection}. It is a tie.`);
        }else {
            console.log(`Computer played ${computerSelection}, player played ${playerSelection}. The ${winner} won!`);
        }
    }
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

startGame();
