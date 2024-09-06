import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-username-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './username-input.component.html',
  styleUrl: './username-input.component.css'
})
export class UsernameInputComponent {
  name: string = '';

  constructor(private router: Router) {}

  submitName(): void {
    if (this.name.trim()) {
      localStorage.setItem('username', this.name);
      this.router.navigate(['/']).then(r => {});
    }
  }
}
