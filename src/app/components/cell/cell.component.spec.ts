import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { CellComponent } from './cell.component';
import { EventEmitter } from '@angular/core';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [CellComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(CellComponent);
  component = fixture.componentInstance;
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input values', () => {
    component.hasMole = true;
    component.index = 5;

    fixture.detectChanges();

    expect(component.hasMole).toBe(true);
    expect(component.index).toBe(5);
  });

  it('should emit cellClicked with index when onClick is called', () => {
    vi.spyOn(component.cellClicked, 'emit');

    component.index = 3;
    component.onClick();

    expect(component.cellClicked.emit).toHaveBeenCalledWith(3);
  });

  it('should emit cellClicked when clicking on the element', () => {
    vi.spyOn(component.cellClicked, 'emit');

    component.index = 7;
    fixture.detectChanges();

    const cellElement = fixture.debugElement.query(By.css('div'));

    cellElement.triggerEventHandler('click');

    expect(component.cellClicked.emit).toHaveBeenCalledWith(7);
  });
});
