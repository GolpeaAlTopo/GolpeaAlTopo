import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let storageService: StorageService;

  beforeEach(async () => {
    // Mock simple del Router
    const routerMock = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        StorageService // Inyectamos el servicio real (usa localStorage internamente)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    storageService = TestBed.inject(StorageService);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if name is empty', () => {
    component.name = '   ';
    component.startGame();
    expect(component.error).toBe('Introduce un nombre válido');
  });

  it('should save to storage and navigate if name is valid', () => {
    const storageSpy = vi.spyOn(storageService, 'set');
    component.name = 'Link';
    
    component.startGame();

    expect(component.error).toBe('');
    expect(storageSpy).toHaveBeenCalledWith('playerName', 'Link');
    expect(router.navigate).toHaveBeenCalledWith(['/game'], {
      state: { name: 'Link' }
    });
  });
});