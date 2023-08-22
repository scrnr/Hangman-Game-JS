import { } from './extensions/WindowExtension';
import { Game } from './classes/Game';
import { ImageLoader } from './classes/ImageLoader';
import { Box } from './types/Types';

const gameField: HTMLElement | null = document.getElementById('game-field');

if (gameField) {
    const alphabetBox: Box = document.getElementById('alphabet') as Box;

    const imageLoader: ImageLoader = new ImageLoader({
        heart: '@resource/heart.png'
    });

    const game: Game = new Game(gameField, alphabetBox, 'Hangman');

    window.imageLoader = imageLoader;
    window.game = game;

    game.start();
}
