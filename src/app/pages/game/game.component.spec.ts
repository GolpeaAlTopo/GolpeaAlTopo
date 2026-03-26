import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GameComponent } from './game.component';
import { BoardComponent } from '../../components/board/board.component';
import { StorageService } from '../../services/storage';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let storageService: StorageService;

  beforeEach(async () => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [GameComponent, BoardComponent],
      providers: [StorageService]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should load player name from history if available', () => {
    vi.stubGlobal('history', { state: { name: 'Mario' } });
    fixture.detectChanges(); 
    expect(component.playerName).toBe('Mario');
  });

  it('should load player name from StorageService if history is empty', () => {
    
    vi.stubGlobal('history', { state: {} });
    vi.spyOn(storageService, 'get').mockReturnValue('Luigi');
    component.ngOnInit();
    expect(component.playerName).toBe('Luigi');
  });

  it('should fallback to null/undefined if neither history nor storage have the name', () => {
    vi.stubGlobal('history', { state: {} });
    vi.spyOn(storageService, 'get').mockReturnValue(null);
    component.ngOnInit();
    expect(component.playerName).toBeNull();
  });

  
  
  it('should set the correct intervalSpeed based on difficulty', () => {
    component.setDifficulty('low');
    expect(component.intervalSpeed).toBe(1000);
    component.setDifficulty('high');
    expect(component.intervalSpeed).toBe(500);
  });

  it('should increase score and reset activeIndex on correct click', () => {
    component.isPlaying = true;
    component.setDifficulty('medium');
    component.activeIndex = 2;
    component.onCellClicked(2);
    expect(component.score).toBe(20);
    expect(component.activeIndex).toBe(-1);
  });
});