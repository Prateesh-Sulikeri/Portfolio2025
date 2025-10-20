import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuOpen = false;

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
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
