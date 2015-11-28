$(document).ready(function(){
	console.log('doc ready called');
	$('#guessForm').on('submit', function(event){
		submitGuess(event);
	});
	$('#submit').on('click', function(event){
		submitGuess(event);
	});
});

/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var winningNumber = generateWinningNumber();
var allPlayersGuesses = [];
var remainingGuesses = 10;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	var winningNumber= Math.floor(Math.random()*100 + 1);
	console.log('new winningNumber is ' + winningNumber);
	return winningNumber;
}


// Fetch the Players Guess

function submitGuess(event){
	event.preventDefault();
	var playersGuess = playersGuessSubmission();
	checkGuess(playersGuess);
}

function playersGuessSubmission(){
	console.log('playersGuessSubmission called');
	var playersGuessStr = document.getElementById('guess').value;
	var playersGuess = Number(playersGuessStr);
	document.getElementById('guess').value = '';
	console.log('playersGuess is ' + playersGuess);
	return playersGuess;
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(playersGuess){
	var lowHigh = '';
	if(playersGuess<winningNumber){
		lowHigh = 'That is not enough jelly beans! ';
	}else if(playersGuess>winningNumber){
		lowHigh = 'That is too many jelly beans! ';
	}else{
		lowHigh = 'That is exactly right! '
	};
	return lowHigh;
}

//Create the advice message

function guessMessage(playersGuess){
	var diff = Math.abs(playersGuess - winningNumber);
	var distance = 'Your guess is ';
	var advice = '';
	if(diff === 0){
		distance = distance + 'perfect!!!!';
	}else if(diff >= 50){
		distance = distance + 'at least 50 jelly beans off!';
	}else if(diff >= 25){
		distance = distance + 'at least 25 jelly beans off!';
	}else if(diff <= 10){
		distance = distance + 'within 10 jelly beans of the correct number!';
	}else if(diff < 25){
		distance = distance + 'within 24 jelly beans of the correct number!';
	}
	lowHigh = lowerOrHigher(playersGuess);
	advice = lowHigh + distance;
	return advice;
}

// Check if the Player's Guess is the winning number 

function checkGuess(playersGuess){
	var newGuess = true;
	var advice = '';
	var countdown = '';

	//check for invaid guesses
	if(playersGuess === NaN || playersGuess>100 || playersGuess<=0){
		//find guesses that aren't numbers or aren't in the 1-100 range
		newGuess = false;
		advice = 'Please guess a number between 1 and 100!'
		countdown = 'You have ' + remainingGuesses + ' guesses remaining.';
	}else{
		//find duplicate guesses
		for(var i = 0; i < allPlayersGuesses.length; i++){
			if(playersGuess === allPlayersGuesses[i]){
				newGuess = false;
				advice = 'You already guessed ' + playersGuess + '! Guess something else!';
				countdown = 'You have ' + remainingGuesses + ' guesses remaining.';
				break;
			}
		}
	}

	//for valid guesses get the message string
	if (newGuess){
		//get advice message
		advice = guessMessage(playersGuess);
		if(playersGuess===winningNumber){
			countdown = '';
		}else{
			//countdown remaining guesses
			remainingGuesses -= 1;
			allPlayersGuesses.push(playersGuess);
			countdown = 'You have ' + remainingGuesses + ' guesses remaining.';
		}
	}
		$('#advice').text(advice);
		$('#countdown').text(countdown);
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */

