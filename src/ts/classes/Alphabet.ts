import { Box, Letter } from '../types/Types';

export class Alphabet {
    private readonly box: Box;

    public constructor(box: Box) {
        this.box = box;
    }

    public reset(): void {
        const letters: string = 'abcdefghijklmnopqrstuvwxyz';
        this.box.innerHTML = '';

        for (const item of letters) {
            const letter: Letter = this.getButton(item);
            letter.onclick = (event: Event): void => {
                this.hideLetter(letter);
            };

            this.box.append(item);
        }
    }

    public hideLetter(letter: Letter): void {
        letter.disabled = true;
        letter.classList.add('hide');
    }

    public disableAlphabet(): void {
        (this.box.childNodes as NodeListOf<Letter>).forEach((letter: Letter): void => {
            letter.onclick = null;
        });
    }

    private getButton(letter: string): Letter {
        const button: Letter = document.createElement('button');
        button.type = 'button';
        button.className = 'alphabet-item';
        button.value = letter;
        button.textContent = letter.toUpperCase();

        return button;
    }
}
4
