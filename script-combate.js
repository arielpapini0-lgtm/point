document.addEventListener('DOMContentLoaded', () => {
  // Cargar nombres desde la planilla
  const combate = JSON.parse(localStorage.getItem('combateActual'));
  if (combate) {
    document.getElementById('nombreRojo').textContent = combate.rojo;
    document.getElementById('nombreAzul').textContent = combate.azul;
  }

  // Timer principal
  let mainTime = 120;
  let mainInterval;
  const mainTimer = document.getElementById('mainTimer');
  const timeSelect = document.getElementById('mainTimeSelect');

  function actualizarMainTimer() {
    const min = String(Math.floor(mainTime / 60)).padStart(2, '0');
    const sec = String(mainTime % 60).padStart(2, '0');
    mainTimer.textContent = `${min}:${sec}`;
  }

  function aplicarDuracion() {
    clearInterval(mainInterval);
    mainTime = parseInt(timeSelect.value);
    actualizarMainTimer();
  }

  document.getElementById('toggleMain').addEventListener('click', aplicarDuracion);
  timeSelect.addEventListener('change', aplicarDuracion);

  document.getElementById('startMain').onclick = () => {
    clearInterval(mainInterval);
    const sonidoInicio = document.getElementById('sonidoInicio');
    if (sonidoInicio) sonidoInicio.play();

    mainInterval = setInterval(() => {
      if (mainTime > 0) {
        mainTime--;
        actualizarMainTimer();
        if (mainTime === 0) {
          clearInterval(mainInterval);
          const sonidoTiempo = document.getElementById('sonidoTiempo');
          if (sonidoTiempo) sonidoTiempo.play();
        }
      }
    }, 1000);
  };

  document.getElementById('pauseMain').onclick = () => clearInterval(mainInterval);
  document.getElementById('resetMain').onclick = () => aplicarDuracion();
  actualizarMainTimer();

  // Timer de descanso
  let breakTime = 60;
  let breakInterval;
  const breakTimer = document.getElementById('breakTimer');

  function actualizarBreakTimer() {
    const min = String(Math.floor(breakTime / 60)).padStart(2, '0');
    const sec = String(breakTime % 60).padStart(2, '0');
    breakTimer.textContent = `${min}:${sec}`;
  }

  document.getElementById('startBreak').onclick = () => {
    clearInterval(breakInterval);
    breakInterval = setInterval(() => {
      if (breakTime > 0) {
        breakTime--;
        actualizarBreakTimer();
        if (breakTime === 0) {
          clearInterval(breakInterval);
          const sonidoDescanso = document.getElementById('sonidoDescanso') || document.getElementById('sonidoTiempo');
          if (sonidoDescanso) sonidoDescanso.play();
        }
      }
    }, 1000);
  };

  document.getElementById('pauseBreak').onclick = () => clearInterval(breakInterval);
  document.getElementById('resetBreak').onclick = () => {
    clearInterval(breakInterval);
    breakTime = 60;
    actualizarBreakTimer();
  };

  actualizarBreakTimer();

  // Scoreboard
  document.querySelectorAll('.up').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      target.textContent = parseInt(target.textContent) + 1;
      const sonidoPunto = document.getElementById('sonidoPunto');
      if (sonidoPunto) sonidoPunto.play();
    });
  });

  document.querySelectorAll('.down').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      const current = parseInt(target.textContent);
      if (current > 0) target.textContent = current - 1;
    });
  });

  // Registrar ganador
  document.getElementById('declareWinner').addEventListener('click', () => {
    const rojo = parseInt(document.getElementById('redPoints').textContent);
    const azul = parseInt(document.getElementById('bluePoints').textContent);
    let ganador = 'Empate';

if (rojo > azul) ganador = combate.rojo;
else if (azul > rojo) ganador = combate.azul;

document.getElementById('nombreGanador').textContent = ganador;
    document.getElementById('ganadorPantalla').classList.remove('hidden');
    lanzarConfeti();

    setTimeout(() => {
      document.getElementById('ganadorPantalla').classList.add('hidden');
    }, 4000);
  });
});

// 🎉 Animación de confeti
function lanzarConfeti() {
  const canvas = document.getElementById('confettiCanvas');
  canvas.classList.remove('hidden');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const piezas = [];
  const colores = ['#ff0', '#f00', '#0f0', '#0ff', '#f0f', '#fff'];

  for (let i = 0; i < 150; i++) {
    piezas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 5,
      color: colores[Math.floor(Math.random() * colores.length)],
      tilt: Math.random() * 10 - 5
    });
  }

  let frame = 0;
  const animar = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    piezas.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.ellipse(p.x + p.tilt, p.y, p.r, p.r / 2, 0, 0, 2 * Math.PI);
      ctx.fill();
      p.y += p.d;
      p.tilt = Math.sin(frame / 10 + p.x / 50) * 10;
    });
    frame++;
    if (frame < 150) requestAnimationFrame(animar);
    else canvas.classList.add('hidden');
  };

  animar();
}