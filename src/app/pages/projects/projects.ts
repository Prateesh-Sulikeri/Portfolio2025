import { AfterViewInit, Component, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  live: string;
  github: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private router: Router,
    private ngZone: NgZone
  ) {}

  projects: Project[] = [
    {
      image: 'images/project1.jpg',
      title: 'Clone Catch',
      description:
        'ML-powered tool for automatic person, place, and object detection, sorting, and removing blurry/duplicate images.',
      live: '#',
      github: '#'
    },
    {
      image: 'images/project2.jpg',
      title: 'JinBo',
      description:
        'Personal portfolio chat bot for interactive communication and dynamic content display.',
      live: 'https://jinbo.onrender.com/',
      github: 'https://github.com/Prateesh-Sulikeri/JinBo/tree/main'
    },
    {
      image: 'images/project3.jpg',
      title: 'FinBo',
      description:
        'AI-based financial advisor bot for expenditure analysis, investment portfolio guidance, spend control, and general finance advice.',
      live: '#',
      github: '#'
    }
  ];

  openLink(url: string) {
    if (url && url !== '#') window.open(url, '_blank');
  }

  viewMore() {
    this.router.navigateByUrl('/all-projects');
  }

  ngAfterViewInit() {
  const section = this.el.nativeElement.querySelector('.projects-section');
  if (!section) return;

  this.observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add('active');
          observer.unobserve(section); // ✅ stop observing once triggered
        }
      });
    },
    {
      threshold: 0.25, // triggers when ~25% of the section is visible
    }
  );

  // Observe the section once it's ready
  setTimeout(() => {
    this.observer.observe(section);
  }, 200);
}


  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }
}
