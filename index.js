// Lets player choose the number of rounds to play
const numOfRounds = +prompt('Choose the number of rounds you want to play:', '3');

const options = [
    'rock',
    'paper',
    'scissors'
];

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

function rockPaperScissors() {
    // The main function that calls other functions 
    for(let i = 0; i < numOfRounds; i++) {
        const userChoice = prompt('Choose rock, paper, or scissors', 'rock').toLowerCase();
        const computerChoice = options[getRandom(0, 3)];

        if(!checkIfValidInput(userChoice)) return console.log('Invalid input, reload page to try again.')

        const winner = checkWinner(computerChoice, userChoice);
    
        console.log(`Computer played ${computerChoice}, you played ${userChoice}. ${winner} won!`);
    }
}

function checkWinner(computerChoice, userChoice) {
    // If userChoice equals the string, then return player. Else, it exits the switch statement and returns computer
    switch (computerChoice) {
        case 'rock':
            if(userChoice === 'paper') return 'Player';
            break;

        case 'paper':
            if(userChoice === 'scissors') return 'Player';
            break;

        case 'scissors':
            if(userChoice === 'rock') return 'Player';
            break;
    
        default:
            break;
    }

    return 'Computer';
}

function checkIfValidInput(input) {
    // Checks if the user's input is a valid option by getting its index from global variable option;
    const index = options.indexOf(input);

    if(index !== -1) return true;
    return false;
}

rockPaperScissors();
