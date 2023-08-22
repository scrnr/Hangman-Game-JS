import { GameStatus } from "../enums/GameStatus";
import { Box } from "../types/Types";
import { Alphabet } from "./Alphabet";
import { Player } from "./Player";
import { Word } from "./Word";

export class Game {
    public readonly Alphabet: Alphabet;
    public readonly Field: HTMLElement;
    public readonly Title: string;
    public readonly Player: Player;
    public readonly Word: Word;

    private status: GameStatus = GameStatus.Ready;

    public get Status(): GameStatus {
        return this.status;
    }

    public constructor(field: HTMLElement, alphabetBox: Box, title: string) {
        this.Field = field;
        this.Title = title;
        this.Alphabet = new Alphabet(alphabetBox);
        this.Player = new Player();
        this.Word = new Word();
    }

    public start(): void {
        this.status = GameStatus.InProcess;
        this.Word.reset();
        this.Alphabet.reset();
        this.Player.reset();
    }
}
