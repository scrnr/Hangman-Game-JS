class View {
    #alphabet = null;
    #canvas = null;
    #context = null;
    #field = null;
    #gameOverScreen = null
    #livesLeft = null;
    #screenBox = null;
    #wordPreview = null;

    #alphabetBtns = [];

    constructor(field) {
        this.#field = field;

        this.#alphabet = document.getElementById('alphabet');
        this.#canvas = document.getElementById('canvas');
        this.#context = this.#canvas.getContext('2d');
        this.#gameOverScreen = document.getElementById('game-over');
        this.#livesLeft = document.getElementById('lives-left');
        this.#screenBox = document.getElementById('screen-box');
        this.#wordPreview = document.getElementById('word-preview');
    }

    renderGameScreen(alphabet) {
        this.#reset();
        this.#screenBox.style.left = '-100%';
        this.#renderAlphabet(alphabet);
    }

    renderWordPreview(letters) {
        this.#clearWordPreview();

        letters.forEach(letter => {
            const item = document.createElement('p');
            item.textContent = letter.toUpperCase();
            item.className = 'letter';
            this.#wordPreview.append(item);
        });
    }

    renderLivesLeft(count) {
        this.#livesLeft.textContent = count <= 0 ? 0 : count;
    }

    addTheClassToTheButton(index, className) {
        const btn = this.#alphabetBtns[index];
        btn.classList.add(className);
        btn.disabled = true;
    }

    #reset() {
        this.#field.classList.add('loading');
        this.#alphabet.innerHTML = '';
        this.#clearWordPreview();

        setTimeout(() => this.#field.classList.remove('loading'), 2000);
    }

    #renderAlphabet(alphabetBtns) {
        this.#alphabetBtns = alphabetBtns;
        alphabetBtns.forEach(letter => this.#alphabet.append(letter));
    }

    #clearWordPreview() {
        this.#wordPreview.innerHTML = '';
    }
}
