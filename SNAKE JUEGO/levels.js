// ===== levels.js =====
const levels = [
  {
    number: 1,
    name: "JARDÍN",
    fruitColor: "red",
    fruitValue: 10,
    speed: 150,
    targetPoints: 50,
    allowSilver: false,
    obstacles: [],
    locked: false
  },
  {
    number: 2,
    name: "CASA",
    fruitColor: "red",
    fruitValue: 10,
    speed: 130,
    targetPoints: 100,
    allowSilver: true,
    silverValue: 20,
    silverRespawnMs: 5000,
    obstacles: [{ x: 5, y: 5 }, { x: 10, y: 15 }],
    locked: true
  },
  {
    number: 3,
    name: "CÁRCEL",
    fruitColor: "red",
    fruitValue: 10,
    speed: 110,
    targetPoints: 150,
    allowSilver: false,
    obstacles: [{ x: 4, y: 10 }, { x: 8, y: 12 }, { x: 12, y: 6 }],
    locked: true
  }
];

function getLevel(n){ return levels.find(l => l.number === n); }
function getAllLevels(){ return levels; }
function unlockNextLevel(n){ const next = getLevel(n+1); if (next) next.locked = false; }
function resetLevels(){ levels.forEach((l,i)=> l.locked = i!==0 ); }

window.getLevel = getLevel;
window.getAllLevels = getAllLevels;
window.unlockNextLevel = unlockNextLevel;
window.resetLevels = resetLevels;

