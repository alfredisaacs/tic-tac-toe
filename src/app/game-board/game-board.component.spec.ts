import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Tic tac toe');
  });

  it('should start the game', waitForAsync(() => {
    spyOn(component, 'startGame');
    fixture.detectChanges();
    const startButton = fixture.debugElement.nativeElement.querySelector('.start-game');
    startButton.click();
    fixture.whenStable().then(() => {
      expect(component.startGame).toHaveBeenCalled();
    });
  }));
  it('will be playable', waitForAsync(() => {
    spyOn(component, 'clickGame');
    fixture.detectChanges();
    const gameButton = fixture.debugElement.nativeElement.querySelector('.column');
    gameButton.click();
    fixture.whenStable().then(() => {
      expect(component.clickGame).toHaveBeenCalled();
    });
  }));
});
