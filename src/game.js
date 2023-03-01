import { dictionary } from "./dictionary.js";

const state = {
  // a random word from the dictionary
  secret: dictionary[Math.floor(Math.random() * dictionary.length)],
  // an array of 6 arrays with 5 empty strings in each
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill("")),
  currentRow: 0,
  currentColumn: 0,
};

// update the textContent of each div.box to the corresponding value in state.grid
function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

/* append a div.grid child to the container, and inside that grid, create div.box with ids from box00 to box54*/
function drawGrid(container) {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  container.appendChild(grid);

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.id = `box${i}${j}`;
      grid.appendChild(box);
    }
  }
}

function checkSingleAlpha(key) {
  if (key.length === 1) {
    if (key.match(/[a-z]/i)) {
      return true;
    }
  }
  return false;
}

function addLetter(key) {
  if (state.currentColumn === 5) return;
  state.grid[state.currentRow][state.currentColumn] = key;
  state.currentColumn++;
}

function removeLetter() {
  if (state.currentColumn === 0) return;
  state.grid[state.currentRow][state.currentColumn - 1] = "";
  state.currentColumn--;
}

// check if the word is in the dictionary
function validateWord(word) {
  return dictionary.includes(word);
}

/**
 *
 * given a letter and its position in a word, check if each letter is one of the following states:
 * 1. the letter is in the secret and is in the correct position
 * 2. the letter is in the secret but is in the wrong position
 * 3. the letter is not in the secret
 */
function checkWord(letter, position) {
  if (state.secret.includes(letter)) {
    if (state.secret.indexOf(letter) === position) {
      return 1;
    } else {
      return 2;
    }
  } else {
    return 3;
  }
}

function colorBoxes(guess) {
  const animationDuration = 500;

  for (let i = 0; i < guess.length; i++) {
    const box = document.getElementById(`box${state.currentRow}${i}`);
    const letter = guess[i];
    const position = i;
    const result = checkWord(letter, position);

    box.style.animationDelay = `${(i * animationDuration) / 2}ms`;
    box.classList.add("animated");
    setTimeout(() => {
      if (result === 1) {
        box.classList.add("correct");
      }
      if (result === 2) {
        box.classList.add("almost");
      } else {
        box.classList.add("wrong");
      }
    }, (i * animationDuration) / 2);
  }
}

function revealWord(guess) {
  colorBoxes(guess);

  const hasWon = state.secret === guess;
  const isGameOver = state.currentRow === 5;

  if (hasWon) {
    alert("You won! Yaaay!");
  } else if (isGameOver) {
    alert(`Game over! The word was "${state.secret}".`);
  }
}

function handleEnterKey() {
  if (state.currentColumn === 5) {
    const guess = state.grid[state.currentRow].join("");
    if (validateWord(guess) === true) {
      revealWord(guess);
      state.currentRow++;
      state.currentColumn = 0;
    } else {
      alert("Not a valid word.");
    }
  }
}

function registerTyping() {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      handleEnterKey();
    }

    if (key === "Backspace") {
      removeLetter();
    }
    if (checkSingleAlpha(key) === true) {
      addLetter(key);
    }

    updateGrid();
  };
}

function initialiseGame() {
  const game = document.getElementById("game");
  drawGrid(game);

  registerTyping();
  console.log(state.secret);
}

initialiseGame();
