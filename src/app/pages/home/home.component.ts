import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  name = '';
  error = '';

  constructor(private router: Router, private storage: StorageService) {}

  startGame() {

    const trimmedName = this.name.trim();

    if (!trimmedName) {
      this.error = 'Introduce un nombre válido';
      return;
    }

    this.error = '';
    this.storage.set('playerName', trimmedName); 
    this.router.navigate(['/game'], {
      state: { name: trimmedName }
    });
  }
}