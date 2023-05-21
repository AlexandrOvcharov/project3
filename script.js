'use strict';

//Elements selection
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnStart = document.querySelector('.btn--start');
const btnRulls = document.querySelector('.btn--rulls');
const btnRullsClose = document.querySelector('.rulls__close');
const overlay = document.querySelector('.overlay');
const main = document.querySelector('.main');
const titleStart = document.querySelector('.title-start');
const rulsElement = document.querySelector('.rulls');

//vars
let totalScores, currentScore, activePlayer, isPlaying;

// initGane
const initGame = () => {
  btnStart.classList.add('hidden');
  titleStart.classList.add('hidden');
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
  diceElement.classList.add('hidden');
  btnRoll.classList.remove('hidden');
  btnNew.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  main.classList.remove('hidden');
};

btnStart.addEventListener('click', initGame);

btnRulls.addEventListener('click', () => {
  overlay.classList.remove('hidden');
});

btnRullsClose.addEventListener('click', () => {
  overlay.classList.add('hidden');
});
overlay.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

// Functions
const switchActivePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//Roll the dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

// Hold points
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    if (totalScores[activePlayer] >= 20) {
      isPlaying = false;
      diceElement.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchActivePlayer();
    }
  }
});

//reset game

btnNew.addEventListener('click', initGame);
