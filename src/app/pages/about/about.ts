import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit, OnDestroy{
 constructor(private router: Router) {}

  navigateToContact() {
    this.router.navigateByUrl('/know-more');
  }

@ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef;
  isAboutVisible = false;
  private observer!: IntersectionObserver;

  ngOnInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isAboutVisible = true;
          this.observer.unobserve(this.aboutSection.nativeElement);
        }
      },
      { threshold: 0.3 }
    );
    this.observer.observe(this.aboutSection.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }
}
