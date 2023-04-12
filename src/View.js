class View {
    #animation = null;
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

        this.#canvas.width = 610;
        this.#canvas.height = 300;
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

    renderWinScreen(coords) {
        this.#animation = requestAnimationFrame(() => this.renderWinScreen(coords));

        if (coords.step.count > 0) {
            this.#clearCanvas();
            this.#updateWin(coords);

            coords.circle.forEach(circle => {
                this.#context.beginPath();
                this.#context.strokeStyle = circle.color;
                this.#context.arc(
                    this.#canvas.width / 2,
                    this.#canvas.height / 2,
                    circle.radius,
                    0,
                    Math.PI * 2
                );
                this.#context.stroke();
            });

            this.#context.fillText('You win!', coords.start, 200);
        } else {
            this.#removeAnimation();
        }
    }

    renderGameOverScreen(letters) {
        letters.forEach((letter, index) => {
            if (letter) {
                const letterNotGuess = this.#wordPreview.children[index];
                letterNotGuess.classList.add('not-guessed');
                letterNotGuess.innerHTML = letter.toUpperCase();
            }
        });

        this.#gameOverScreen.classList.add('show');
    }

    renderCanvas(coords) {
        if (!this.#context) return;

        this.#context.beginPath();
        this.#context.moveTo(coords.x, coords.y);
        
        this.#animation = requestAnimationFrame(() => this.renderCanvas(coords));

        if (coords.step.count > 0) {
            this.#update(coords);
            this.#context.lineTo(coords.x, coords.y);
            this.#context.stroke();
        } else {
            this.#removeAnimation();
        }
    }

    renderCanvasCircle(coords) {
        if (!this.#context) return;

        this.#context.beginPath();
        this.#animation = requestAnimationFrame(() => this.renderCanvasCircle(coords));

        if (coords.step.count > 0) {
            this.#updateCircle(coords);
            this.#context.arc(
                coords.x,
                coords.y,
                5,
                0,
                Math.PI * 0.25
            );
            this.#context.stroke();
        } else {
            this.#removeAnimation();
        }
    }

    setOptions(options) {
        for (const option in options) {
            this.#context[option] = options[option];
        }
    }

    addTheClassToTheButton(index, className) {
        const btn = this.#alphabetBtns[index];
        btn.classList.add(className);
        btn.disabled = true;
    }

    #reset() {
        this.#clearCanvas();
        this.#field.classList.add('loading');
        this.#gameOverScreen.classList.remove('show');
        this.#alphabet.innerHTML = '';
        this.#clearWordPreview();

        setTimeout(() => this.#field.classList.remove('loading'), 2000);
    }

    #renderAlphabet(alphabetBtns) {
        this.#alphabetBtns = alphabetBtns;
        alphabetBtns.forEach(letter => this.#alphabet.append(letter));
    }

    #update(coords) {
        coords.x += coords.step.x;
        coords.y += coords.step.y;
        coords.step.count--;
    }

    #updateCircle(coords) {
        coords.angle += Math.PI * 0.05;
        coords.x += Math.cos(coords.angle) * coords.radius;
        coords.y += Math.sin(coords.angle) * coords.radius;
        coords.step.count--;
    }

    #updateWin(coords) {
        coords.start -= coords.step.size;
        coords.step.count--;

        coords.circle.forEach(circle => circle.radius += circle.step);
    }

    #clearWordPreview() {
        this.#wordPreview.innerHTML = '';
    }

    #clearCanvas() {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#context.strokeStyle = '#000000';
    }

    #removeAnimation() {
        cancelAnimationFrame(this.#animation);
    }
}
