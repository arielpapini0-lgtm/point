document.addEventListener('DOMContentLoaded', () => {
  const competidores = [];

  document.getElementById('agregar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const escuela = document.getElementById('escuela').value.trim();
    const edad = document.getElementById('edad').value;
    const tecnica = document.getElementById('tecnica').value;
    const peso = document.getElementById('peso').value;

    if (!nombre || !escuela) return;

    const nuevo = { nombre, escuela, edad, tecnica, peso };
    competidores.push(nuevo);

    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${nombre}</td><td>${escuela}</td><td>${edad}</td><td>${tecnica}</td><td>${peso}</td>`;
    document.querySelector('#tabla tbody').appendChild(fila);

    document.getElementById('sortearLlave').style.display = 'inline-block';
  });

  document.getElementById('sortearLlave').addEventListener('click', () => {
  const grupos = agruparPorPeso(competidores);
  const container = document.getElementById('bracketDisplay');
  container.innerHTML = '';

  const llaves = [];

  Object.entries(grupos).forEach(([peso, grupo]) => {
    const nombres = grupo.map(c => c.nombre);
    const mezclados = nombres.sort(() => Math.random() - 0.5);

    const rondaInicial = [];
    for (let i = 0; i < mezclados.length; i += 2) {
      const a = mezclados[i];
      const b = mezclados[i + 1] || 'BYE';
      rondaInicial.push(`${a} vs ${b}`);
    }

    const rounds = [rondaInicial];
    let siguiente = Array(Math.ceil(rondaInicial.length / 2)).fill('Pendiente vs Pendiente');
    rounds.push(siguiente);

    while (siguiente.length > 1) {
      siguiente = Array(Math.ceil(siguiente.length / 2)).fill('Pendiente vs Pendiente');
      rounds.push(siguiente);
    }

    const torneo = {
      nombre: `Categoría ${peso} kg`,
      rounds
    };

    llaves.push(torneo);
    renderBracketPorGrupo(torneo, container);
  });

  // ✅ Guardamos las llaves para que planilla.html las pueda leer
  localStorage.setItem('llavesTorneo', JSON.stringify(llaves));
});

  function agruparPorPeso(lista) {
    const grupos = {};
    lista.forEach(c => {
      const categoria = c.peso;
      if (!grupos[categoria]) grupos[categoria] = [];
      grupos[categoria].push(c);
    });
    return grupos;
  }

  function renderBracketPorGrupo(torneo, container) {
    const grupoDiv = document.createElement('div');
    grupoDiv.className = 'grupo-bracket';
    grupoDiv.innerHTML = `<h3>${torneo.nombre}</h3>`;

    torneo.rounds.forEach((round, i) => {
      const roundDiv = document.createElement('div');
      roundDiv.className = 'bracket-round';
      roundDiv.innerHTML = `<h4>Ronda ${i + 1}</h4>`;
      round.forEach((match, j) => {
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
        roundDiv.appendChild(matchDiv);
      });
      grupoDiv.appendChild(roundDiv);
    });

    container.appendChild(grupoDiv);
  }
});
localStorage.setItem('competidores', JSON.stringify(competidores));
const llaves = [];

Object.entries(grupos).forEach(([peso, grupo]) => {
  const nombres = grupo.map(c => c.nombre);
  const mezclados = nombres.sort(() => Math.random() - 0.5);

  const rondaInicial = [];
  for (let i = 0; i < mezclados.length; i += 2) {
    const a = mezclados[i];
    const b = mezclados[i + 1] || 'BYE';
    rondaInicial.push(`${a} vs ${b}`);
  }

  const rounds = [rondaInicial];
  let siguiente = Array(Math.ceil(rondaInicial.length / 2)).fill('Pendiente vs Pendiente');
  rounds.push(siguiente);

  while (siguiente.length > 1) {
    siguiente = Array(Math.ceil(siguiente.length / 2)).fill('Pendiente vs Pendiente');
    rounds.push(siguiente);
  }

  const torneo = {
    nombre: `Categoría ${peso} kg`,
    rounds
  };

  llaves.push(torneo);
  renderBracketPorGrupo(torneo, container);
});

