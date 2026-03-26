import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ CellComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  private _activeIndex = -1;

  @Input() set activeIndex(value: number) {
    this._activeIndex = value;
  }

  get activeIndex() {
    return this._activeIndex;
  }

  @Output() cellClicked = new EventEmitter<number>();

  cells = new Array(9).fill(0).map((cell, position) => position);

  onCellClicked(index: number) {
    this.cellClicked.emit(index);
  }
}