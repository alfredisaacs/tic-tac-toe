import { StatusOfGame } from './status-of-game';

export class Core {
    grid: Array<number> = [];
    currentPlayer: number = 0;
    statusOfGame: StatusOfGame = 0;

    playerOneWins: Array<Array<number>> = [
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0, 0],
    ];

    playerTwoWins: Array<Array<number>> = [
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 2, 0, 0, 2, 0, 0],
        [0, 2, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 2],
        [2, 0, 0, 0, 2, 0, 0, 0, 2],
        [0, 0, 2, 0, 2, 0, 2, 0, 0],
    ];

    public constructor() {
        this.statusOfGame = StatusOfGame.stop;
        this.grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    gameStart(): void {
        this.currentPlayer = 1;
        this.grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.statusOfGame = StatusOfGame.start;
    }
    setLetter(square: number, value: number): void {
        this.grid[square] = value;
    }
    getPlayerLetter(): string {
        const letterToShow = (this.currentPlayer === 2) ? 'O' : 'X';
        return letterToShow;
    }
    changeUser(): void {
        this.currentPlayer = (this.currentPlayer === 2) ? 1 : 2;
    }
    endTheGame(): void {
        this.statusOfGame = StatusOfGame.stop;
    }

    compareArrays(p1: Array<any>, p2: Array<any>): boolean {
        return Array.isArray(p1) && Array.isArray(p2) && p1.length === p2.length && p1.every( (value, index) => value === p2[index]);
    }

    async checkIfDraw(): Promise<boolean> {
        let noWinner = true;
        if ( this.grid.includes(0) ){
            noWinner = false;
        }
        if ( noWinner ) {
            this.endTheGame();
            return true;
        }else {
            return false;
        }
    }

    async checkIfWinner(): Promise<boolean> {
        let playerWon = false;
        const checkPlays = (this.currentPlayer === 1) ? this.playerOneWins : this.playerTwoWins;
        const checkResults = [];
        this.grid.forEach((square, index) => {
            if ( square !== this.currentPlayer ){
                checkResults[index] = 0;
            }else {
                checkResults[index] = square;
            }
        });

        checkPlays.forEach((cosa) => {
            if ( this.compareArrays(cosa, checkResults )){
                playerWon = true;
            }
        });
        if ( playerWon ) {
            this.endTheGame();
            return true;
        }else {
            return false;
        }
    }
}
