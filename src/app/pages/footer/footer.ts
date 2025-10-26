import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  currentYear: number = new Date().getFullYear();

  socialLinks = [
    { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/Prateesh-Sulikeri' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/prateesh-sulikeri' },
    { name: 'Medium', icon: 'fab fa-medium', url: 'https://medium.com' },
  ];
}
