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

  currentRole = 'Backend Developer';
  private hasScrolled = false;
  private scrollListener?: () => void;
  private timer?: ReturnType<typeof setTimeout>;

  constructor(private notify: Notification, private ngZone: NgZone) {}

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.notification_caller();
  }

  ngOnDestroy(): void {
    if (this.scrollListener) window.removeEventListener('scroll', this.scrollListener);
    if (this.timer) clearTimeout(this.timer);
  }

  notification_caller() {
    sessionStorage.removeItem('homeHintShown');
    this.scrollListener = () => (this.hasScrolled = true);
    window.addEventListener('scroll', this.scrollListener, { passive: true });

    this.timer = setTimeout(() => {
      this.ngZone.run(() => {
        if (!this.hasScrolled && !sessionStorage.getItem('homeHintShown')) {
          this.notify.info("Psst! You can scroll down to know more about me!", 6500);
          sessionStorage.setItem('homeHintShown', '1');
        }
      });
    }, 15000);
  }

  scrollTo(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
