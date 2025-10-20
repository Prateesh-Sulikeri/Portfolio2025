import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { SocialBar } from './components/social-bar/social-bar';
@Component({
  selector: 'app-root',
  imports: [Header, SocialBar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portolio-1');
  constructor(private router: Router) {
    this.router
  }
}
