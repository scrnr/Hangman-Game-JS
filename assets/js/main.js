const gameField = document.getElementById('game');
const gameStartBtn = document.getElementById('btn-start');
const newWordBtn = document.getElementById('new-word-btn');

const game = new Game();
const view = new View();
const controller = new Controller(game, view);

gameStartBtn.onclick = () => controller.startGame();

newWordBtn.onclick = () => {
    // restart
}
