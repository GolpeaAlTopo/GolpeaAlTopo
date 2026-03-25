import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {
  name = '';
  error = '';

  constructor(private router: Router) {
    
  }
  

  startGame() {
    if (!this.name.trim()) {
      this.error = 'Introduce un nombre válido';
      return
    };
    this.error = '';
    this.router.navigate(['/game'], { state: { name: this.name } });
  }
}
