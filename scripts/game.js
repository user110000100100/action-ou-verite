/* ------- GAME ------- */
const start_btn = document.querySelector("#startGame-btn");

start_btn.addEventListener("click", function() {
    const players = JSON.parse(localStorage.getItem("players")) || [];
    if (!players.length) return alert("Ce jeu nécessite au minimum 2 joueurs");

    const game_level = document.querySelector("#gameChallengeLevel");
    

    const challenges = 
    startGameToggleCards();
});


/* ------- DISPLAY GAME CARDS ------- */
function startGameToggleCards () {
    const game_card = document.querySelectorAll('.game-card');
    game_card.forEach(card => {
        card.classList.remove("inactive");
    })
    
    const game_settings_card = document.querySelector('.game-settings-card');
    game_settings_card.classList.add("inactive");
}