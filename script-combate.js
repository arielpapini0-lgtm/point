document.addEventListener('DOMContentLoaded', () => {
  // Timer principal
  let mainTime = 120;
  let mainInterval;
  const mainTimer = document.getElementById('mainTimer');

  function actualizarMainTimer() {
    const min = String(Math.floor(mainTime / 60)).padStart(2, '0');
    const sec = String(mainTime % 60).padStart(2, '0');
    mainTimer.textContent = `${min}:${sec}`;
  }

  document.getElementById('startMain').onclick = () => {
    clearInterval(mainInterval);
    mainInterval = setInterval(() => {
      if (mainTime > 0) {
        mainTime--;
        actualizarMainTimer();
      }
    }, 1000);
  };

  document.getElementById('pauseMain').onclick = () => clearInterval(mainInterval);
  document.getElementById('resetMain').onclick = () => {
    clearInterval(mainInterval);
    mainTime = parseInt(document.getElementById('mainTimeSelect').value);
    actualizarMainTimer();
  };

  document.getElementById('toggleMain').onclick = () => {
    mainTime = parseInt(document.getElementById('mainTimeSelect').value);
    actualizarMainTimer();
  };

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

  if (rojo > azul) ganador = 'Rojo';
  else if (azul > rojo) ganador = 'Azul';

  document.getElementById('nombreGanador').textContent = ganador;
  document.getElementById('ganadorPantalla').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('ganadorPantalla').classList.add('hidden');
  }, 4000); // Oculta después de 4 segundos
});
});