var hangmanGame = {
	words: ["CAT", "SWORD", "TRICKLE", "EXPERT", "TROOPER", "DOG", "COCKROACH", "PANCAKE", "SUPER", "TRUTH",
	"ORANGUTAN", "ORANGE", "PENGUIN", "TACO", "TRIUMPH", "WESTERN", "TELEVISION", "TURTLE", "BEAR", "SUSHI", "PIZZA", 
	"EARLY", "DOCTOR", "POWERFUL", "SUBTLE", "FRIEND"],
	letGuessed: "",
	remGuesses: 7,
	playing: false,
	wins: 0,
	letters: document.getElementsByClassName("letterInWord"),
	spaces: document.getElementsByClassName("letterSpaces"),
	successSound: new Audio("assets/sounds/success.wav"),
	failSound: new Audio("assets/sounds/fail.wav"),
	winSound: new Audio("assets/sounds/win.wav"),
	loseSound: new Audio("assets/sounds/lose.wav"),

	changeDocValue: function(idName, value){
		document.getElementById(idName).innerHTML = value;
	},

	resetGame: function (){
		hangmanGame.letGuessed = "";
		hangmanGame.remGuesses = 7;
		document.getElementById("hangmanImg").src = "assets/images/sm1.png";
		hangmanGame.changeDocValue("numberOfWins", hangmanGame.wins);
		console.log("step 1 good");
		hangmanGame.changeDocValue("guessesRem", hangmanGame.remGuesses);
		hangmanGame.changeDocValue("lettersGuessed", hangmanGame.letGuessed);

	    var i;
	    for (i = 0; i < hangmanGame.spaces.length; i++) {
	        hangmanGame.spaces[i].style.display = "none";
	        hangmanGame.letters[i].style.display = "none";
	        hangmanGame.letters[i].innerHTML = "";
	    }

	},

	gameClick: function () {
		if (hangmanGame.playing === false){
			hangmanGame.resetGame();
			hangmanGame.changeDocValue("gameStateText", "Guess the word!");
			hangmanGame.playing = true;

			hangmanGame.wordToGuess = hangmanGame.words[Math.floor(Math.random() * hangmanGame.words.length)];
			for (var i = 0; i < hangmanGame.wordToGuess.length; i++) {
				hangmanGame.spaces[i].style.display = "block";
			}
		}

		else {
			var keynum;
		    if(window.event || event.which) {                  
		    	keynum = String.fromCharCode(event.keyCode);
		    	if (keynum.match(/[a-z]/gi)) {
					if (hangmanGame.wordToGuess.includes(keynum.toUpperCase())){
						var placeHolderWord = "";

						for (var i = 0; i < hangmanGame.wordToGuess.length; i++){
							placeHolderWord += hangmanGame.letters[i].textContent;
						}

						if (placeHolderWord.includes(keynum.toUpperCase()) === false){
							hangmanGame.successSound.play();
							
						}

							for (var i = 0; i < hangmanGame.wordToGuess.length; i++) {
								if (hangmanGame.wordToGuess[i] === keynum.toUpperCase()){
									hangmanGame.letters[i].innerHTML = keynum.toUpperCase();
									hangmanGame.letters[i].style.display = "block";
									hangmanGame.gameStateCheck();
								}
							}
					}

					else {
						if (hangmanGame.letGuessed.includes(keynum.toUpperCase()) === false){
							hangmanGame.failSound.play();
							hangmanGame.remGuesses -= 1;
							hangmanGame.changeDocValue("guessesRem", hangmanGame.remGuesses);
							hangmanGame.letGuessed += keynum.toUpperCase() + " ";
							hangmanGame.changeDocValue("lettersGuessed", hangmanGame.letGuessed);
							document.getElementById("hangmanImg").src = "assets/images/sm" + (-(hangmanGame.remGuesses-8)) + ".png";
							hangmanGame.gameStateCheck();
						}
						

					}

				}


		    } 
		}
	
	},

	gameStateCheck: function (){
		if (hangmanGame.remGuesses < 1){
			hangmanGame.changeDocValue("gameStateText", "Game Over! Click to start again.");
			hangmanGame.loseSound.play();
			hangmanGame.playing = false;
		}
		else {
			var placeHolderWord = "";

			for (var i = 0; i < hangmanGame.wordToGuess.length; i++){
				placeHolderWord += hangmanGame.letters[i].textContent;
			}

			if (hangmanGame.wordToGuess === placeHolderWord){
				hangmanGame.wins += 1;
				hangmanGame.changeDocValue("numberOfWins", hangmanGame.wins);
				hangmanGame.playing = false;
				hangmanGame.changeDocValue("gameStateText", "You Win! Click to start again.");
				hangmanGame.winSound.play();

			}
		}
	},

};

hangmanGame.resetGame();
document.onkeypress = hangmanGame.gameClick;

