import { Component, OnInit } from '@angular/core';
import { Core } from '../core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  providers: [Core]
})

export class GameBoardComponent implements OnInit {
  constructor(public game: Core) { }

  ngOnInit(): void {
  }

  startGame(): void{
    // Start the game here
    this.game.gameStart();
    const currentPlayerMessage = 'Player ' + this.game.currentPlayer + ' is playing';
    const textToShow = document.getElementById('gameStatus')!;
    textToShow.innerHTML = currentPlayerMessage;
  }

  async clickGame(square: any): Promise<void> {
    if ( this.game.statusOfGame === 1 && square.currentTarget.innerHTML === '' ) {
      const squareName = square.currentTarget.getAttribute('id');
      const textToShow = document.getElementById('gameStatus') !;
      this.game.setLetter(squareName, this.game.currentPlayer);
      const letter = this.game.getPlayerLetter();
      square.currentTarget.innerHTML = letter;

      // Check if there's a winner;
      await this.game.checkIfWinner().then((end: boolean) => {
        if ( this.game.statusOfGame === 0 && end ){
          textToShow.innerHTML = 'Player ' + this.game.currentPlayer + ' won!';
        }
      });
      // Check if squares are full and there's no winner
      await this.game.checkIfDraw().then((end: boolean) => {
        if ( this.game.statusOfGame === 0 && end ){
          textToShow.innerHTML = 'Game Over. Draw!';
        }
      });

      this.game.changeUser();

      if ( this.game.statusOfGame === 1 ) {
        const currentPlayerMessage = 'Player ' + this.game.currentPlayer + ' is playing';
        textToShow.innerHTML = currentPlayerMessage;
      }
    }
  }

}
