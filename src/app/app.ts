import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Header } from './header/header';
import { SocialBar } from './components/social-bar/social-bar';
import { Container } from './components/notification/container/container';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, SocialBar, RouterOutlet, Container],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isNavigating = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isNavigating = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        setTimeout(() => this.isNavigating = false, 200); // delay for smooth fade-in
      }
    });
  }
}
