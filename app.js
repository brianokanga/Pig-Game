/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

//other notes
// var x = document.querySelector('#score-0').textContent;
// console.log(x);

//changing markup (setters)
//document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML =
// 	'<strong>' + dice + '</strong>';

//selecting a markup content  (getter)

//start
let scores, roundScore, activePlayer, dice, gamePlaying;
init ();

let lastDice;

// Event listeners are functions that alert when an event happens
document.querySelector ('.btn-roll').addEventListener ('click', function () {
  if (gamePlaying) {
    //1. Rondom number Generation
    dice = Math.floor (Math.random () * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector ('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. update the round score if the rolled number wasnt one
    if (dice === 6 && lastDice === 6) {
      //player loses entire score
      scores[activePlayer] = 0;
      document.querySelector ('#score-' + activePlayer).textContent = '0';
      nextPlayer ();
    } else if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector (
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer ();
    }
    // storing players previous score
    lastDice = dice;
  }
});

//Hold button event listener
document.querySelector ('.btn-hold').addEventListener ('click', function () {
  if (gamePlaying) {
    //Add Current score to the global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector ('#score-' + activePlayer).textContent =
      scores[activePlayer];

    //setting to winning score(player can change it even mid game)
    var input = document.querySelector ('.final-score').value;
    var winningScore;
    //Undefined, 0, null or "" are coerced to false
    //anything else is coerced to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    console.log (input);

    //Check if player has won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector ('#name-' + activePlayer).textContent = 'winner';
      document.querySelector ('.dice').style.display = 'none';
      document
        .querySelector ('.player-' + activePlayer + '-panel')
        .classList.add ('winner');
      document
        .querySelector ('.player-' + activePlayer + '-panel')
        .classList.remove ('active');
      gamePlaying = false;
    } else {
      //next player
      nextPlayer ();
    }
  }
});

function nextPlayer () {
  //next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById ('current-0').textContent = '0';
  document.getElementById ('current-1').textContent = '0';

  //removing and adding classes
  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector ('.player-0-panel').classList.toggle ('active');
  document.querySelector ('.player-1-panel').classList.toggle ('active');

  //hide the dice
  document.querySelector ('.dice').style.display = 'none';
}

//New Game button event listener
document.querySelector ('.btn-new').addEventListener ('click', init);

function init () {
  //Reset the game
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  //changing CSS styles
  document.querySelector ('.dice').style.display = 'none';

  document.getElementById ('score-0').textContent = '0';
  document.getElementById ('score-1').textContent = '0';
  document.getElementById ('current-0').textContent = '0';
  document.getElementById ('current-1').textContent = '0';
  document.getElementById ('name-0').textContent = 'player 1';
  document.getElementById ('name-1').textContent = 'player 2';
  document.querySelector ('.player-0-panel').classList.remove ('winner');
  document.querySelector ('.player-1-panel').classList.remove ('winner');
  document.querySelector ('.player-0-panel').classList.remove ('active');
  document.querySelector ('.player-1-panel').classList.remove ('active');
  document.querySelector ('.player-0-panel').classList.add ('active');
}
