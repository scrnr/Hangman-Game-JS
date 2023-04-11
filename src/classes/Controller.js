class Controller {
    #game = null;
    #view = null;

    #alphabetBtns = [];

    constructor(game, view) {
        this.#game = game;
        this.#view = view;
    }

    async startGame() {
        this.#alphabetBtns = this.#getAlphabet();
        this.#view.renderGameScreen(this.#alphabetBtns);

        await this.#game.start();
        const state = this.#game.getState();
        this.#view.renderWordPreview(state.letters);
        this.#view.renderLivesLeft(state.livesLeft);

        this.#alphabetBtns.forEach((letter) => {
            letter.onclick = () => {
                const response = this.#game.hasLetter(letter.value);
                this.#hasLetterHandler(response, index);
            }
        });
    }

    #hasLetterHandler(response, btnIndex) {
        this.#view.addTheClassToTheButton(btnIndex, response.btnClass);
        const state = this.#game.getState();

        if (response.letterHas) {
            this.#view.renderWordPreview(state.letters);
        } else {
            this.#view.renderLivesLeft(state.livesLeft);
        }


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
