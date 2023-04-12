class Controller {
    #coords = null;
    #game = null;
    #view = null;

    #alphabetBtns = [];

    constructor(game, view, coords) {
        this.#game = game;
        this.#view = view;
        this.#coords = coords;
    }

    async startGame() {
        this.#alphabetBtns = this.#getAlphabet();
        this.#view.renderGameScreen(this.#alphabetBtns);
        this.#drawHangman();

        await this.#game.start();
        const state = this.#game.getState();
        this.#view.renderWordPreview(state.letters);
        this.#view.renderLivesLeft(state.livesLeft);

        this.#alphabetBtns.forEach((letter, index) => {
            letter.onclick = () => {
                const response = this.#game.hasLetter(letter.value);
                this.#hasLetterHandler(response, index);
            }
        });
    }

    #drawHangman() {
        const { options, coords } = this.#coords.getHangmanCoords();

        this.#view.setOptions(options);

        coords.forEach((coord, index) => {
            setTimeout(() => this.#view.renderCanvas(coord), 500 * index);
        });
    }

    #drawPerson(livesLeft) {
        this.#view.setOptions({
            liveWidth: 6,
            strokeStyle: '#ffdfc4'
        });

        let coords = {};

        switch (livesLeft) {
            case 5:
                coords = this.#coords.getHeadCoords();
                this.#view.renderCanvasCircle(coords);
                return;
            case 4:
                coords = this.#coords.getBodyCoords();
                break;
            case 3:
                coords = this.#coords.getLeftHandCoords();
                break;
            case 2:
                coords = this.#coords.getRightHandCoords();
                break;
            case 1:
                coords = this.#coords.getLeftLegCoords();
                break;
            case 0:
                coords = this.#coords.getRightLegCoords();
                break;
        }

        this.#view.renderCanvas(coords);
    }

    #hasLetterHandler(response, btnIndex) {
        this.#view.addTheClassToTheButton(btnIndex, response.btnClass);
        const state = this.#game.getState();

        if (response.letterHas) {
            this.#view.renderWordPreview(state.letters);
        } else {
            this.#drawPerson(state.livesLeft);
            this.#view.renderLivesLeft(state.livesLeft);
        }

        if (response.success) {
            this.#removeClickHandler();

            switch (response.result) {
                case 'win':
                    const { options, coords } = this.#coords.getWinScreenCoords();

                    this.#view.setOptions(options);

                    this.#view.renderWinScreen(coords);
                    break;
                case 'game-over':
                    this.#view.renderGameOverScreen(state.letters);
                    break;
            }
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

    #removeClickHandler() {
        this.#alphabetBtns.forEach(letter => letter.onclick = null);
    }
}
