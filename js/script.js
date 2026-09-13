const form = document.getElementById('playerForm')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const playerName = document.getElementById('playerName').value
    if (playerName === '') {
        alert('Por favor, ingresa n nombre valido')
        return
    }
    const randomColor = colors[Math.floor(Math.random()* colors.length)]
    players.push({name: playerName,color: randomColor})
    renderPlayers()
    document.getElementById('playerName').value = ''
})
const colors = ['#d32f2f','#b71c1c','#ef5350','#1976d2','#0d47a1','#42a5f5','#7b1fa2','#4a148c','#ba68c8','#c2185b','#880e4f','#f06292','#4caf50','#388e3c','#81c784']
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
        <h5 class="card-title" style="color: #fff;text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000">${player.name}</5>
        </section>`
        container.appendChild(card)
        setTimeout(() => {
            card.style.opacity = '1'
        }, 50);
    });
}
document.getElementById('buttonStart').addEventListener('click', () => {
    if(players.length < 2){
        alert('Por favor, agrega al menos 2 jugadores antes de empezar')
        return
    }
    const section = document.getElementById('registrationSection')
    section.style.opacity = '0'
    setTimeout(() => {
        section.style.display = 'none'
    }, 500);
})
