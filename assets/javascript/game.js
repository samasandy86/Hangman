'use strict';

const wordList = ["cat", "dog", "bird", "hello"];
const clue = ["meow", "woof", "chirp"];

let chosenWord = wordList[Math.floor((Math.random() * wordList.length))];

let chosenWordLength = chosenWord.length;
let dashWordLength = [];
for (let dashCounter = 0; dashCounter < chosenWordLength; dashCounter++) {
    dashWordLength.push('_');
    document.querySelector('#currentWord').innerHTML = dashWordLength.join(' ');

    $(document).on('keypress', function (event) {
        const guess = event.key;

        if (chosenWord.includes(guess)) {
            correctGuess(guess);
        }
    }

    )
};

// ---- CORRECT GUESS FUNCTION ---
function correctGuess(guess) {
    console.log(guess)
    const chosenWordLetters = chosenWord.split('')
    let eventLocations = [];

    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWordLetters[i] === guess) {
            eventLocations.push(i)

        }
    }

    for (let i = 0; i < eventLocations.length; i++) {
        dashWordLength[eventLocations[i]] = guess;

    }
    document.querySelector('#currentWord').innerHTML = dashWordLength.join(' ');
};

// ---- RESET FUCTION -----
function reset() {
    chosenWord = wordList[Math.floor((Math.random() * wordList.length))];

    chosenWordLength = chosenWord.length;
    dashWordLength = [];
    for (let dashCounter = 0; dashCounter < chosenWordLength; dashCounter++) {
        dashWordLength.push('_');
        document.querySelector('#currentWord').innerHTML = dashWordLength.join(' ');

    }
};

$('#reset').on('click', reset);


//change image source information
//document.querySelector('').innerHTML = dashWordLength.join(' ');

//console.log(document.querySelector('#currentWord'));
//console.log(chosenWord);



