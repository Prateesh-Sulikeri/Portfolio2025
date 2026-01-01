import { AfterViewInit, Component, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  live?: string;
  github: string;
  tags: { name: string; icon: string }[];
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
      'Image sorting and duplicate detection tool using AWS Lambda (VGG16) and S3 to automate cleanup for large photo datasets.',
    live: '#',
    github: 'https://github.com/Prateesh-Sulikeri/CloneCatch',
    tags: [
      { name: 'AWS Lambda', icon: 'devicon-amazonwebservices-plain' },
      { name: 'Python', icon: 'devicon-python-plain' },
      { name: 'VGG16', icon: 'fa-solid fa-image' }
    ]
  },
  {
    image: 'images/go-event-ingestor.jpg', // add a relevant image in /images
    title: 'Go Event Ingestor',
    description:
      'High-performance Go event ingestion system with JWT auth, Redis rate limiting, and real-time dashboards to protect backend APIs under bursty traffic.',
    live: '', // no live deployment provided
    github: 'https://github.com/Prateesh-Sulikeri/Go-event-ingestor',
    tags: [
      { name: 'Go', icon: 'devicon-go-plain-wordmark' },
      { name: 'Redis', icon: 'devicon-redis-plain' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
      { name: 'JWT', icon: 'fa-solid fa-key' },               // Font Awesome fallback
      { name: 'WebSocket', icon: 'fa-solid fa-wave-square' }  // FA logical choice
    ]
  },
  {
    image: 'images/project3.jpg',
    title: 'JinBo — AI Assistant',
    description:
      'AI-powered personal assistant built with Express.js and Hugging Face APIs, integrated into the portfolio for dynamic Q&amp;A.',
    live: 'https://jinbo.onrender.com/',
    github: 'https://github.com/Prateesh-Sulikeri/JinBo',
    tags: [
      { name: 'Hugging Face', icon: 'fa-regular fa-face-smile-beam' },
      { name: 'Express', icon: 'devicon-express-original' },
      { name: 'NLP', icon: 'fa-solid fa-brain' }
    ]
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
