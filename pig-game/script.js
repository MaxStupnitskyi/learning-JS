'use strict';

const body = document.querySelector('body');

/* players */
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const dicePicture = document.querySelector('.dice');

/* buttons */
const restartBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const rulesBtn = document.querySelector('.btn--rules');

/* modal window */
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-modal');

let dice, currentMove, currentScore, score;

function start() {
	score = [0, 0];
	currentMove = 0;
	currentScore = 0;
	dicePicture.classList.add('hidden');
	rollBtn.disabled = false;
	holdBtn.disabled = false;
	for (let score of document.querySelectorAll('.score')) {
		score.textContent = 0;
	}
	for (let currentScore of document.querySelectorAll('.current-score')) {
		currentScore.textContent = 0;
	}
	if (document.querySelector('.player--winner')) document.querySelector('.player--winner').classList.remove('player--winner');
	if (!player1.classList.contains('player--active')) player1.classList.add('player--active');
	if (player2.classList.contains('player--active')) player2.classList.remove('player--active');
}

start();

function rollDice() {
	dice = Math.trunc(Math.random() * 6) + 1;
}

function changeTurn() {
	document.querySelector(`#current--${currentMove}`).textContent = 0;
	player1.classList.toggle('player--active');
	player2.classList.toggle('player--active');
	currentMove = currentMove === 0 ? 1 : 0;
	currentScore = 0;
}

function makeMove() {
	rollDice();
	dicePicture.src = `img/dice-${dice}.png`;
	if (dicePicture.classList.contains('hidden')) dicePicture.classList.remove('hidden');

	if (dice === 1) {
		changeTurn();
	} else {
		currentScore += dice;
		document.querySelector(`#current--${currentMove}`).textContent = currentScore;
	}
}

function hold() {
	if (currentScore === 0) return;
	score[currentMove] += currentScore;
	document.querySelector(`#score--${currentMove}`).textContent = score[currentMove];
	changeTurn();
	checkWinner();
}

function checkWinner() {
	for (let i = 0; i < score.length; i++) {
		if (score[i] >= 100) {
			rollBtn.disabled = true;
			holdBtn.disabled = true;
			document.querySelector(`.player--${i}`).classList.add('player--winner');
		}
	}
}

function toggleModal() {
	modal.classList.toggle('hidden');
	overlay.classList.toggle('hidden');
}

rollBtn.onclick = () => makeMove();
holdBtn.onclick = () => hold();
restartBtn.onclick = () => start();
rulesBtn.onclick = () => toggleModal();
closeButton.onclick = () => toggleModal();
overlay.onclick = () => toggleModal();

body.addEventListener('keydown', e => {
	if (e.code === 'Space') {
		e.preventDefault();
		rollBtn.click();
	}
	if (e.code === 'Enter') {
		e.preventDefault();
		holdBtn.click();
	}
	if (e.code === 'KeyR') {
		restartBtn.click();
	}
});
