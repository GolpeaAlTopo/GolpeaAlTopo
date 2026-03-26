import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}