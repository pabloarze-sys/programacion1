// Elementos del DOM
const canvas = document.getElementById('matrixCanvas');
const fillButton = document.getElementById('fillBtn');
const clearButton = document.getElementById('clearBtn');
const incrementButton = document.getElementById('incrementBtn');

// Botones para los ejercicios del práctico
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

// Contexto de dibujo
const context = canvas.getContext('2d');

// Instancia de la clase Matrix (10x10)
const matrix = new Matrix(10, 10, 0);

// Inicializa el canvas y dibuja la matriz
function initializeCanvas() {
  drawMatrix();
  window.addEventListener('resize', drawMatrix);
  fillButton.addEventListener('click', fillMatrix);
  clearButton.addEventListener('click', clearCanvas);
  incrementButton.addEventListener('click', fillIncrementRows);

  // Asignación de eventos a los botones de ejercicios
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
}

// Dibuja la matriz en el canvas
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

      // Asignación de colores por valor
      if (value === 0) context.fillStyle = '#FFFFFF';       // Blanco
      else if (value === 1) context.fillStyle = '#004679';  // Azul UCB
      else if (value === 2) context.fillStyle = '#FFCF00';  // Amarillo UCB
      else context.fillStyle = '#B0B0B0';                   // Gris neutro

      // Dibuja el fondo de la celda
      context.fillRect(x, y, cellWidth, cellHeight);

      // Borde de celda
      context.strokeStyle = '#5A6675';
      context.lineWidth = 1;
      context.strokeRect(x, y, cellWidth, cellHeight);

      // Sombra ligera para resaltar
      context.shadowColor = 'rgba(0, 0, 0, 0.1)';
      context.shadowBlur = 3;

      // Dibuja el valor en el centro
      context.fillStyle = value === 0 ? '#555' : '#fff';
      context.fillText(value, x + cellWidth / 2, y + cellHeight / 2);
    }
  }
}

// Llena la matriz con valores aleatorios
function fillMatrix() {
  matrix.fillRandom(0, 9);
  drawMatrix();
}

// Incremento por filas
function fillIncrementRows() {
  matrix.fillIncrementRows();
  drawMatrix();
}

// Limpia el canvas
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// ----------------------------
// FUNCIONES DE LOS EJERCICIOS
// ----------------------------
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

// Ejecuta la inicialización
initializeCanvas();
