document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('bracketDisplay');
  const llaves = JSON.parse(localStorage.getItem('llavesTorneo')) || [];

  if (llaves.length === 0) {
    container.innerHTML = `<p style="color:white; text-align:center;">No se han generado llaves aún. Volvé a la organización y tocá "Sortear y Generar Llave".</p>`;
    return;
  }

  llaves.forEach(torneo => {
    const grupoDiv = document.createElement('div');
    grupoDiv.className = 'grupo-bracket';
    grupoDiv.innerHTML = `<h3>${torneo.nombre}</h3>`;

    torneo.rounds.forEach((round, i) => {
      const roundDiv = document.createElement('div');
      roundDiv.className = 'bracket-round';
      roundDiv.innerHTML = `<h4>Ronda ${i + 1}</h4>`;

      round.forEach(match => {
        const matchDiv = document.createElement('div');
        matchDiv.className = 'bracket-match';

        const [a, b] = match.split(' vs ');

        matchDiv.innerHTML = `
          <div class="matchup-card">
            <div class="competitor left">${a}</div>
            <div class="vs">VS</div>
            <div class="competitor right">${b}</div>
          </div>
        `;

        const boton = document.createElement('button');
        boton.textContent = '⚔️ Iniciar Combate';
        boton.className = 'iniciar-combate';
        boton.onclick = () => iniciarCombateDesdeLlave(a, b);
        matchDiv.appendChild(boton);

        roundDiv.appendChild(matchDiv);
      });

      grupoDiv.appendChild(roundDiv);
    });

    container.appendChild(grupoDiv);
  });
});

function iniciarCombateDesdeLlave(comp1, comp2) {
  const combateData = { rojo: comp1, azul: comp2 };
  localStorage.setItem('combateActual', JSON.stringify(combateData));
  window.open('combate.html', '_blank');
}