const colors = ['#d32f2f', '#b71c1c', '#ef5350', '#1976d2', '#0d47a1', '#42a5f5', '#7b1fa2', '#4a148c', '#ba68c8', '#c2185b', '#880e4f', '#f06292', '#4caf50', '#388e3c', '#81c784'];
const players = [];
let currentPlayerIndex = 0;
let categoryWords = [];
let selectedCategoryKey = 'tucumanos';

const gameCategories = {
  tucumanos: [
    'Culeado', 'Waskaso', 'Ura', 'A los minn', 'Bagre', 'Choro', 'Chuño', 'Gil', 'Wile', 
    'Cabeza Y pingo', 'Guaso', 'Villero', 'Quien Se Paga La coca', 'Pingo', 'Cajeta', 
    'ure', 'conchuda', 'tonto culiao', 'boludo', 'Saltamuro', 'Empanada de pollo', 
    'Viento norte', 'Achilata', 'Sanguuche de milanesa', 'cornudo', 'Pata de lana', 
    'Chanchuyo', 'panchuque', 'Panchero', 'panchitos', 'Meta y ponga','zorrita gratis'
  ],
  anime: [
    'Esferas del Dragón', 'Radar del Dragón', 'Semilla del Ermitaño', 'Nube Voladora', 
    'Cápsula', 'Banda de Konoha', 'Kyuubi', 'Sharingan', 'Kunai', 'Rasengan', 
    'Death Note', 'Fruta del Diablo', 'Going Merry', 'Shichibukai', 'Sombrero de Paja', 
    'expansion de dominio', 'Dedo de Sukuna', 'oh pero claro megumi', 'Caja de Nezuko', 'Equipo de Maniobras Tridimensional ahre', 
    'Suero de Titán', 'Sube al EVA', 'ataca al titan', 'Levi', 'Pokébola','Stand', 'dead nothe', 'manzana', 'L', 'kira'
  ],
  sports: [
    'Pelota de fútbol', 'Red', 'Tarjeta roja', 'Tarjeta amarilla', 'Silbato', 
    'Raqueta de tenis', 'Pelota de tenis', 'Aro de básquet', 'Tablero de básquet', 'Guantes de boxeo', 
    'padel', 'Palo de hockey', 'Bocha', 'Red de vóley', 'Guantes de arquero', 
    'Camiseta de fútbol', 'Botines', 'Bicicleta', 'Cronómetro', 
    'Bate de béisbol', 'Protector bucal', 'Magnesio', 'Mesa de ping pong', 
    'Paleta de ping pong', 'Banda de capitán', 'Banderín de córner', 'Poste de meta'
  ],
  technology: [
    'Teclado mecánico', 'Mouse gamer', 'Monitor 4K', 'Procesador', 'Tarjeta gráfica', 
    'Memoria RAM', 'Disco SSD', 'Motherboard', 'Placa de red', 'Router Wi-Fi', 
    'Cable HDMI', 'Auriculares Bluetooth', 'Micrófono condensador', 'Webcam 1080p', 'Pendrive USB', 
    'Impresora 3D', 'Servidor Blade', 'Gafas de Realidad Virtual', 'Smartphone', 'Tablet', 
    'Smartwatch', 'Batería portátil', 'Fuente de alimentación', 'Gabinete con RGB', 'Joystick', 
    'Consola de videojuegos', 'Lector de huellas', 'Lápiz óptico', 'Refrigeración líquida', 'Chip Snapdragon'
  ],
  food: [
    'Pizza de muzarella', 'Empanada de carne', 'Asado de tira', 'Milanesa a la napolitana', 'Tacos al pastor', 
    'Roll de sushi', 'Fideos con tuco', 'Hamburguesa completa', 'Helado de dulce de leche', 'Alfajor de chocolate', 
    'Lomito', 'Papas fritas con cheddar', 'Choripán', 'Provoleta', 'Ravioles de verdura', 
    'Locro', 'Humita en chala', 'Sorrentinos', 'Churros con dulce de leche', 'Flan con crema', 
    'Tarta de jamón y queso', 'Pancho con lluvia de papas', 'Pastel de papa', 'Tortilla de papas', 'Guiso de lentejas', 
    'Tartaleta de frutilla', 'Volcán de chocolate', 'Nuggets de pollo', 'Crepe de nutella', 'Sandwich de miga'
  ]
};

function getContrastTextColor(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? '#000000' : '#ffffff';
}

function getLighterColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = ((num >> 8) & 0x00ff) + amt,
        B = (num & 0x0000ff) + amt;
  return '#' + (0x1000000 + (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 0 ? 0 : B) : 255)).toString(16).slice(1);
}

function assignSecretWords() {
  categoryWords = [...(gameCategories[selectedCategoryKey] || gameCategories.tucumanos)];
  let availableWords = [...categoryWords];

  players.forEach((player) => {
    player.secretWords = [];
    
    for (let i = 0; i < 3; i++) {
      if (availableWords.length === 0) {
        availableWords = [...categoryWords];
      }
      
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      const word = availableWords.splice(randomIndex, 1)[0];
      player.secretWords.push(word);
    }
  });
}

function startGame(categoryKey) {
  selectedCategoryKey = categoryKey;
  assignSecretWords();

  const section = document.getElementById('registrationSection');
  section.style.opacity = '0';
  
  setTimeout(() => {
      section.style.display = 'none';
      currentPlayerIndex = 0;
      renderGameCards();
  }, 500);
}

const form = document.getElementById('playerForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const playerName = document.getElementById('playerName').value;
    if (playerName.trim() === '') {
        alert('Por favor, ingresa un nombre valido');
        return;
    }
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    players.push({ name: playerName, color: randomColor });
    renderPlayers();
    document.getElementById('playerName').value = '';
});

function renderPlayers() {
    const container = document.getElementById('playerContainer');
    container.innerHTML = '';
    players.forEach((player) => {
        const textColor = getContrastTextColor(player.color);
        const card = document.createElement('section');
        card.className = 'card my-2 w-75 mx-auto';
        card.style.backgroundColor = player.color;
        card.style.boxShadow = 'inset 0 0 0 5px rgba(0, 0, 0, 0.4)';
        card.style.borderRadius = '15px';
        card.innerHTML = `<section class="card-body text-center">
        <h5 class="card-title" style="color: ${textColor}; ${textColor === '#ffffff' ? 'text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;' : ''}">${player.name}</h5>
        </section>`;
        container.appendChild(card);
        setTimeout(() => {
            card.style.opacity = '1';
        }, 50);
    });
}

function renderCategorySection() {
  const registrationSection = document.getElementById('registrationSection');
  
  const categoryHTML = `
    <section id="categorySection" class="w-75 mx-auto mt-4 p-4 bg-light rounded shadow-lg text-center" style="border-radius: 20px;">
      <h3 class="mb-3 font-weight-bold">Seleccioná la categoría de palabras</h3>
      <select id="categorySelect" class="form-select form-select-lg w-75 mx-auto mb-4">
        <option value="tucumanos">Insultos Tucumanos</option>
        <option value="anime">Anime (Objetos, Habilidades y Elementos)</option>
        <option value="food">Comida</option>
        <option value="sports">Elementos de Deportes</option>
        <option value="technology">Hardware y Dispositivos Tech</option>
      </select>
      <button id="confirmCategoryBtn" class="btn btn-primary btn-lg px-4 font-weight-bold">¡Empezar Juego!</button>
    </section>
  `;

  registrationSection.innerHTML = categoryHTML;

  document.getElementById('confirmCategoryBtn').addEventListener('click', () => {
    const selectedKey = document.getElementById('categorySelect').value;
    startGame(selectedKey);
  });
}

document.getElementById('buttonStart').addEventListener('click', () => {
    if (players.length < 2) {
        alert('Por favor, agrega al menos 2 jugadores antes de empezar');
        return;
    }
    renderCategorySection();
});

function resetToHome() {
  const gameContainer = document.getElementById('playersContainerGame');
  gameContainer.innerHTML = '';

  const registrationSection = document.getElementById('registrationSection');
  registrationSection.style.display = 'block';
  registrationSection.style.opacity = '1';
  
  renderPlayers();
}

function renderGameCards() {
  const container = document.getElementById('playersContainerGame');
  container.innerHTML = '';
  
  if (players.length === 0) return;

  const player = players[currentPlayerIndex];
  const lighterColor = getLighterColor(player.color, 40);
  const textColor = getContrastTextColor(lighterColor);

  const card = document.createElement('section');
  card.className = 'card mb-3 w-75 mx-auto p-3 shadow-lg';
  card.style.backgroundColor = player.color;
  card.style.boxShadow = 'inset 0 0 0 5px rgba(0, 0, 0, 0.2)';
  card.style.borderRadius = '20px';
  card.style.transition = 'opacity 0.5s ease';
  card.style.opacity = '0';

  card.innerHTML = `
    <section class="card-body">
      <section class="p-3 mb-4 rounded text-center" style="background-color: ${lighterColor}; box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.1);">
        <h3 class="card-title m-0" style="color: ${textColor}; ${textColor === '#ffffff' ? 'text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;' : ''}">
          ${player.name}
        </h3>
      </section>
      
      <section class="d-flex justify-content-between mb-4 gap-2">
        <section class="secret-box p-3 rounded text-center flex-fill font-weight-bold d-flex align-items-center justify-content-center" style="background-color: ${lighterColor}; font-size: 1.1rem; color: ${textColor}; min-height: 60px;">???</section>
        <section class="secret-box p-3 rounded text-center flex-fill font-weight-bold d-flex align-items-center justify-content-center" style="background-color: ${lighterColor}; font-size: 1.1rem; color: ${textColor}; min-height: 60px;">???</section>
        <section class="secret-box p-3 rounded text-center flex-fill font-weight-bold d-flex align-items-center justify-content-center" style="background-color: ${lighterColor}; font-size: 1.1rem; color: ${textColor}; min-height: 60px;">???</section>
      </section>

      <section class="d-flex justify-content-between">
        <button id="revealBtn" class="btn btn-light btn-lg w-48 font-weight-bold">Revelar</button>
        <button id="nextPlayerBtn" class="btn btn-secondary btn-lg w-48 font-weight-bold">Pasar</button>
      </section>
    </section>
  `;
  
  container.appendChild(card);

  setTimeout(() => {
    card.style.opacity = '1';
  }, 50);

  document.getElementById('revealBtn').addEventListener('click', () => {
    const boxes = card.querySelectorAll('.secret-box');
    const words = player.secretWords || ['???', '???', '???'];
    
    boxes.forEach((box, i) => {
      box.textContent = words[i] || '???';
    });
  });

  document.getElementById('nextPlayerBtn').addEventListener('click', () => {
    currentPlayerIndex++;
    
    if (currentPlayerIndex >= players.length) {
      renderEndGameScreen(container);
      return;
    }
    
    renderGameCards();
  });
}

function renderEndGameScreen(container) {
  const options = players.map((p, index) => 
    `<option value="${index}">${p.name}</option>`
  ).join('');

  container.innerHTML = `
    <section class="text-center w-75 mx-auto p-4 bg-light rounded shadow-lg" style="border-radius: 20px;">
      <h2 class="mb-4 font-weight-bold">¡Comiencen a charlar!</h2>
      <div class="d-flex justify-content-center gap-3">
        <button id="winnerBtn" class="btn btn-success btn-lg px-4 font-weight-bold">Hay ganador</button>
        <button id="endGameBtn" class="btn btn-danger btn-lg px-4 font-weight-bold">Terminar juego</button>
      </div>
      <div id="winnerSelectContainer" class="mt-4 d-none">
        <h4 class="mb-3 font-weight-bold">Seleccionar Ganador</h4>
        <select id="winnerSelect" class="form-select form-select-lg mb-3 w-50 mx-auto">
          ${options}
        </select>
        <button id="confirmWinnerBtn" class="btn btn-primary btn-lg px-4 font-weight-bold">Confirmar</button>
      </div>
    </section>
  `;

  document.getElementById('winnerBtn').addEventListener('click', () => {
    document.getElementById('winnerSelectContainer').classList.remove('d-none');
  });

  document.getElementById('endGameBtn').addEventListener('click', () => {
    resetToHome();
  });

  document.getElementById('confirmWinnerBtn').addEventListener('click', () => {
    const selectedIndex = document.getElementById('winnerSelect').value;
    const winner = players[selectedIndex];
    
    container.innerHTML = `
      <section class="text-center w-75 mx-auto p-4 bg-light rounded shadow-lg" style="border-radius: 20px;">
        <h2 class="mb-3 font-weight-bold" style="color: ${winner.color};">¡El ganador es ${winner.name}! 🏆</h2>
        <div class="d-flex justify-content-center gap-3 mt-3">
          <button id="restartBtn" class="btn btn-primary btn-lg px-4 font-weight-bold">Reiniciar juego</button>
          <button id="exitBtn" class="btn btn-secondary btn-lg px-4 font-weight-bold">Volver al inicio</button>
        </div>
      </section>
    `;

    document.getElementById('restartBtn').addEventListener('click', () => {
      assignSecretWords();
      currentPlayerIndex = 0;
      renderGameCards();
    });

    document.getElementById('exitBtn').addEventListener('click', () => {
      resetToHome();
    });
  });
}