// ===== game.js (canvas-only, listo para jugar) =====

// Canvas y contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Grid
const box = 20;
const GRID_W = 30;
const GRID_H = 30;
canvas.width  = GRID_W * box; // 600
canvas.height = GRID_H * box; // 600

// Estado
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
let targetPoints = 50;

// Nivel 2: manzana plateada (una a la vez)
let allowSilver = false;
let silverValue = 20;
let silverRespawnMs = 5000;
let silverActive = false;
let silverPos = null;
let silverTimer = null;

// ===== Inicio del juego =====
function startGame(levelData) {
  if (!levelData) return;

  currentLevelNumber = levelData.number;

  snake = [{
    x: Math.floor(GRID_W / 2) * box,
    y: Math.floor(GRID_H / 2) * box
  }];
  direction = "RIGHT";
  score = 0;

  currentFruitColor = levelData.fruitColor ?? "red";
  currentFruitValue = levelData.fruitValue ?? 10;
  currentObstacles  = levelData.obstacles || [];
  speed             = levelData.speed || 150;
  targetPoints      = levelData.targetPoints || 50;

  allowSilver     = !!levelData.allowSilver;
  silverValue     = levelData.silverValue ?? 20;
  silverRespawnMs = levelData.silverRespawnMs ?? 5000;
  stopSilver();
  if (allowSilver) scheduleSilver();

  food = randomFreeCell();

  clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, speed);

  document.onkeydown = changeDirection;

  setScoreUI(0);
}

// ===== Utilidades =====
function randomFreeCell() {
  let c;
  do {
    c = {
      x: Math.floor(Math.random() * GRID_W) * box,
      y: Math.floor(Math.random() * GRID_H) * box
    };
  } while (
    snake.some(s => s.x === c.x && s.y === c.y) ||
    currentObstacles.some(o => (o.x * box === c.x && o.y * box === c.y)) ||
    (silverActive && silverPos && silverPos.x === c.x && silverPos.y === c.y)
  );
  return c;
}

function changeDirection(e) {
  if (e.key === "ArrowLeft"  && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp"    && direction !== "DOWN")  direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT")  direction = "RIGHT";
  else if (e.key === "ArrowDown"  && direction !== "UP")    direction = "DOWN";
}

// ===== Bucle =====
function drawGame() {
  // Fondo
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Obstáculos
  ctx.fillStyle = "#ffffff";
  currentObstacles.forEach(obs => {
    ctx.fillRect(obs.x * box, obs.y * box, box, box);
  });

  // Próxima cabeza
  let headX = snake[0].x;
  let headY = snake[0].y;
  if (direction === "LEFT")  headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP")    headY -= box;
  if (direction === "DOWN")  headY += box;

  const newHead = { x: headX, y: headY };

  // Colisiones duras (no se sale)
  if (headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height) { endGame(); return; }
  if (snakeCollision(newHead)) { endGame(); return; }
  if (obstacleCollision(newHead)) { endGame(); return; }

  // Comer plateada
  let grew = false;
  if (allowSilver && silverActive && silverPos && headX === silverPos.x && headY === silverPos.y) {
    score += silverValue;
    grew = true;
    removeSilver();
  }

  // Comer normal
  if (headX === food.x && headY === food.y) {
    score += currentFruitValue;
    grew = true;
    food = randomFreeCell();
  }

  if (!grew) snake.pop();
  snake.unshift(newHead);

  // ===== Dibujo en canvas =====
  // Comida normal
  ctx.fillStyle = currentFruitColor || "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Plateada (si hay)
  if (allowSilver && silverActive && silverPos) {
    ctx.fillStyle = "#cbd5e1"; // gris claro
    ctx.fillRect(silverPos.x, silverPos.y, box, box);
  }

  // Serpiente
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  setScoreUI(score);

  // ¿Meta alcanzada?
  if (score >= targetPoints) {
    clearInterval(gameInterval);
    stopSilver();
    if (typeof levelComplete === "function") levelComplete(score);
    else endGame(true);
  }
}

// ===== Colisiones =====
function snakeCollision(head) {
  return snake.some((seg, i) => i > 0 && seg.x === head.x && seg.y === head.y);
}
function obstacleCollision(head) {
  return currentObstacles.some(obs => head.x === obs.x * box && head.y === obs.y * box);
}

// ===== Fin =====
function endGame(completed = false) {
  clearInterval(gameInterval);
  stopSilver();
  if (completed) {
    playLevelUpSound && playLevelUpSound();
    alert(`✅ ¡Nivel ${currentLevelNumber} completado!\nPuntaje: ${score}`);
    unlockPlayerLevel && unlockPlayerLevel(currentLevelNumber);
    unlockNextLevel && unlockNextLevel(currentLevelNumber);
  } else {
    playGameOverSound && playGameOverSound();
    alert(`🐍 Fin del juego, ${getPlayerName ? getPlayerName() : "Jugador"}!\nPuntaje: ${score}`);
  }
  document.getElementById("game-screen").classList.remove("active");
  document.getElementById("menu-screen").classList.add("active");
  if (typeof updateLevelButtons === "function") updateLevelButtons();
}

// ===== UI =====
function setScoreUI(v) {
  const s = document.getElementById("score");
  if (s) s.textContent = String(v);
}

// ===== Plata =====
function scheduleSilver() {
  if (silverTimer) clearInterval(silverTimer);
  silverTimer = setInterval(() => { if (!silverActive) spawnSilver(); }, silverRespawnMs);
}
function stopSilver() { if (silverTimer) clearInterval(silverTimer); silverTimer = null; removeSilver(); }
function spawnSilver() { if (silverActive) return; silverPos = randomFreeCell(); silverActive = true; }
function removeSilver() { silverActive = false; silverPos = null; }

// ===== Export =====
window.startGame = startGame;
