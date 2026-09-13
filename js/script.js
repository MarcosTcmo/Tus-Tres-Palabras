const form = document.getElementById('playerForm')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const playerName = document.getElementById('playerName').value
    if (playerName.trim() === '') {
        alert('Por favor, ingresa un nombre valido')
        return
    }
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    players.push({ name: playerName, color: randomColor })
    renderPlayers()
    document.getElementById('playerName').value = ''
})
const colors = ['#d32f2f', '#b71c1c', '#ef5350', '#1976d2', '#0d47a1', '#42a5f5', '#7b1fa2', '#4a148c', '#ba68c8', '#c2185b', '#880e4f', '#f06292', '#4caf50', '#388e3c', '#81c784']
const players = []
function renderPlayers() {
    const container = document.getElementById('playerContainer')
    container.innerHTML = ''
    players.forEach((player) => {
        const card = document.createElement('section')
        card.className = 'card my-2 w-75 mx-auto'
        card.style.backgroundColor = player.color
        card.style.boxShadow = 'inset 0 0 0 5px rgba(0, 0, 0, 0.4)'
        card.style.borderRadius = '15px'
        card.innerHTML = `<section class="card-body text-center">
        <h5 class="card-title" style="color: #fff;text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000">${player.name}</h5>
        </section>`
        container.appendChild(card)
        setTimeout(() => {
            card.style.opacity = '1'
        }, 50);
    });
}
document.getElementById('buttonStart').addEventListener('click', () => {
    if (players.length < 2) {
        alert('Por favor, agrega al menos 2 jugadores antes de empezar')
        return
    }
    const section = document.getElementById('registrationSection')
    section.style.opacity = '0'
    setTimeout(() => {
        section.style.display = 'none'
        renderGameCards()
    }, 500);
    
})
function getLighterColor(hex, percent) {
    const num = parseInt(hex.replace("#", ""), 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = ((num >> 8) & 0x00ff) + amt, B = (num & 0x0000ff) + amt
    return ("#" + (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
        .toString(16)
        .slice(1)
    )
}

function renderGameCards() {
    const container = document.getElementById("playersContainerGame")
    container.innerHTML = ''
    players.forEach((player) => {
        const lighterColor = getLighterColor(player.color, 40)
        const card = document.createElement("section")
        card.className = "card mb-3 w-75 mx-auto p-3 shadow-lg"
        card.style.backgroundColor = player.color
        card.style.boxShadow = "inset 0 0 0 5px rgba(0, 0, 0, 0.3)"
        card.style.borderRadius = "20px"
        card.style.transition = "opacity 0.5s ease"
        card.style.opacity = "0"
        card.innerHTML = `
        <section class="card-body">
            <section class="p-3 mb-4 rounded text-center" style="background-color: ${lighterColor}; box-shadow: inset 0 0 0 3px rgba(0,0,0, 0.1)">
                <h3 class="card-title m-0" style="color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000">
                    ${player.name}
                </h3>
            </section>
            <section class="d-flex justify-content-between mb-4">
                <section class="p-3 rounded text-center" style="background-color: ${lighterColor}; width: 30%; font-weight: bold; font-size: 1.2rem;">???</section>
                <section class="p-3 rounded text-center" style="background-color: ${lighterColor}; width: 30%; font-weight: bold; font-size: 1.2rem;">???</section>
                <section class="p-3 rounded text-center" style="background-color: ${lighterColor}; width: 30%; font-weight: bold; font-size: 1.2rem;">???</section>
            </section>
            <section class="d-flex justify-content-between">
                <button class="btn btn-light btn-lg w-50 font-weight-bold">Revelar</button>
                <button class="btn btn-secondary btn-lg w-50 font-weight-bold">Pasar</button>
            </section>
        </section>
        `
        container.appendChild(card)

        setTimeout(() => {
            card.style.opacity = "1"
        }, 50);
    })
}