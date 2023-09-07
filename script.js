const boardContainer = document.querySelector(".board");
const closeModal = document.querySelector(".del");
const alertContainer = document.querySelector(".alert-container");
const play = document.querySelector(".play");
// ########################################################################
// MAKE BOARD

const sudokuPatterns = [
  [
    // fine
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
  ],
  [
    // fine
    [0, 2, 0, 0, 0, 0, 0, 1, 0],
    [9, 0, 0, 2, 0, 3, 0, 0, 5],
    [0, 0, 6, 0, 0, 0, 7, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 4, 0],
    [8, 0, 0, 0, 4, 0, 0, 0, 6],
    [0, 1, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 8, 0, 0, 0, 3, 0, 0],
    [4, 0, 0, 5, 0, 7, 0, 0, 8],
    [0, 3, 0, 0, 0, 0, 0, 2, 0],
  ],
  [
    // fine
    [1, 0, 0, 0, 0, 7, 0, 9, 0],
    [0, 3, 0, 0, 2, 0, 0, 0, 8],
    [0, 0, 9, 6, 0, 0, 5, 0, 0],
    [0, 0, 5, 3, 0, 0, 9, 0, 0],
    [0, 1, 0, 0, 8, 0, 0, 0, 2],
    [6, 0, 0, 0, 0, 4, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 4, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 7, 0, 0, 0, 3, 0, 0],
  ],
  [
    // fine
    [0, 7, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 8, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    // fine
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  [
    // fine
    [0, 1, 0, 0, 7, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 7, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    // fine
    [0, 3, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 5, 0],
    [7, 0, 6, 0, 0, 0, 0, 0, 9],
    [0, 0, 0, 0, 0, 0, 0, 8, 0],
    [0, 0, 0, 0, 1, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 9, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    // fine
    [1, 0, 0, 0, 0, 7, 0, 9, 0],
    [0, 3, 0, 0, 2, 0, 0, 0, 8],
    [0, 0, 9, 6, 0, 0, 5, 0, 0],
    [0, 0, 5, 3, 0, 0, 9, 0, 0],
    [0, 1, 0, 0, 8, 0, 0, 0, 2],
    [6, 0, 0, 0, 0, 4, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 4, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 7, 0, 0, 0, 3, 0, 0],
  ],
];

// You can access each pattern using sudokuPatterns[index]

const fillBoard = function (e) {
  const idx = Math.trunc(Math.random() * sudokuPatterns.length);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let iValue = document.querySelector(`.input-field-${i}${j}`);
      if (Number(sudokuPatterns[idx][i][j]) > 0)
        iValue.value = sudokuPatterns[idx][i][j];
    }
  }
};

function clearBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let iValue = document.querySelector(`.input-field-${i}${j}`);
      iValue.value = "";
    }
  }
}

const makeBoard = function (e) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let newBlock = document.createElement("div");
      newBlock.classList.add(`b-${i}${j}`);
      newBlock.classList.add(`block`);
      let ip = document.createElement("input");
      ip.classList.add(`input-field-${i}${j}`);
      ip.classList.add("input-field");
      ip.type = "number";
      ip.max = "9";
      ip.min = "1";
      ip.placeholder = "";
      newBlock.append(ip);
      boardContainer.append(newBlock);
    }
  }
  fillBoard();
};
makeBoard();

const alertWindow = function () {
  alertContainer.classList.remove("hidden");
};

closeModal.addEventListener("click", function () {
  alertContainer.classList.add("hidden");
});

// PLAY

play.addEventListener("click", function () {
  clearBoard();
  fillBoard();
});

// ----------------------------------------------------------------------------

// ############################################################################
// SOLVING SUDOKU

const solveSudoku = function () {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let iValue = document.querySelector(`.input-field-${i}${j}`);
      if (iValue.value == "") {
        for (let t = 1; t < 10; t++) {
          let chk = checkSequenceValidity(t, i, j);
          if (chk) {
            iValue.value = t;
            if (solveSudoku()) {
              return true;
            }
            iValue.value = "";
          }
        }
        return false;
      }
    }
  }
  return true;
};

// ----------------------------------------------------------------------------

// ############################################################################
// checking validity of every value
const checkSequenceValidity = function (inputField, k, l) {
  if (inputField == "") return true;
  //column check
  for (let i = 0; i < 9; i++) {
    const iValue = document.querySelector(`.input-field-${i}${l}`);
    if (i != k && iValue.value == inputField) {
      return false;
    }
  }

  for (let j = 0; j < 9; j++) {
    const iValue = document.querySelector(`.input-field-${k}${j}`);
    if (j != l && iValue.value == inputField) {
      return false;
    }
  }

  let r = Math.trunc(k / 3) * 3;
  let s = Math.trunc(l / 3) * 3;
  for (let i = r; i < r + 3; i++) {
    for (let j = s; j < s + 3; j++) {
      const iValue = document.querySelector(`.input-field-${i}${j}`);
      if (k != i && l != j && iValue.value == inputField) {
        return false;
      }
    }
  }

  return true;
};

// ----------------------------------------------------------------------------

// ############################################################################
// BUTTON to check validity of a fiven input
const checkValid = function (e) {
  // let cnt = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const inputField = document.querySelector(`.input-field-${i}${j}`);
      if (Number(inputField.value) > 0 && Number(inputField.value) <= 9) {
        // cnt++;
        applyColor();
      }
      if (
        inputField.value != "" &&
        (inputField.value < 1 || inputField.value > 9)
      ) {
        return false;
      }

      if (
        inputField.value != "" &&
        !checkSequenceValidity(inputField.value, i, j)
      ) {
        return false;
      }
    }
  }
  // if (cnt < 17) return false;
  return true;
};

// ----------------------------------------------------------------------------

// ############################################################################
// Function call Checking values validity provided by user

const checkValues = function (e) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      //checking if the sequence given by the user is solvable or not
      if (checkValid()) {
        solveSudoku();
        return;
      } else {
        alertWindow();
        return;
      }
    }
  }
};

// ----------------------------------------------------------------------------

// #############################################################################
// BUTTON to check validity

const btnSubmit = document.querySelector(".btn-submit");
btnSubmit.addEventListener("click", displayValues);
function displayValues(e) {
  e.preventDefault();
  console.log("hey");
  checkValues();
  console.log("bye");
}

// ----------------------------------------------------------------------------
// BUTTON to check validity

const btnClear = document.querySelector(".btn-clear");
btnClear.addEventListener("click", clearBoard);

// ----------------------------------------------------------------------------

const applyColor = function () {
  const colr = ["#fcc2d7", "#c2255c"];
  const fColor = ["#fff", "#e3fafc"];

  let cnt = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let r = Math.trunc(i / 3) * 3;
      let s = Math.trunc(j / 3) * 3;
      for (let a = r; a < r + 3; a++) {
        for (let b = s; b < s + 3; b++) {
          const iValue = document.querySelector(`.input-field-${a}${b}`);
          iValue.style.backgroundColor = `${colr[cnt % 2]}`;
          iValue.style.color = `${fColor[cnt % 2]}`;
        }
      }
      cnt++;
    }
  }
};
applyColor();

setTimeout(function () {
  document.querySelector(".w-container").classList.add("hidden");
}, 2000);
