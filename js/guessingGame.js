//get rid of global variables?

$(document).ready(function(){
	newGame();
});

/* **** Global Variables **** */
var winningNumber;
var allPlayersGuesses;
var remainingGuesses;
var gameWon = false;
/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	var winningNumber= Math.floor(Math.random()*100 + 1);
	console.log(winningNumber);
	return winningNumber;
}


// Fetch the Players Guess

function submitGuess(event){
	event.preventDefault();
	if (!gameWon){
		var playersGuess = playersGuessSubmission();
		checkGuess(playersGuess);
	}
}

function playersGuessSubmission(){
	var playersGuessStr = document.getElementById('guess').value;
	var playersGuess = Number(playersGuessStr);
	document.getElementById('guess').value = '';
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
		distance = 'You win ' + winningNumber + ' jelly beans!!' ;
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
	var advice = '';
	var countdown = '';

	//check for invaid & duplicate guesses	
	var invalidGuess = checkInvalid(playersGuess);
	var duplicateGuess = checkDuplicate(playersGuess);

	if(invalidGuess){
		advice = 'Please guess a number between 1 and 100!'
		countdown = 'You have ' + remainingGuesses + ' guesses remaining.';
	}else if(duplicateGuess){
		advice = 'You already guessed ' + playersGuess + '! Guess something else!';
		countdown = 'You have ' + remainingGuesses + ' guesses remaining.';
			
	}else{
		//get advice message
		advice = guessMessage(playersGuess);
		if(playersGuess===winningNumber){
			gameWon = true;
			countdown = '';
			$('#hint').text('');
			beanPile(); //call fun stuff
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

//Check that the guess is a number and is within the appropriate range
function checkInvalid(playersGuess){
	if(isNaN(playersGuess) || playersGuess>100 || playersGuess<=0){
		return true;
	}else{
		return false;
	}
}
//Search array of previous guesses for the current guess
function checkDuplicate(playersGuess){
	for(var i = 0; i < allPlayersGuesses.length; i++){
		if(playersGuess === allPlayersGuesses[i]){
			return true;
		}else{
			return false;
		}
	}
}

// Create a provide hint button that provides additional clues to the "Player"
//add function to present a new array of 3 options if one has already been given
function provideHint(){
	var hint = '';
	var hintArray = [winningNumber];
	if(remainingGuesses==10){
		hint = 'Make some guesses, then get a hint!';
	}else if (remainingGuesses >= 7){
		hint = 'Make some MORE guesses, then get a hint!';
	}else if(remainingGuesses >= 4){
		if(winningNumber%2===0){
			hint = 'There is an even number of jelly beans.';
		}else{
			hint = 'There is an odd number of jelly beans.';
		}
	}else if(remainingGuesses >= 1){
		if($('#hint').hasClass('hintArray')){
			hint = $('#hint').text();
		}else{
			hint = 'There are either '
			//generate one or more wild geese
			hintArray = generateWildGoose(3, hintArray);
			hint = arrayToSentence(hintArray);
			$('#hint').addClass('hintArray');
		}
	}else{
		hint = 'There were ' + winningNumber + ' jelly beans.';
	}

	$('#hint').text(hint);
}

//generates a helpful sentence from the array
function arrayToSentence(arr){
	var hint = '';
	for(var i = 0; i < arr.length; i++){
		if(i===arr.length-1){
			hint = hint + ' or ' + arr[i] + ' jelly beans.';
		}else{
			hint = hint + arr[i] + ', ';
		}
	}	
	return hint;
}

//generates array with random numbers, includes the winning number
function generateWildGoose(count, wildGooseArr){
	for(var j = count; j>0; j--){
		var wildGoose = Math.floor(Math.random()*100 + 1);
		for (var i = 0; i < wildGooseArr.length; i++){
			if (wildGoose === wildGooseArr[i]){
				generateWildGoose();
			}
		}
		wildGooseArr.push(wildGoose);
	}
	return randomizeArray(wildGooseArr);
}

//returns array in randomized order
function randomizeArray(myArray){
	var myIndex = myArray.length;
	var tempValue;
	var randomIndex;
	while(0 !== myIndex){
		randomIndex = Math.floor(Math.random()*myIndex);
		myIndex -=1;
		tempValue = myArray[myIndex];
		myArray[myIndex] = myArray[randomIndex];
		myArray[randomIndex] = tempValue;
	}
	return myArray;
}

// Allow the "Player" to Play Again
function newGame(){
	gameWon = false;
	winningNumber = generateWinningNumber();
	allPlayersGuesses = [];
	remainingGuesses = 10;
}
	

//array of pictures for win
var pictures = ['yellow','red','blue','green','purple','pink'];

//give the winner jelly beans
function beanPile(){
	var i = 0;
	function myLoop(){
		setTimeout(function(){
			var randPicIndex = Math.floor(Math.random()*pictures.length);
			var picSrc = pictures[randPicIndex];

			$('#gameBoard').append('<img id="bean' + i + '" class="bean" src="img/' + picSrc + 'Bean.gif"/>');
			
			var left = generateRandomForPlacement($('#gameBoard').width()-50);
			var top = generateRandomForPlacement($('#gameBoard').height()-40);;
			$('.bean').last().css({'position':'aboslute', 'top': top + 'px', 'left': left + 'px'});
			i++

			if (i<winningNumber){
				myLoop();
			}

		},1000/i)
	}
	myLoop();
}

//generate random numbers for placement of jelly beans
function generateRandomForPlacement(max){
	return Math.floor(Math.random()*(max-(2*max/3))) + (2*max/3);
}


/* **** Event Listeners/Handlers ****  */
	$('#guessForm').on('submit', function(event){
		submitGuess(event);
	});
	$('#submit').on('click', function(event){
		submitGuess(event);
	});
	$('#getHint').on('click', function(event){
		event.preventDefault();
		if(!gameWon){
			provideHint();
		}
	})
	$('#playAgain').on('click', function(event){
		event.preventDefault();
		newGame();
	})