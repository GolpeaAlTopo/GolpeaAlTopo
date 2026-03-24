import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {

  constructor(private router: Router) {
    this.router = router;
  }
  name = '';
  

  startGame() {
    if (!this.name.trim()) {
      return
    };
    this.router.navigate(['/game'], { state: { name: this.name } });
  }
}
