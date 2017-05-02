var wins, remGuesses, letGuessed, playing;

wins = 0;

remGuesses = 6;

letGuessed = "ABC";

playing = false;

var words = ["cat", "sword", "trickle"]

var letters = document.getElementsByClassName("letterInWord");
var spaces = document.getElementsByClassName("letterSpaces");

function resetGame () {
	document.getElementById("numberOfWins").innerHTML = wins;
	document.getElementById("guessesRem").innerHTML = remGuesses;
	document.getElementById("lettersGuessed").innerHTML = letGuessed;

    var i;
    for (i = 0; i < spaces.length; i++) {
        spaces[i].style.display = "none";
        letters[i].style.display = "none";
    }
}

function gameClick () {
	if (playing == false){
		document.getElementById("gameStateText").innerHTML = "Guess the word!";
		playing = true;

		for (var i = 0; i < words[0].length; i++) {
			letters[i].innerHTML = words[0][i];
			spaces[i].style.display = "block";
		}
	}

	else {

	}
}

document.onkeypress = gameClick;