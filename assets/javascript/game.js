var wins, remGuesses, letGuessed, playing;

wins = 0;

remGuesses = 7;

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

		wordToGuess = words[Math.floor(Math.random() * words.length)];
		for (var i = 0; i < wordToGuess.length; i++) {
			letters[i].innerHTML = wordToGuess[i];
			spaces[i].style.display = "block";
		}
	}

	else {
		var keynum;
	    if(window.event || event.which) {                  
	    	keynum = String.fromCharCode(event.keyCode);

	    	if (keynum.match(/[a-z]/gi)) {
   				for (var i = Things.length - 1; i >= 0; i--) {
   					Things[i]
   				}
			}

			else {
				alert("not a letter");
			}

	    } 
  	}
	
}

document.onkeypress = gameClick;