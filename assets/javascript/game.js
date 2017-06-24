// Variables
// ==================================================
// Global Variables
var wins = 0;
var guesses = 12;
var maxGuesses = guesses;
var lettersGuessed = [];
var display = "";
var phraseLength = 0;
var active = true;
var wordsIndex = 0;
var words = [
	"alien",
	"dean",
	"cars",
	"jackie",
	"sing",
	"paterson"
];
var state ="start";
var inProgress = [];

// var placeholder = document.getElementById("place");
randomizer();

// Functions
// ====================================================

function randomizer() {
	var random = Math.floor(Math.random() * words.length);
	display = words[random];
	
	for (var i = 0; i < display.length; i++) {
		inProgress.push("_");
	}
	// var blankCounter = inProgress.length;
	// console.log("test" +blankCounter);
	// console.log(display);
	// console.log(inProgress);
	document.getElementById("currentWord").innerHTML = inProgress;
	// var html = "";	
}

function spaceCounter() {
	var blankCounter = display.length;
	console.log(blankCounter);
}

function updateWins() {
	document.getElementById("wins").innerHTML = "Wins: " + wins;
}

function updateGuesses() {
	document.getElementById("guesses").innerHTML = guesses;
}

function resetRound() {
	guesses = maxGuesses;
	lettersGuessed = [];
	document.getElementById("letters").innerHTML = "";
	inProgress = [];
	// document.getElementById("gameOver").innerHTML = "";
	document.getElementById("currentWord").innerHTML = "";
	randomizer();
}


updateGuesses();
spaceCounter();

// Game Play
// ==========================================================
window.onload = function() {
	


document.onkeyup = function(event) {

	var userInput = String.fromCharCode(event.keyCode).toLowerCase();

		document.getElementById("gameOver").innerHTML = "";
	

		var theIndex = display.indexOf(userInput);
		inProgress[theIndex] = userInput;
		document.getElementById("currentWord").innerHTML = inProgress;

	function updateLettersGuessed() {
		if (display.indexOf(userInput) === -1) {
		// if (lettersGuessed.indexOf(userInput) == -1) {
			lettersGuessed.push(userInput);
			guesses--;
		} else {
			blankCounter--;
			// console.log(counter);
		}

		for (var i = 0; i < lettersGuessed.length; i++) {
			document.getElementById("letters").innerHTML = lettersGuessed;
		}

		if (blankCounter === 0) {
			wins++;
			document.getElementById("gameOver").innerHTML = "YOU WON";
			document.getElementById("wins").innerHTML = "You solved: " + wins + " out of 10.";
			updateWins();
			resetRound();
		}

		if (wordsIndex > (words.length-1) || (guesses === 0)) {
			document.getElementById("gameOver").innerHTML = "GAME OVER!";
			document.getElementById("wins").innerHTML = "You solved: " + wins + " out of 10.";
		}
	}
	updateLettersGuessed();
	updateGuesses();
	spaceCounter();
	
}

};








