// Variables
// ==================================================
// Global Variables
var wins = 0;
var guesses = 12;
var maxGuesses = guesses;
var lettersGuessed = [];
var phraseLength = 0;
var active = true;
var wordsIndex = 0;
var wordBank = [
  "alien",
  "cars",
  "jackie",
  "sing",
  "paterson",
  "arrival",
  "zootopia",
  "moonlight",
  "la la land",
  "rogue one: a star wars story"
];
var hintBank = [
  "Stars Sigourney Weaver as Ripley...",
  "Lightning McQueen...",
  "Natalie Portman plays JFK's wife in...",
  "Matthew McConaughey plays a Koala in...",
  "Adam Driver plays a bus driver and poet in this 2016 film...",
  "Alien language that allows you to see the past and future...",
  "A mammal metropolis where various animals live and thrive...",
  "This film presents three stages in the life of the main character...",
  "Musical comedy staring Ryan Gosling and Emma Stone...",
  "A 2016 American space epic film directed by Gareth Edwards..."
];
var word = "";
var hint = "";
var display = "";
var state = "start";
var inProgress = [];
var blankCounter;

// Functions
// ===========================================================

function getWord() {
  var index = Math.floor(Math.random() * wordBank.length);
  word = wordBank[index];
  hint = hintBank[index];
  wordBank.splice(index, 1);
  console.log(wordBank);
  hintBank.splice(index, 1);
  display = word.replace(/[a-z,A-Z]/g, "_");
  document.getElementById("display").innerHTML = display;
  document.getElementById("hint").innerHTML = hint;
  wordsIndex++;
  blankSpaces();
}

function updateWins() {
  document.getElementById("wins").innerHTML = "Wins: " + wins;
}

function updateGuesses() {
  document.getElementById("guesses").innerHTML = guesses;
}

function resetRound() {
  if (wordBank.length === 0 || guesses === 0) {
    didWin();
  } else {
    guesses = maxGuesses;
    lettersGuessed = [];
    document.getElementById("letters").innerHTML = "";
    inProgress = [];
    getWord();
  }
}

function blankSpaces() {
  blankCounter = display.match(/_/g);
}

function didWin() {
  document.getElementById("gameOver").innerHTML = "GAME OVER!";
  document.getElementById("wins").innerHTML =
    "You solved: " + wins + " out of 10.";
}

getWord();
updateGuesses();

// Game Play
// ==========================================================
window.onload = function() {
  document.onkeyup = function(event) {
    var userInput = String.fromCharCode(event.keyCode).toLowerCase();

    if (userInput) document.getElementById("gameOver").innerHTML = "";

    var userInput = String.fromCharCode(event.keyCode).toLowerCase();

    for (var i = 0; i < word.length; i++) {
      var firstChar = word[i].indexOf(userInput);
      if (firstChar !== -1) {
        display = display.slice(0, i) + userInput + display.slice(i + 1);
        document.getElementById("display").innerHTML = display;
      }
    }

    function updateLettersGuessed() {
      if (display.indexOf(userInput) === -1) {
        lettersGuessed.push(userInput);
        guesses--;
      } else {
		lettersGuessed.push(userInput);
        blankSpaces();
      }

      for (var i = 0; i < lettersGuessed.length; i++) {
        document.getElementById("letters").innerHTML = lettersGuessed;
      }

      if (blankCounter === null) {
        wins++;
        updateWins();
        resetRound();
      }

    }
    updateLettersGuessed();
    updateGuesses();
  };
};
