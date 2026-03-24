import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() activeIndex = -1;

  @Output() cellClicked = new EventEmitter<number>();

  onCellClicked(index: number) {
    this.cellClicked.emit(index);
  }
}