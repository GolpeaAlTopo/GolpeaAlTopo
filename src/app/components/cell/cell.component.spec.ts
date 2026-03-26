import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { CellComponent } from './cell.component';

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
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.hasMole).toBe(false);
    expect(component.index).toBe(0);
  });

  it('should not show the mole image by default', () => {
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeNull();
  });

  it('should show the mole image when hasMole is true', () => {
    component.hasMole = true;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
    expect(img.attributes['src']).toContain('diglett.png');
    expect(img.attributes['alt']).toBe('Topo');
  });

  it('should emit cellClicked with the correct index when clicked', () => {
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.cellClicked, 'emit');
    component.index = 5;
    
    const cellDiv = fixture.debugElement.query(By.css('.cell'));
    cellDiv.triggerEventHandler('click', null);

    expect(emitSpy).toHaveBeenCalledWith(5);
  });

  it('should call onClick() method when the div is clicked', () => {
    fixture.detectChanges();
    const onClickSpy = vi.spyOn(component, 'onClick');
    
    const cellDiv = fixture.debugElement.query(By.css('.cell'));
    cellDiv.nativeElement.click();

    expect(onClickSpy).toHaveBeenCalled();
  });
});