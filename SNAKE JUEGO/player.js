// ===== player.js =====

// Datos del jugador
let player = {
  name: "",
  totalScore: 0,
  maxLevelUnlocked: 1,
};

// ===== Guardar datos del jugador en localStorage =====
function savePlayerData() {
  localStorage.setItem("snakePlayer", JSON.stringify(player));
}

// ===== Cargar datos del jugador =====
function loadPlayerData() {
  const data = localStorage.getItem("snakePlayer");
  if (data) {
    player = JSON.parse(data);
  }
}

// ===== Establecer el nombre del jugador =====
function setPlayerName(name) {
  player.name = name;
  savePlayerData();
}

// ===== Añadir puntaje al jugador =====
function addPlayerScore(points) {
  player.totalScore += points;
  savePlayerData();
}

// ===== Desbloquear siguiente nivel =====
function unlockPlayerLevel(levelNumber) {
  if (levelNumber >= player.maxLevelUnlocked && levelNumber < 5) {
    player.maxLevelUnlocked = levelNumber + 1;
    savePlayerData();
  }
}

// ===== Obtener datos del jugador =====
function getPlayerName() {
  return player.name;
}

function getMaxLevelUnlocked() {
  return player.maxLevelUnlocked;
}

// Exportar funciones globalmente para main.js
window.setPlayerName = setPlayerName;
window.loadPlayerData = loadPlayerData;
window.addPlayerScore = addPlayerScore;
window.unlockPlayerLevel = unlockPlayerLevel;
window.getPlayerName = getPlayerName;
window.getMaxLevelUnlocked = getMaxLevelUnlocked;