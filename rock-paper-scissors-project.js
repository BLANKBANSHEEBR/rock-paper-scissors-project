let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
  };
let lossesCounter = 0;
let isAutoPlaying = false;
let intervalID;
let autoPlayButton = document.querySelector('.js-auto-play-button');
autoPlayButton.addEventListener('click', () => controlAutoPlay());
let resetScoreButton = document.querySelector('.js-reset-score');
resetScoreButton.addEventListener('click', () => resetScore());


updateScoreElement();

document.querySelector('.js-rock-button').addEventListener('click', () => playGame('rock'));
document.querySelector('.js-paper-button').addEventListener('click', () => playGame('paper'));
document.querySelector('.js-scissors-button').addEventListener('click', () => playGame('scissors'));

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key ===  'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    controlAutoPlay();
  } else if (event.key === 'Backspace') {
    resetScore();
  }
  console.log(event.key);
});

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = 'rock';
  if (randomNumber <= 1  && randomNumber < 1/3) {
    computerMove = 'rock';
  }  else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1)  {
    computerMove = 'scissors';
  }
  return computerMove;
}
function playGame(playerMove) {
const computerMove = pickComputerMove();
let result = '';
if (playerMove === 'scissors') {
  if (computerMove === 'rock') {
  result = 'You lose.';
  } else if (computerMove === 'paper') {
    result = 'You win.';
  } else if (computerMove === 'scissors') {
    result = 'Tie.';
  }
} else if (playerMove === 'paper') {
  if (computerMove === 'rock') {
    result = 'You win.';
  } else if (computerMove === 'paper') {
    result = 'Tie.';
  } else if (computerMove === 'scissors') {
    result = 'You lose.';
  }
} else if (playerMove === 'rock') {
  if (computerMove === 'rock') {
  result = 'Tie.';
  } else if (computerMove === 'paper') {
  result = 'You lose.';
  } else if (computerMove === 'scissors') {
  result = 'You win.';
  }
}
clearClassList();
if (result === 'You win.') {
  score.wins += 1;
  document.querySelector('.js-result').classList.add('win');
  lossesCounter = 0;
} else if (result === 'You lose.') {
  score.losses += 1;
  document.querySelector('.js-result').classList.add('lose');
  lossesCounter +=1;
} else if (result === 'Tie.') {
  score.ties += 1;
  document.querySelector('.js-result').classList.add('tie');
  lossesCounter = 0;
}

document.querySelector('.result-container').classList.add('expanded')

localStorage.setItem('score', JSON.stringify(score));

if (lossesCounter >= 3) {
  document.querySelector('.happy-easter').innerHTML = `<img class="happy-merchant" src="happy-merchant.png">`;
} else {
  document.querySelector('.happy-easter').innerHTML = '';
}
document.querySelector('.js-result').innerHTML = `${result}`;

document.querySelector('.js-move').innerHTML = `You <img class="game-emoji" src="${playerMove}-emoji.png"> <img class="game-emoji" src="${computerMove}-emoji.png"> Computer`

updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties ${score.ties}`;
}

function clearClassList() {
  document.querySelector('.js-result').classList.remove('win');
  document.querySelector('.js-result').classList.remove('lose');
  document.querySelector('.js-result').classList.remove('tie');

}

function resetScore() {
  document.querySelector('.js-confirmation-container').innerHTML = 'Are you sure you want to reset the score? <button class="yes-button js-yes-button">Yes</button> <button class="no-button js-no-button">No</button>';
  let yesButton = document.querySelector('.js-yes-button');
  let noButton = document.querySelector('.js-no-button')
  yesButton.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-confirmation-container').innerHTML = ''; 
  });
  noButton.addEventListener('click', () => {
    document.querySelector('.js-confirmation-container').innerHTML = '';
  })
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }, 1000);
  isAutoPlaying = true;
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
} 

function controlAutoPlay() {
  if (isAutoPlaying) {
    autoPlay();
    autoPlayButton.innerHTML = 'Auto Play';
  } else {
    autoPlayButton.innerHTML = 'Stop Playing';
    autoPlay()
  }  
}