import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit, OnDestroy {
  totalExperience = '';
  constructor(private router: Router) { }

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

    this.calculateTotalExperience();
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  private calculateTotalExperience(): void {
    // Internship (completed)
    const internshipMonths = 3;

    // Full-time role start: April 1, 2024
    const fullTimeStart = new Date(2024, 3, 1); // month is 0-based
    const today = new Date();

    const fullTimeMonths = this.monthDiff(fullTimeStart, today);

    const totalMonths = internshipMonths + fullTimeMonths;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    this.totalExperience = this.formatExperience(years, months);
  }

  private monthDiff(start: Date, end: Date): number {
    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    // If current date is before start day of month, don't count this month fully
    if (end.getDate() < start.getDate()) {
      months--;
    }

    return Math.max(0, months);
  }

  private formatExperience(years: number, months: number): string {
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }

    if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }

    return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  }
}
