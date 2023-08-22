export class Word {
    private readonly letterSize: number;
    private readonly maxLength: number = 12;
    private readonly url: string = 'https://random-word-api.vercel.app/api?words=10';

    private readonly dummyLetter = '_';

    private attempts: number = 0;
    private preview: string[] = [];
    private letters: string[] = [];
    private startPosition: number = 0;

    public get LettersLeft(): number {
        return this.preview.filter((letter: string): boolean => letter === this.dummyLetter).length;
    }

    public constructor() {
        // FIX: 
        this.letterSize = 50;
    }

    public async reset(): Promise<void> {
        const words: string[] = await this.getWords();
        let word: string;

        do {
            word = words[this.getIndex(words.length)];
        } while (word.length > this.maxLength);

        this.letters = word.split('');
        this.preview = this.letters.map((letter: string): string => letter = this.dummyLetter);
        this.setStartPosition();
    }

    public hasLetter(letter: string): boolean {
        let hasLetter: boolean = false;

        this.letters.forEach((item: string, index: number): void => {
            if (item === letter) {
                this.preview[index] = letter;
                hasLetter = true;
            }
        });

        return hasLetter;
    }

    private async getWords(): Promise<string[]> {
        const response: Response = await fetch(this.url);

        if (response.ok) {
            return await response.json();
        } else {
            if (++this.attempts <= 2) {
                return await this.getWords();
            } else {
                return ['error'];
            }
        }
    }

    private getIndex(max: number): number {
        return Math.floor(Math.random() * max);
    }

    private setStartPosition(): void {
        this.startPosition = (this.maxLength - this.letters.length) / 2 * this.letterSize;
    }
}
