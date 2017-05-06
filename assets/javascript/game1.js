
//The Hangman Game Object
var hangmanGame = {
	//The game words
	words: ["GAME", "ATARI", "PONG", "CONSOLE", "COMPUTER", "GRAPHICS", "PIXELS", "DIFFICULTY", "BOSS", "ENEMY",
	"GORILLA", "PLUMBER", "ROBOT", "CONTROLLER", "CARTRIDGE", "FUN", "LEVEL", "LIVES", "HEDGEHOG", "BIT", "POWER", 
	"KART", "HERO", "VILLAIN", "ABILITY", "PLATFORM", "ITEM", "MUSHROOM", "TURTLE", "SWORD", "GUN",
	"PLAYER", "CHARACTER", "QUEST", "EQUIPMENT", "TEAM", "CODE", "SPRITE", "BROTHERS", "BOX", "ARCADE", "FIGHTER",
	"MAGE", "WARRIOR", "MAGIC", "TETRIS", "INVADERS"],
	
	//The basic game elements: which letters were guessed, guesses remaining, if they are currently guessing a word, and win#.
	letGuessed: "",
	remGuesses: 7,
	playing: false,
	wins: 0,

	//Manipulates the document letters and spaces class elements of the letters and spaces column
	letters: document.getElementsByClassName("letterInWord"),
	spaces: document.getElementsByClassName("letterSpaces"),

	//the ingame sounds
	successSound: new Audio("assets/sounds/success.wav"),
	failSound: new Audio("assets/sounds/fail.wav"),
	winSound: new Audio("assets/sounds/win.wav"),
	loseSound: new Audio("assets/sounds/lose.wav"),
	dudSound: new Audio("assets/sounds/dud.wav"),

	//This method takes a document ID and changes its value
	changeDocValue: function(idName, value){
		document.getElementById(idName).innerHTML = value;
	},

	//This method resets the game to initial mode.
	resetGame: function (){
		this.letGuessed = "";
		this.remGuesses = 7;
		document.getElementById("hangmanImg").src = "assets/images/sm1.png";
		this.changeDocValue("numberOfWins", this.wins);
		this.changeDocValue("guessesRem", this.remGuesses);
		this.changeDocValue("lettersGuessed", this.letGuessed);

		//this loop goes through every space and letter element to be guessed and blanks them out.
	    var i;
	    for (i = 0; i < this.spaces.length; i++) {
	        this.spaces[i].style.display = "none";
	        this.letters[i].style.display = "none";
	        this.letters[i].innerHTML = "";
	    }

	},

	//Checks the value of a letter pressed compared to 
	letterCheck: function(keyToCheck) {
    	if (keyToCheck.match(/[a-z]/gi)) {
    		//If the letter guessed is included in the word to guess/
			if (this.wordToGuess.includes(keyToCheck.toUpperCase())){
				
				//A placeholder is used to create a comparison word.
				var placeHolderWord = "";
				for (var i = 0; i < this.wordToGuess.length; i++){
					placeHolderWord += this.letters[i].textContent;
				}

				//If this placeholder word does not include the letter already
				if (placeHolderWord.includes(keyToCheck.toUpperCase()) === false){
					this.successSound.play();

					//It will go through and place the word in their corresponding letter spot.
					for (var i = 0; i < this.wordToGuess.length; i++) {
						if (this.wordToGuess[i] === keyToCheck.toUpperCase()){
							this.letters[i].innerHTML = keyToCheck.toUpperCase();
							this.letters[i].style.display = "block";
							this.gameStateCheck();
						}
					}
				}

				else {
					this.dudSound.play();
				}
			}

			//If the letter guessed is not in the word to guess
			else {
				//As long as this wrong letter hasn't been guessed before, it will go through this step
				if (this.letGuessed.includes(keyToCheck.toUpperCase()) === false){
					this.failSound.play();
					this.remGuesses -= 1;
					this.changeDocValue("guessesRem", this.remGuesses);
					//This adds the letter wrongly guessed to the letters guessed list
					this.letGuessed += keyToCheck.toUpperCase() + " ";
					this.changeDocValue("lettersGuessed", this.letGuessed);

					//This code changes the hangman image. All the images are name chronologically starting at 1, so this code
					//automatically grows through updating it with every letter wrongly guessed.
					document.getElementById("hangmanImg").src = "assets/images/sm" + (-(this.remGuesses-8)) + ".png";
					this.gameStateCheck();
				}

				else {
					this.dudSound.play();
				}
			}
		}
	},

	//This is the method that occurs every time someone clicks anything on the keyboard.
	gameClick: function (e) {

		//If the player clicks when the game is not in play mode, it will reset and start a game.
		if (this.playing === false){
			this.resetGame();
			this.changeDocValue("gameStateText", "Guess the word!");
			this.playing = true;

			//This is the code to generate a new guessed word from the list and use a loop to go through
			//the spaces row and fill it out according to how many letters are needed.
			this.wordToGuess = this.words[Math.floor(Math.random() * this.words.length)];
			for (var i = 0; i < this.wordToGuess.length; i++) {
				this.spaces[i].style.display = "block";
			}
		}

		//If the player IS playing and clicks...
		else {
		    this.letterCheck(e.key);               
		}
	},

	//This method checks if the game is over with a win or a loss.
	gameStateCheck: function (){
		//If there are no guesses remaining...
		if (this.remGuesses < 1){
			this.changeDocValue("gameStateText", "Game Over! Click to start again.");
			this.loseSound.play();
			this.playing = false;

			//fills in word if player loses
			for (var i = 0; i < this.wordToGuess.length; i++){
				this.letters[i].innerHTML = this.wordToGuess[i];
				this.letters[i].style.display = "block";
			}
		}

		//if the game is still going on.
		else {
			//A placeholder word of the accrued successful letter guesses is made for comparison
			var placeHolderWord = "";
			for (var i = 0; i < this.wordToGuess.length; i++){
				placeHolderWord += this.letters[i].textContent;
			}

			//If the letters guessed correctly add up to make the word to guess, the player wins.
			if (this.wordToGuess === placeHolderWord){
				this.wins += 1;
				this.changeDocValue("numberOfWins", this.wins);
				this.playing = false;
				this.changeDocValue("gameStateText", "You Win! Click to start again.");
				this.winSound.play();

			}
		}
	},

};

//This code below starts us off by invoking a reset of the game and assigning the window on key presses to gameClick.
hangmanGame.resetGame();
document.onkeypress = function (event){
	hangmanGame.gameClick(event);
}

