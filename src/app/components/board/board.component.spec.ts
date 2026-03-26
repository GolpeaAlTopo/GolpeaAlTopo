import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BoardComponent } from './board.component';
import { CellComponent } from '../cell/cell.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent, CellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
  });

  it('should create the board', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render exactly 9 cells', () => {
    fixture.detectChanges();
    const cells = fixture.debugElement.queryAll(By.directive(CellComponent));
    expect(cells.length).toBe(9);
  });

  it('should pass the correct index to each cell', () => {
    fixture.detectChanges();
    const cells = fixture.debugElement.queryAll(By.directive(CellComponent));
    
    cells.forEach((cellDebugElement, index) => {
      const cellInstance = cellDebugElement.componentInstance as CellComponent;
      expect(cellInstance.index).toBe(index);
    });
  });

  it('should set hasMole=true only on the activeIndex cell', () => {
    const activeIndex = 4;
    component.activeIndex = activeIndex;
    fixture.detectChanges();

    const cells = fixture.debugElement.queryAll(By.directive(CellComponent));
    
    cells.forEach((cellDebugElement, index) => {
      const cellInstance = cellDebugElement.componentInstance as CellComponent;
      if (index === activeIndex) {
        expect(cellInstance.hasMole).toBe(true);
      } else {
        expect(cellInstance.hasMole).toBe(false);
      }
    });
  });

  it('should emit cellClicked when a child cell emits its event', () => {
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.cellClicked, 'emit');
    
    const firstCell = fixture.debugElement.query(By.directive(CellComponent));
    firstCell.componentInstance.cellClicked.emit(0);

    expect(emitSpy).toHaveBeenCalledWith(0);
  });

  it('should call onCellClicked when a cell is clicked', () => {
    const onCellClickedSpy = vi.spyOn(component, 'onCellClicked');
    fixture.detectChanges();
    const secondCell = fixture.debugElement.queryAll(By.directive(CellComponent))[1];
    secondCell.componentInstance.cellClicked.emit(1);
    expect(onCellClickedSpy).toHaveBeenCalledWith(1);
  });
});