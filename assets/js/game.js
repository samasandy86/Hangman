'use strict';

const wordList =           // List of words for the game
    [
        "BASKETBALL",
        "BASEBALL",
        "FOOTBALL",
        "SOCCER",
        "TRACK",
        "TENNIS",
        "SWIMMING",
        "BADMINTON",
        "RAQUETBALL",
        "BOWLING",
        "VOLLEYBALL",
        "HOCKEY",
        "GOLF",
        "WEIGHTLIFTING",
        "SLIMEBALL",
    ];

const maxTries = 7;            // Maximum number of tries player has

let guessedLetters = [];        // Stores the letters the user guessed
let chosenWord;             // Index of the current word in the array
let guessingWord = [];          // This will be the word we actually build to match the current word
let remainingGuesses = 0;       // How many tries the player has left
let hasFinished = false;        // Flag for 'press any key to try again'     
let wins = 0;                   // How many wins has the player racked up

// Sound EFX
let keySound = new Audio('./assets/sounds/slime-type.wav');
let winSound = new Audio('./assets/sounds/you-win.wav');
let loseSound = new Audio('./assets/sounds/you-lose.wav');

// RESET
function resetGame() {
    remainingGuesses = maxTries;

    // Use Math.floor to round the random number down to the nearest whole.
    chosenWord = Math.floor(Math.random() * (wordList.length));

    // Clears out the arrays
    guessedLetters = [];
    guessingWord = [];

    // Clears out the images
    document.getElementById("SlimemanImage").src = "";

    // Builds and clears the guessing word
    for (let i = 0; i < wordList[chosenWord].length; i++) {
        guessingWord.push("_");
    }   

    // Hide images and content
    document.getElementById("pressKeyTryAgain").style.display = "none";
    document.getElementById("gameover-image").style.display = "none";
    document.getElementById("youwin-image").style.display = "none";

    // Show display
    updateDisplay();
};

//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

      let guessingWordText = "";
    for (let i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};


// Changes image depending on guesses
function updateSlimemanImage() {
    document.getElementById("SlimemanImage").src = "assets/images/face" + (maxTries - remainingGuesses) + ".png";
};

function evaluateGuess(letter) {
    // Stores the positions of the letter
    let positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (let i = 0; i < wordList[chosenWord].length; i++) {
        if(wordList[chosenWord][i] === letter) {
            positions.push(i);
        }
    }

    // Remove a guesses and update image
    if (positions.length <= 0) {
        remainingGuesses--;
        updateSlimemanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(let i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.display = "block";
        document.getElementById("pressKeyTryAgain").style.display = "block";
        wins++;
        winSound.play();
        hasFinished = true;
    }
};


// Checks for Loss
function checkLoss()
{
    if(remainingGuesses <= 0) {
        loseSound.play();
        document.getElementById("gameover-image").style.display = "block";
        document.getElementById("pressKeyTryAgain").style.display = "block";
        hasFinished = true;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};


// Event listener
document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            keySound.play();
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};