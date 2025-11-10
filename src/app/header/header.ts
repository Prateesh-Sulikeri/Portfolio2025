import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {  Event } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuOpen = false;


constructor(private router: Router) {
  this.router.events.subscribe((event: Event) => {
    console.log('Router event:', event);
  });
}


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.classList.toggle('menu-open', this.menuOpen);
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.classList.remove('menu-open');
  }

  scrollTo(sectionId: string) {
    this.closeMenu();
    
    // Check if we're on the main route
    if (this.router.url !== '/' && this.router.url !== '') {
      // Navigate to main route first, then scroll
      this.router.navigate(['/']).then(() => {
        // Wait for navigation and rendering to complete
        setTimeout(() => {
          this.scrollToSection(sectionId);
        }, 200);
      });
    } else {
      // Already on main route, just scroll
      this.scrollToSection(sectionId);
    }
  }

  private scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}