import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    if (!document.querySelector('app-root')) {
      const root = document.createElement('app-root');
      document.body.appendChild(root);
    }

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  afterAll(() => {
    document.querySelector('app-root')?.remove();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have the correct title property', () => {
    expect(app.title).toBeDefined();
  });

  it('should render the router outlet', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});