class Game {
    #letters = [];
    #lettersPreview = [];
    #lettersLeft = 0;
    #livesLeft = 6;
    #url = '';

    constructor() {
        this.#url = 'https://random-word-api.vercel.app/api?words=10';
    }

    async start() {
        this.#reset();
        this.#letters = await this.#getRandomWord();
        this.#lettersLeft = this.#letters.length;
        this.#lettersPreview = Array(this.#lettersLeft).fill('_');
    }

    getState() {
        return {
            livesLeft: this.#livesLeft,
            letters: this.#lettersPreview
        };
    }

    hasLetter(letter) {
        let response = {};

        if (this.#letters.includes(letter)) {
            const indexes = this.#letters
                .map((value, index) => value === letter ? index : false)
                .filter(value => value !== false);

            indexes.forEach(index => {
                this.#lettersPreview[index] = letter;
                this.#lettersLeft--;
            });

            response = {
                letterHas: true,
                btnClass: 'correct'
            };
        } else {
            this.#livesLeft--;

            response = {
                letterHas: false,
                btnClass: 'uncorrect'
            };
        }

        const isEnd = this.#isTheEndOfTheGame();

        if (isEnd.success) {
            if (isEnd.result === 'game-over') {
                this.#lettersPreview = this.#getUniqueLetters();
            }

            response = { ...response, ...isEnd };
        }

        return response;
    }

    #reset() {
        this.#livesLeft = 6;
        this.#letters = [];
        this.#lettersPreview = [];
    }

    async #getRandomWord() {
        const response = await fetch(this.#url);

        let words = [];

        if (response.ok) {
            words = await response.json();
        } else {
            words = ['error'];
        }

        let index = this.#getIndex(words);

        let word = words[index];

        while (word.length > 12) {
            index = this.#getIndex(words);
            word = words[index];
        }

        return word.split('');
    }

    #getIndex(array) {
        return Math.floor(Math.random() * array.length);
    }

    #isTheEndOfTheGame() {
        let response = {};

        if (this.#lettersLeft === 0) {
            response = {
                success: true,
                result: 'win'
            };
        } else if (this.#livesLeft === 0) {
            response = {
                success: true,
                result: 'game-over'
            };
        } else {
            response = {
                success: false
            };
        }

        return response;
    }

    #getUniqueLetters() {
        return this.#lettersPreview.map((letter, index) => {
            if (letter === '_') {
                return this.#letters[index];
            } else {
                return null;
            }
        });
    }
}
