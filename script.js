// Estado de puntuación
const score = {
  redPoints: 0,
  bluePoints: 0,
  redFouls: 0,
  blueFouls: 0,
  redExits: 0,
  blueExits: 0
};

// Timers
let mainSeconds = 120;
let mainInterval;
let mainRunning = false;

let breakSeconds = 60;
let breakInterval;
let breakRunning = false;

// Sonidos
const hitSound = new Audio('assets/hit.mp3');
const pauseSound = new Audio('assets/pause.mp3');
const startSound = new Audio('assets/start.mp3');
const exitSound = new Audio('assets/exit.mp3');
const endSound = new Audio('assets/end.mp3');

// Actualizar marcadores
function updateDisplay() {
  for (const key in score) {
    const el = document.getElementById(key);
    if (el) el.textContent = score[key];
  }
  document.getElementById('mainTimer').textContent = formatTime(mainSeconds);
  document.getElementById('breakTimer').textContent = formatTime(breakSeconds);
}

// Formato de tiempo
function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

// Timer principal
function startMainTimer() {
  if (mainRunning) return;
  mainRunning = true;
  mainInterval = setInterval(() => {
    if (mainSeconds > 0) {
      mainSeconds--;
      document.getElementById('mainTimer').textContent = formatTime(mainSeconds);
    } else {
      pauseMainTimer();
      endSound.play();
    }
    
  }, 1000);
}

function pauseMainTimer() {
  mainRunning = false;
  clearInterval(mainInterval);
  pauseSound.play();
  flashElement('mainTimer');
}

function resetMainTimer() {
  mainSeconds = 120;
  pauseMainTimer();
  updateDisplay();
}

document.getElementById('startMain').onclick = startMainTimer;
document.getElementById('pauseMain').onclick = pauseMainTimer;
document.getElementById('resetMain').onclick = resetMainTimer;
document.getElementById('toggleMain').onclick = () => {
  mainSeconds = (mainSeconds === 120) ? 90 : 120;
  updateDisplay();
};

// Timer de descanso
function startBreakTimer() {
  if (breakRunning) return;
  breakRunning = true;
  breakInterval = setInterval(() => {
    if (breakSeconds > 0) {
      breakSeconds--;
      document.getElementById('breakTimer').textContent = formatTime(breakSeconds);
    } else {
      pauseBreakTimer();
      endSound.play();
    }
    
  }, 1000);
}

function pauseBreakTimer() {
  breakRunning = false;
  clearInterval(breakInterval);
  pauseSound.play();
  flashElement('breakTimer');
}

function resetBreakTimer() {
  breakSeconds = 60;
  pauseBreakTimer();
  updateDisplay();
}

document.getElementById('startBreak').onclick = startBreakTimer;
document.getElementById('pauseBreak').onclick = pauseBreakTimer;
document.getElementById('resetBreak').onclick = resetBreakTimer;

// Flechas ↑ ↓
document.querySelectorAll('.up').forEach(btn => {
  btn.onclick = () => {
    const target = btn.dataset.target;
    if (score.hasOwnProperty(target)) {
      score[target]++;
      updateDisplay();
      if (target.includes('Points')) {
        hitSound.play();
        flashElement(target);
      }
    }
  };
});

document.querySelectorAll('.down').forEach(btn => {
  btn.onclick = () => {
    const target = btn.dataset.target;
    if (score.hasOwnProperty(target)) {
      score[target] = Math.max(0, score[target] - 1);
      updateDisplay();
    }
  };
});

// Animación de impacto
function flashElement(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 300);
  }
}

// Inicializar
updateDisplay();

document.getElementById('bgUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      document.body.style.backgroundImage = `url('${event.target.result}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
    };
    reader.readAsDataURL(file);
  }
});
document.getElementById('mainTimeSelect').addEventListener('change', function () {
  mainSeconds = parseInt(this.value);
  updateDisplay();
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(error => console.error('Error al registrar Service Worker:', error));
}

