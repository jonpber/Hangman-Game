var wins, remGuesses, letGuessed, playing;

wins = 0;

remGuesses = 6;

letGuessed = "ABC";

playing = false;

var words = ["cat"]

function resetGame () {
	document.getElementById("numberOfWins").innerHTML = wins;
	document.getElementById("guessesRem").innerHTML = remGuesses;
	document.getElementById("lettersGuessed").innerHTML = letGuessed;
}

function gameOn () {
	document.getElementById("gameStateText").innerHTML = "Guess the word!";
}

document.onkeypress = gameOn;