let playerName = "";
let currentLevel = 1;
let maxLevelUnlocked = 1;

const startScreen = document.getElementById("start-screen");
const levelMenu = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const levelsContainer = document.getElementById("levelsContainer");
const nameInput = document.getElementById("playerName");
const startButton = document.getElementById("btnStart");
const btnMenu = document.getElementById("btnMenu");
const btnReset = document.getElementById("btnReset");

startButton.addEventListener("click", () => {
  playButtonSound(); // 🔊 sonido de clic en botón

  const name = nameInput.value.trim();
  if(!name){ alert("Escribe tu nombre!"); return; }
  playerName = name;
  setPlayerName(playerName);
  loadPlayerData();
  maxLevelUnlocked = getMaxLevelUnlocked();
  generateLevelButtons();
  showLevelMenu();
});

function generateLevelButtons() {
  levelsContainer.innerHTML = "";
  getAllLevels().forEach(lvl=>{
    const btn = document.createElement("button");
    btn.classList.add("level-btn");
    btn.textContent = lvl.name;
    btn.dataset.level = lvl.number;
    if(lvl.locked){ btn.classList.add("locked"); btn.disabled=true; }
    btn.addEventListener("click",()=>{
      if(!lvl.locked){
        playButtonSound(); // 🔊 sonido al seleccionar nivel
        startLevel(lvl.number);
      }
    });
    levelsContainer.appendChild(btn);
  });
  updateLevelButtons();
}

function updateLevelButtons(){
  getAllLevels().forEach((lvl,i)=>{
    const btn = levelsContainer.children[i];
    if(!btn) return;
    if(lvl.number <= maxLevelUnlocked){ btn.classList.remove("locked"); btn.disabled=false; }
    else{ btn.classList.add("locked"); btn.disabled=true; }
  });
}

function showLevelMenu(){
  startScreen.style.display="none";
  levelMenu.style.display="block";
  gameScreen.style.display="none";
}

function startLevel(levelNumber){
  currentLevel = levelNumber;
  levelMenu.style.display="none";
  gameScreen.style.display="block";
  document.body.className = `level-${levelNumber}`;
  const levelData = getLevel(levelNumber);
  startGame(levelData); // de game.js
}

btnMenu.addEventListener("click",()=>{
  playButtonSound(); // 🔊 sonido al volver al menú
  gameScreen.style.display="none";
  showLevelMenu();
});

btnReset.addEventListener("click",()=>{
  playButtonSound(); // 🔊 sonido al presionar "Reiniciar"
  if(confirm("Borrar progreso?")){
    localStorage.removeItem("snakePlayer");
    playerName = "";
    maxLevelUnlocked = 1;
    resetLevels();
    startScreen.style.display="block";
    levelMenu.style.display="none";
    gameScreen.style.display="none";
  }
});
