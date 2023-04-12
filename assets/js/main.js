const gameField = document.getElementById('game');
const gameStartBtn = document.getElementById('btn-start');
const newWordBtn = document.getElementById('new-word-btn');

const game = new Game();
const view = new View(gameField);
const coordinates = new Coordinates();
const controller = new Controller(game, view, coordinates);

gameStartBtn.onclick = () => controller.startGame();

newWordBtn.onclick = () => controller.startGame();
