var wins, remGuesses, letGuessed;

wins = 0;

remGuesses = 6;

letGuessed = "ABC";

function onLoad () {
	document.getElementById("numberOfWins").innerHTML = wins;
	document.getElementById("guessesRem").innerHTML = remGuesses;
	document.getElementById("lettersGuessed").innerHTML = letGuessed;
}