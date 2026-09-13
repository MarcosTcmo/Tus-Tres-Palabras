const form = document.getElementById('playerForm')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const playerName = document.getElementById('playerName').value
    if (playerName === '') {
        alert('Por favor, ingresa n nombre valido')
        return
    }
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    players.push({name: playerName,color: randomColor})
    renderPlayers()
    document.getElementById('playerName').value = ''
})
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
        <h5 class="card-title">${player.name}</5>
        </section>`
        container.appendChild(card)
    });
}