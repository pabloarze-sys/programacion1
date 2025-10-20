// Elementos
const canvas = document.getElementById('matrixCanvas');
const fillButton = document.getElementById('fillBtn');
const clearButton = document.getElementById('clearBtn');
const incrementButton = document.getElementById('incrementBtn');

// Botones para los EJ
const ex1Btn = document.getElementById('ex1Btn');
const ex2Btn = document.getElementById('ex2Btn');
const ex3Btn = document.getElementById('ex3Btn');
const ex4Btn = document.getElementById('ex4Btn');
const ex5Btn = document.getElementById('ex5Btn');
const ex6Btn = document.getElementById('ex6Btn');
const ex7Btn = document.getElementById('ex7Btn');
const ex8Btn = document.getElementById('ex8Btn');
const ex9Btn = document.getElementById('ex9Btn');
const ex10Btn = document.getElementById('ex10Btn');
const ex11Btn = document.getElementById('ex11Btn');
const ex12Btn = document.getElementById('ex12Btn');
const ex13Btn = document.getElementById('ex13Btn');
const ex14Btn = document.getElementById('ex14Btn');
const ex15Btn = document.getElementById('ex15Btn');
const ex16Btn = document.getElementById('ex16Btn');
const ex17Btn = document.getElementById('ex17Btn');
const ex18Btn = document.getElementById('ex18Btn');
const ex19Btn = document.getElementById('ex19Btn');
const ex20Btn = document.getElementById('ex20Btn');
const ex21Btn = document.getElementById('ex21Btn');
const ex22Btn = document.getElementById('ex22Btn');

const context = canvas.getContext('2d');

const matrix = new Matrix(10, 10, 0);

function drawMatrix() {
  const width = (canvas.width = canvas.clientWidth);
  const height = (canvas.height = canvas.clientHeight);
  const cellWidth = width / matrix.cols;
  const cellHeight = height / matrix.rows;

  context.clearRect(0, 0, width, height);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = `${Math.min(cellWidth, cellHeight) / 2.5}px Arial`;

  for (let row = 0; row < matrix.rows; row++) {
    for (let col = 0; col < matrix.cols; col++) {
      const x = col * cellWidth;
      const y = row * cellHeight;
      const value = matrix.getValue(row, col);

      if (value === 0) context.fillStyle = '#FFFFFF';
      else if (value === 1) context.fillStyle = '#004679';
      else if (value === 2) context.fillStyle = '#FFCF00';
      else context.fillStyle = '#B0B0B0';

      context.fillRect(x, y, cellWidth, cellHeight);
      context.strokeStyle = '#5A6675';
      context.lineWidth = 1;
      context.strokeRect(x, y, cellWidth, cellHeight);
      context.shadowColor = 'rgba(0, 0, 0, 0.1)';
      context.shadowBlur = 3;

      context.fillStyle = value === 0 ? '#555' : '#fff';
      context.fillText(value, x + cellWidth / 2, y + cellHeight / 2);
    }
  }
}

function initializeCanvas() {
  drawMatrix();
  window.addEventListener('resize', drawMatrix);
  fillButton.addEventListener('click', fillMatrix);
  clearButton.addEventListener('click', clearCanvas);
  incrementButton.addEventListener('click', fillIncrementRows);

  ex1Btn.addEventListener('click', fillExercise1);
  ex2Btn.addEventListener('click', fillExercise2);
  ex3Btn.addEventListener('click', fillExercise3);
  ex4Btn.addEventListener('click', fillExercise4);
  ex5Btn.addEventListener('click', fillExercise5);
  ex6Btn.addEventListener('click', fillExercise6);
  ex7Btn.addEventListener('click', fillExercise7);
  ex8Btn.addEventListener('click', fillExercise8);
  ex9Btn.addEventListener('click', fillExercise9);
  ex10Btn.addEventListener('click', fillExercise10);
  ex11Btn.addEventListener('click', fillExercise11);
  ex12Btn.addEventListener('click', fillExercise12);
  ex13Btn.addEventListener('click', fillExercise13);
  ex14Btn.addEventListener('click', fillExercise14);
  ex15Btn.addEventListener('click', fillExercise15);
  ex16Btn.addEventListener('click', fillExercise16);
  ex17Btn.addEventListener('click', fillExercise17);
  ex18Btn.addEventListener('click', fillExercise18);
  ex19Btn.addEventListener('click', fillExercise19);
  ex20Btn.addEventListener('click', fillExercise20);
  ex21Btn.addEventListener('click', fillExercise21);
  ex22Btn.addEventListener('click', fillExercise22);
}

function fillExercise1() { matrix.fillExercise1(); drawMatrix(); }
function fillExercise2() { matrix.fillExercise2(); drawMatrix(); }
function fillExercise3() { matrix.fillExercise3(); drawMatrix(); }
function fillExercise4() { matrix.fillExercise4(); drawMatrix(); }
function fillExercise5() { matrix.fillExercise5(); drawMatrix(); }
function fillExercise6() { matrix.fillExercise6(); drawMatrix(); }
function fillExercise7() { matrix.fillExercise7(); drawMatrix(); }
function fillExercise8() { matrix.fillExercise8(); drawMatrix(); }
function fillExercise9() { matrix.fillExercise9(); drawMatrix(); }
function fillExercise10() { matrix.fillExercise10(); drawMatrix(); }
function fillExercise11() { matrix.fillExercise11(); drawMatrix(); }
function fillExercise12() { matrix.fillExercise12(); drawMatrix(); }
function fillExercise13() { matrix.fillExercise13(); drawMatrix(); }
function fillExercise14() { matrix.fillExercise14(); drawMatrix(); }
function fillExercise15() { matrix.fillExercise15(); drawMatrix(); }
function fillExercise16() { matrix.fillExercise16(); drawMatrix(); }
function fillExercise17() { matrix.fillExercise17(); drawMatrix(); }
function fillExercise18() { matrix.fillExercise18(); drawMatrix(); }
function fillExercise19() { matrix.fillExercise19(); drawMatrix(); }
function fillExercise20() { matrix.fillExercise20(); drawMatrix(); }
function fillExercise21() { matrix.fillExercise21(); drawMatrix(); }
function fillExercise22() { matrix.fillExercise22(); drawMatrix(); }

function fillMatrix() {
  matrix.fillRandom(0, 9);
  drawMatrix();
}

function fillIncrementRows() {
  matrix.fillIncrementRows();
  drawMatrix();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

initializeCanvas();

