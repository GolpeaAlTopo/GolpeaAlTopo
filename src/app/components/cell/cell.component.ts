import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() hasMole = false;
  @Input() index = 0;

  @Output() cellClicked = new EventEmitter<number>();

  onClick() {
    this.cellClicked.emit(this.index);
  }
}