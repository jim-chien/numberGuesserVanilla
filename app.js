const formEl = document.getElementById('number-form');
const inputEl = document.getElementById('number-input');
const buttonEl = document.querySelector('.submit-button');
const messageEl = document.getElementById('number-input-message');
const gameEl = document.querySelector('.container');

const minNumber = 1;
maxNumber = 10;
guessNumber = getRandomNumber();
let numberOfChances = 3;

formEl.addEventListener('submit', handleGuessNumberGame);
gameEl.addEventListener('mousedown', restartGame);

function getRandomNumber() {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) - minNumber);
}

function handleGuessNumberGame(e) {
  validateGuessNumber();
  e.preventDefault();
}

function validateGuessNumber() {
  const inputGuessNumber = parseInt(inputEl.value);
  if (isNotValidNumber(inputGuessNumber)) {
    const message = buildInputNumberValidationErrorMessage();
    return setGuessResultFeedback(message, 'failed');
  }
  return guessNumber === inputGuessNumber
    ? handleSuccessGuess()
    : handleFailedGuess();
}

function isNotValidNumber(inputGuessNumber) {
  return inputGuessNumber > maxNumber || inputGuessNumber < minNumber;
}

function buildInputNumberValidationErrorMessage() {
  return `Guess number should be between ${minNumber} and ${maxNumber}`;
}

function handleSuccessGuess() {
  const successMessage = buildSuccessMessage();
  setGuessResultFeedback(successMessage, 'success');
  gameOver();
}

function buildSuccessMessage() {
  return 'Congratulations!';
}

function setGuessResultFeedback(message, gameStatus) {
  const feedbackColor = isGuessSuccess(gameStatus) ? 'green' : 'red';
  messageEl.style.color = feedbackColor;
  messageEl.textContent = message;
  inputEl.style.borderColor = feedbackColor;
}

function isGuessSuccess(gameStatus) {
  return gameStatus === 'success';
}

function gameOver() {
  inputEl.disabled = true;
  buttonEl.type = 'button';
  buttonEl.textContent = 'Play Again';
  buttonEl.className = 'play-again-btn';
}

function handleFailedGuess() {
  subtractNumberOfChances();
  clearInput();
  failedGuessFeedback();
  if (isGameOver()) {
    gameOver();
  }
}

function subtractNumberOfChances() {
  numberOfChances--;
}

function clearInput() {
  inputEl.value = '';
}

function failedGuessFeedback() {
  const errorMessage = buildErrorMessage();
  setGuessResultFeedback(errorMessage, 'fail');
}

function isGameOver() {
  return numberOfChances === 0;
}

function buildErrorMessage() {
  return `You have ${numberOfChances} more chances to guess the right number.`;
}

function restartGame(e) {
  return e.target.className === 'play-again-btn'
    ? window.location.reload()
    : null;
}
