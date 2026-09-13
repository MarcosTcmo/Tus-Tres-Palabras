const form = document.getElementById('playerForm')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const playerName = document.getElementById('playerName').value
    if (playerName === '') {
        alert('Por favor, ingresa n nombre valido')
        return
    }
    players.push(playerName)
    renderPlayers()
    document.getElementById('playerName').value = ''
})
const players = []
function renderPlayers() {
    const container = document.getElementById('playerContainer')
    container.innerHTML = ''
    players.forEach((player) => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
        const card = document.createElement('section')
        card.className = 'card mb-2'
        card.style.backgroundColor = randomColor
        card.innerHTML = `<section class="card-body text-center">
        <h5 class="card-title">${player}</5>
        </section>`
        container.appendChild(card)
    });
}