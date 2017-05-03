var wins, remGuesses, letGuessed, playing;

wins = 0;

remGuesses = 7;

letGuessed = "";

playing = false;

var words = ["CAT", "SWORD", "TRICKLE", "EXPERT", "TROOPER", "DOG", "COCKROACH", "PANCAKE", "SUPER", "TRUTH",
"ORANGUTAN", "ORANGE", "PENGUIN", "TACO"]

var letters = document.getElementsByClassName("letterInWord");
var spaces = document.getElementsByClassName("letterSpaces");

var successSound = new Audio("assets/sounds/success.wav")
var failSound = new Audio("assets/sounds/fail.wav")
// 

function resetGame () {
	letGuessed = "";
	remGuesses = 7;
	document.getElementById("hangmanImg").src = "assets/images/sm1.png"
	changeDocValue("numberOfWins", wins);
	changeDocValue("guessesRem", remGuesses);
	changeDocValue("lettersGuessed", letGuessed);

    var i;
    for (i = 0; i < spaces.length; i++) {
        spaces[i].style.display = "none";
        letters[i].style.display = "none";
        letters[i].innerHTML = "";
    }
}

function gameClick () {


	if (playing == false){
		resetGame();
		changeDocValue("gameStateText", "Guess the word!");
		playing = true;

		wordToGuess = words[Math.floor(Math.random() * words.length)];
		for (var i = 0; i < wordToGuess.length; i++) {
			spaces[i].style.display = "block";
		}
	}

	else {
		var keynum;
	    if(window.event || event.which) {                  
	    	keynum = String.fromCharCode(event.keyCode);
	    	if (keynum.match(/[a-z]/gi)) {
				if (wordToGuess.includes(keynum.toUpperCase())){
					var placeHolderWord = "";
					for (var i = 0; i < wordToGuess.length; i++){
					placeHolderWord += letters[i].textContent;
					}

					if (placeHolderWord.includes(keynum.toUpperCase()) == false){
						successSound.play();
						
					}

   					for (var i = 0; i < wordToGuess.length; i++) {
   						if (wordToGuess[i] == keynum.toUpperCase()){
   							letters[i].innerHTML = keynum.toUpperCase();
   							letters[i].style.display = "block";
   							gameStateCheck();
   						}
   					}
				}

				else {
					if (letGuessed.includes(keynum.toUpperCase()) == false){
						failSound.play();
						remGuesses -= 1;
						changeDocValue("guessesRem", remGuesses);
						letGuessed += keynum.toUpperCase() + " ";
						changeDocValue("lettersGuessed", letGuessed);
						document.getElementById("hangmanImg").src = "assets/images/sm" + (-(remGuesses-8)) + ".png";
						gameStateCheck();
					}
					

				}

			}


	    } 
  	}
	
}

function changeDocValue(idName, value){
	document.getElementById(idName).innerHTML = value;
}

function gameStateCheck(){
	if (remGuesses < 1){
		changeDocValue("gameStateText", "Game Over! Click to start again.");
		playing = false;
	}
	else {
		var placeHolderWord = "";
		for (var i = 0; i < wordToGuess.length; i++){
			placeHolderWord += letters[i].textContent;
		}

		if (wordToGuess == placeHolderWord){
			wins += 1;
			changeDocValue("numberOfWins", wins);
			playing = false;
			changeDocValue("gameStateText", "You Win! Click to start again.");

		}
	}
}

document.onkeypress = gameClick;