import Controller from '../../src/Controller.js';
import Coordinates from '../../src/Coordinates.js';
import Game from '../../src/Game.js';
import View from '../../src/View.js';


const gameField = document.getElementById('game');
const gameStartBtn = document.getElementById('btn-start');
const newWordBtn = document.getElementById('new-word-btn');

const game = new Game();
const view = new View(gameField);
const coordinates = new Coordinates();
const controller = new Controller(game, view, coordinates);

gameStartBtn.onclick = () => controller.startGame();

newWordBtn.onclick = () => controller.startGame();
