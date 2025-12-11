const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 2000;
canvas.height = 1200;

const images = {};
let loadedCount = 0;
const totalImages = 31; 

// Estado de desbloqueo de niveles (Usado por SnakeGame y la UI)
const nivelesDesbloqueados = {
    1: true,
    2: false,
    3: false
};

// Referencias a los botones de la UI
const btnNextLevel = document.getElementById("btnNextLevel");
const btnNivel2 = document.getElementById("btnNivel2");
const btnNivel3 = document.getElementById("btnNivel3");
const btnVolver = document.getElementById("btnVolver");

let game;

// --- Funciones Globales para Interactuar con SnakeGame ---

function getLevelMatrix(level) {
    // Asumimos que la matriz LEVELS es global o está disponible
    return LEVELS[level];
}

function isLevelUnlocked(level) {
    return nivelesDesbloqueados[level];
}

// Llamado por SnakeGame cuando cumple las condiciones
function unlockNextLevelButton(nextLevel) {
    if (nextLevel <= 3) {
        nivelesDesbloqueados[nextLevel] = true;
        // La actualización de botones ocurre automáticamente en game.cambiarNivel()
        // o llamando a updateLevelButtons después del unlock.
    }
}

// Función para controlar la visibilidad del botón Volver
function toggleBackButton(currentLevel) {
    if (currentLevel > 1) {
        btnVolver.style.display = 'inline-block';
    } else {
        btnVolver.style.display = 'none';
    }
}

// Función para actualizar el estado de los botones (Llamada por SnakeGame.updateUI)
function updateLevelButtons(currentLevel, score, maxScore, applesEaten, applesReq) {
    // 1. Botones de Nivel (2, 3)
    btnNivel2.disabled = !nivelesDesbloqueados[2];
    btnNivel3.disabled = !nivelesDesbloqueados[3];
    
    // 2. Botón Siguiente Nivel (Solo habilitado si cumple condiciones y no es el último nivel)
    const canUnlockNext = score >= maxScore && applesEaten >= applesReq && currentLevel < 3;
    btnNextLevel.disabled = !canUnlockNext;
    
    // 3. Botón Volver
    toggleBackButton(currentLevel);
}

// --- Event Listeners para Botones ---

btnNextLevel.addEventListener('click', () => {
    if (game && !btnNextLevel.disabled) {
        // La lógica de cambio y desbloqueo está en handleMove,
        // Aquí solo debería forzar el cambio si ya está desbloqueado
        const nextLevel = game.nivelActual + 1;
        if(isLevelUnlocked(nextLevel)) {
            game.cambiarNivel(nextLevel);
        } else {
            // Esto debería ser innecesario si la lógica de handleMove funciona
            alert("Completa el nivel actual primero.");
        }
    }
});

btnVolver.addEventListener('click', () => {
    if (game && game.nivelActual > 1) {
        // Asume que Volver significa volver al nivel 1, o al nivel anterior.
        // Lo configuramos para volver al Nivel 1.
        if (isLevelUnlocked(1)) {
           game.cambiarNivel(1); 
        }
    }
});

btnNivel2.addEventListener('click', () => {
    if (game && isLevelUnlocked(2)) {
        game.cambiarNivel(2);
    }
});

btnNivel3.addEventListener('click', () => {
    if (game && isLevelUnlocked(3)) {
        game.cambiarNivel(3);
    }
});


// --- Lógica de Carga e Inicialización ---

// Cargar imágenes y dibujar
for (let i = 0; i < totalImages; i++) {
  const img = new Image();
  img.src = `assets/${i}.png`; 
  img.onload = () => {
    loadedCount++;
    if (loadedCount === totalImages) {
      const initialLevel = 1;
      const levelData = LEVELS[initialLevel];
      // Crear Matrix
      const mapMatrix = new Matrix(levelData.length, levelData[0].length);
      mapMatrix.fillFromArray(levelData);
      // Inicializar Game
      game = new SnakeGame("gameCanvas", mapMatrix, images);
      // game.draw() es llamado dentro de game.loop()
      
      // Llamada inicial para configurar botones al cargar
      updateLevelButtons(game.nivelActual, game.score, game.maxScorePorNivel[game.nivelActual - 1], game.applesEatenInLevel, game.manzanasRequeridas);
    }
  };
  images[i] = img;
}