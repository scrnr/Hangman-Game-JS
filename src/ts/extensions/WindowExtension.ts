import { Game } from '../classes/Game';
import { ImageLoader } from '../classes/ImageLoader';

declare global {
    interface Window {
        game: Game,
        imageLoader: ImageLoader
    }
}
