import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StorageService } from '../services/storage';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);

    localStorage.clear();
    
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set()', () => {
    it('should store a string value in localStorage', () => {
      const key = 'user';
      const value = { name: 'Diglett', score: 100 };

      service.set(key, value);

      const storedValue = localStorage.getItem(key);
      expect(storedValue).toBe(JSON.stringify(value));
      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
    });

    it('should store a simple string without extra quotes (as JSON)', () => {
      service.set('theme', 'dark');
      expect(localStorage.getItem('theme')).toBe('"dark"'); });
  });

  describe('get()', () => {
    it('should return the parsed value if key exists', () => {
      const key = 'score';
      const value = 500;
      localStorage.setItem(key, JSON.stringify(value));

      const result = service.get<number>(key);

      expect(result).toBe(500);
      expect(typeof result).toBe('number');
      expect(localStorage.getItem).toHaveBeenCalledWith(key);
    });

    it('should return an object correctly parsed', () => {
      const key = 'config';
      const value = { volume: 80, mute: false };
      localStorage.setItem(key, JSON.stringify(value));

      const result = service.get<typeof value>(key);

      expect(result).toEqual(value);
      expect(result?.volume).toBe(80);
    });

    it('should return null if the key does not exist', () => {
      const result = service.get('non-existent-key');
      expect(result).toBeNull();
    });
  });
});