// Grabbing my elements from my index.html
const gameButtons = document.querySelectorAll(".button-option");
const popupContainer = document.querySelector(".popup");
const newGameButton = document.getElementById("new-game");
const restartButton = document.getElementById("restart");
const messageDisplay = document.getElementById("message");

// Array storing all the possible win conditions
const winConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// turn = true is for X
// turn = false is for O
// moveCount tracks the number of moves made (to check for a draw)
let turn = true;
let moveCount = 0;

// function that disables the board when the game has ended
// loops through all buttons and disables them
// displays the popup message
const disableGameButtons = () => {
  gameButtons.forEach(button => button.disabled = true);
  popupContainer.classList.remove("hide");
};

// function to reset the board for a new game
// loops through all buttons, clears them so they're ready to go again
// hides the popup message
const enableGameButtons = () => {
  gameButtons.forEach(button => {
    button.innerText = "";
    button.disabled = false;
  });
  popupContainer.classList.add("hide");
};

// If the win conditions are met
// function to handle the massive W
// disables the board and displays which player has won
const handleWin = (winningPlayer) => {
  disableGameButtons();
  messageDisplay.innerHTML = `${winningPlayer} has won!!!`;
};

// function to handle a draw
// disables the board and displays a draw message
const handleDraw = () => {
  disableGameButtons();
  messageDisplay.innerHTML = "It's a Draw";
};

// function to restart the game
// it resets the counters and clears the board
const resetGame = () => {
  moveCount = 0;
  turn = true;
  enableGameButtons();
};

// Event listeners for new game and restart
newGameButton.addEventListener("click", resetGame);
restartButton.addEventListener("click", resetGame);

// function to check for a win after each move
// loops through the win conditions
// if statement checks that all three buttons have the same symbol
// if so, the handleWin function is called
const checkForWin = () => {
  for (const combination of winConditions) {
    const [first, second, third] = combination.map(
      index => gameButtons[index].innerText
    );

    if (first && first === second && second === third) {
      handleWin(first);
    }
  }
};

// loops through each button
// the event listener waits for a click
// ternary operator sets if it is X's or O's turn
// the button is then disabled to stop it being changed
// turn is then switched to the other player and moveCount is incremented
// the checkForWin function is called to see if the game has been won
// if moveCount reaches 9, handleDraw function is called
gameButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.innerText = turn ? "X" : "O";
    button.disabled = true;

    turn = !turn;
    moveCount++;

    checkForWin();

    if (moveCount === 9) {
      handleDraw();
    }
  });
});

