export class Player {
    private lifes: number = 0;

    public get Lifes(): number {
        return this.lifes;
    }

    public reset(): void {
        this.lifes = 6;
    }

    public minusLife(): void {
        this.lifes--;
    }
}
