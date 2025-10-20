import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  roles = [
    'Full Stack Developer 💻',
    'Cloud Architect Associate ☁️',
    'Machine Learning Enthusiast 🤖',
    'Backyard Junky Scientist 🧪',
    'Cloud Developer Associate 🌩️',
    'Backend Engineer 🔧',
    'Raspberry Pi Enthusiast 🍓',
    'HomeLabbing Noob 🧰',
  ]

  accentColor = 'var(--accent-blue)';
  currentRole = '';
  index = 0;
  private typingInterval: any;
  private deletingInterval: any;

  ngOnInit(): void {
    this.typeRole();
  }

  ngOnDestroy(): void {
    clearInterval(this.typingInterval);
    clearInterval(this.deletingInterval);
  }

  private typeRole(): void {
    const role = this.roles[this.index];
    let charIndex = 0;
    this.currentRole = '';

    this.typingInterval = setInterval(() => {
      if (charIndex < role.length) {
        this.currentRole += role.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(this.typingInterval);
        setTimeout(() => this.deleteRole(), 1500); // pause before deleting
      }
    }, 100);
  }

  private deleteRole(): void {
    let charIndex = this.currentRole.length;

    this.deletingInterval = setInterval(() => {
      if (charIndex > 0) {
        this.currentRole = this.currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        clearInterval(this.deletingInterval);
        this.index = (this.index + 1) % this.roles.length;
        setTimeout(() => this.typeRole(), 300); // small pause before typing next
      }
    }, 50);
  }
  scrollTo(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
