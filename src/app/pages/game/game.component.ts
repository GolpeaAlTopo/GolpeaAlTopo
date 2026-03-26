import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../../components/board/board.component';
import { ChangeDetectorRef } from '@angular/core';
import { StorageService } from '../../services/storage';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  playerName: string = '';
  score: number = 0;

  difficulty: string = '';

  activeIndex: number = -1;
  intervalId: any;

  isPlaying:boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef, private storage: StorageService) {
    
  }

  ngOnInit() {
    this.playerName = history?.state?.name || this.storage.get<string>('playerName') || 'Jugador';
    this.score = this.storage.get<number>('score') || 0;
  }

  get intervalSpeed() {
    if (this.difficulty === 'low') {
      return 1000;
    } else if (this.difficulty === 'medium') {
      return 750;
    } else if (this.difficulty === 'high') {
      return 500;
    } else {
      return 1000;
    }
  }

  setDifficulty(level: 'low' | 'medium' | 'high') {
    this.difficulty = level;
  }

  startGame() {
    this.isPlaying = true;
    this.score = 0;
    this.activeIndex = -1;

    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      this.activeIndex = Math.floor(Math.random() * 9);
      this.changeDetectorRef.detectChanges();
    }, this.intervalSpeed);
  }

  onCellClicked(index: number) {
    
    if (!this.isPlaying || index !== this.activeIndex) {
      return
    } else {
      
      if (this.difficulty === 'low') {
        this.score += 10;
      } else if (this.difficulty === 'medium') {
        this.score += 20;
      } else {
        this.score += 30;
      }

      this.activeIndex = -1;
      
    };

    this.storage.set('score', this.score);
  }
}