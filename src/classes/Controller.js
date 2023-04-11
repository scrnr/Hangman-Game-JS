class Controller {
    #game = null;

    #alphabetBtns = [];

    constructor(game) {
        this.#game = game;
    }

    async startGame() {
        this.#alphabetBtns = this.#getAlphabet();

        await this.#game.start();

        this.#alphabetBtns.forEach((letter) => {
            letter.onclick = () => {
                const response = this.#game.hasLetter(letter.value);
            }
        });
    }

    #getAlphabet() {
        const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const readyAlphabet = [];

        letters.forEach(letter => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'alphabet-item';
            button.value = letter;
            button.textContent = letter.toUpperCase();
            readyAlphabet.push(button);
        });

        return readyAlphabet;
    }
}
