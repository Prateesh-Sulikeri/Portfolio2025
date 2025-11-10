import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private router: Router) {}

  navigateToForm() {
    this.router.navigateByUrl('/contact-form');
  }

  ngAfterViewInit() {
    const section = this.el.nativeElement.querySelector('.contact-section');
    if (!section) return;

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('active');
            observer.unobserve(section); // ✅ Trigger once only
          }
        });
      },
      { threshold: 0.25 }
    );

    setTimeout(() => this.observer.observe(section), 200);
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }
}
