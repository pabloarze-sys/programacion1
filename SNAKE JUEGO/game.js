// ===== game.js =====

// Canvas y contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamaño de cada celda
const box = 20;

// Variables del juego
let snake = [];
let direction = "RIGHT";
let food = {};
let score = 0;
let gameInterval = null;
let speed = 150;

let currentFruitColor = "red";
let currentFruitValue = 10;
let currentObstacles = [];

let currentLevelNumber = 1;

// ===== Iniciar el juego =====
function startGame(levelData) {
  if (!levelData) return;

  currentLevelNumber = levelData.number;
  snake = [{
    x: Math.floor(canvas.width / 2 / box) * box,
    y: Math.floor(canvas.height / 2 / box) * box
  }];
  direction = "RIGHT";
  score = 0;
  currentFruitColor = levelData.fruitColor;
  currentFruitValue = levelData.fruitValue;
  currentObstacles = levelData.obstacles;
  speed = levelData.speed;

  food = randomFood();

  // Mostrar canvas
  canvas.style.display = "block";

  // Limpiar intervalo anterior
  clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, speed);

  // Evento de teclado
  document.onkeydown = changeDirection;

  // Mostrar puntaje
  document.getElementById("score").textContent = `Puntaje: ${score}`;
}

// ===== Generar comida aleatoria =====
function randomFood() {
  let newFood;
  let valid = false;

  while (!valid) {
    newFood = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };

    if (!snake.some(s => s.x === newFood.x && s.y === newFood.y) &&
        !currentObstacles.some(o => o.x * box === newFood.x && o.y * box === newFood.y)) {
      valid = true;
    }
  }

  return newFood;
}

// ===== Cambiar dirección de la serpiente =====
function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

// ===== Dibujar juego =====
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar obstáculos
  currentObstacles.forEach(obs => {
    ctx.fillStyle = "white";
    ctx.fillRect(obs.x * box, obs.y * box, box, box);
  });

  // Dibujar comida
  //ctx.fillStyle = currentFruitColor;
  //ctx.fillRect(food.x, food.y, box, box);

  // Dibujar serpiente
  //snake.forEach((seg, idx) => {
    //ctx.fillStyle = idx === 0 ? "green" : "lightgreen";
    //ctx.fillRect(seg.x, seg.y, box, box);
  //});

  // Nueva posición de la cabeza
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  else if (direction === "RIGHT") headX += box;
  else if (direction === "UP") headY -= box;
  else if (direction === "DOWN") headY += box;

  // Comer comida
  if (headX === food.x && headY === food.y) {
    score += currentFruitValue;
    food = randomFood();
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  // Colisiones
  if (headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height ||
      snakeCollision(newHead) || obstacleCollision(newHead)) {
    endGame();
    return;
  }

  snake.unshift(newHead);

  // Mostrar puntaje
  document.getElementById("score").textContent = `Puntaje: ${score}`;
}

// ===== Colisión con cuerpo =====
function snakeCollision(head) {
  return snake.some(seg => seg.x === head.x && seg.y === head.y);
}

// ===== Colisión con obstáculos =====
function obstacleCollision(head) {
  return currentObstacles.some(obs => head.x === obs.x * box && head.y === obs.y * box);
}

// ===== Fin del juego =====
function endGame() {
  clearInterval(gameInterval);

  playGameOverSound(); // 🔊 sonido al terminar el juego

  alert(`🐍 Fin del juego, ${getPlayerName()}!\nPuntaje: ${score}\nNivel alcanzado: ${currentLevelNumber}`);

  // Desbloquear siguiente nivel si aplica
  if (score >= 50 && currentLevelNumber < 5) { // puntaje mínimo para desbloquear
    unlockPlayerLevel(currentLevelNumber);
    unlockNextLevel(currentLevelNumber); // levels.js
    alert(`¡Desbloqueaste el Nivel ${currentLevelNumber + 1}! 🎉`);
  }

  // Volver al menú
  canvas.style.display = "none";
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("menu-screen").style.display = "block";

  // Actualizar botones
  if (typeof updateLevelButtons === "function") updateLevelButtons();
}

// ===== 🐍 VIBORITA ANIMADA VISUAL =====

// Contenedor del juego
const gameContainer = document.getElementById("game-container");
let snakeElements = [];
let foodElement = null;

// Dibujar segmentos visuales de la víbora
function renderSnakeVisual() {
  // Limpiar segmentos anteriores
  snakeElements.forEach(el => el.remove());
  snakeElements = [];

  // Crear nuevos segmentos
  snake.forEach((seg, index) => {
    const segment = document.createElement("div");
    segment.classList.add("snake-segment");
    if (index === 0) segment.classList.add("snake-head");
    segment.style.left = `${seg.x}px`;
    segment.style.top = `${seg.y}px`;
    segment.style.position = "absolute";
    segment.style.setProperty("--i", index);
    gameContainer.appendChild(segment);
    snakeElements.push(segment);
  });

  // Redibujar fruta visual
  renderFoodVisual();
}

// Dibujar fruta animada
function renderFoodVisual() {
  if (foodElement) foodElement.remove();
  foodElement = document.createElement("div");
  foodElement.classList.add("apple");
  foodElement.style.left = `${food.x}px`;
  foodElement.style.top = `${food.y}px`;
  foodElement.style.position = "absolute";
  gameContainer.appendChild(foodElement);
}

// Interceptar el bucle del juego para renderizar animaciones visuales
const originalDrawGame = drawGame;
drawGame = function() {
  originalDrawGame();  // mantiene toda la lógica original
  renderSnakeVisual(); // añade la víbora visual animada
};
