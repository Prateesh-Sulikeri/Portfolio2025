import { Component, OnInit, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { Notification } from '../services/notification';
import { TooltipDirective } from '../tooltip';

@Component({
  selector: 'app-home',
  imports: [TooltipDirective],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy, AfterViewInit {
roles = [
  'Backend Engineer 🔧',
  'Cloud Developer ☁️',
  'DevOps Enthusiast ⚙️',
  'Machine Learning Explorer 🤖',
  'Systems Builder 🧱',
]

  accentColor = 'var(--accent-blue)';
  currentRole = '';
  index = 0;
  private typingInterval: any;
  private deletingInterval: any;

  private hasScrolled = false;
  private scrollListener?: () => void;
  private timer?: ReturnType<typeof setTimeout>;

  constructor(private notify: Notification, private ngZone: NgZone) { }

  notification_caller() {
    // 🔄 Reset notification flag every time the Home component loads
    sessionStorage.removeItem('homeHintShown');

    this.scrollListener = () => (this.hasScrolled = true);
    window.addEventListener('scroll', this.scrollListener, { passive: true });

    console.log("in notif_caller");

    this.timer = setTimeout(() => {
      this.ngZone.run(() => {
        if (!this.hasScrolled && !sessionStorage.getItem('homeHintShown')) {
          console.log("triggered");
          this.notify.info("Psst! You can scroll down to know more about me!", 6500);
          sessionStorage.setItem('homeHintShown', '1'); // mark as shown
        }
      });
    }, 15000);
  }


  ngOnInit(): void {
    this.typeRole();
  }

  ngAfterViewInit(): void {
    this.notification_caller();
  }

  ngOnDestroy(): void {
    clearInterval(this.typingInterval);
    clearInterval(this.deletingInterval);
    if (this.scrollListener) window.removeEventListener('scroll', this.scrollListener);
    if (this.timer) clearTimeout(this.timer);
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
