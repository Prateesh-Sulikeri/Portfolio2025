import { Component, HostListener } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Header } from './header/header';
import { SocialBar } from './components/social-bar/social-bar';
import { Container } from './components/notification/container/container';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./pages/footer/footer";
import { ChatWidget } from "./components/chat-widget/chat-widget";

@Component({
  selector: 'app-root',
  imports: [Header, SocialBar, RouterOutlet, Container, Footer, ChatWidget],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isNavigating = false;
  showBackToTop = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isNavigating = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        setTimeout(() => this.isNavigating = false, 200); // smooth fade-in
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshold = window.innerWidth <= 768 ? 100 : 300; // smaller threshold for mobile
    this.showBackToTop = window.scrollY > threshold;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}