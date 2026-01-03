import { AfterViewInit, Component, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  slug: string;   // ✅ ADD THIS
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
    image: 'images/go-event-ingestor.jpg',
    title: 'Go Rate Limited Event Ingestor',
    slug: 'go-rate-limited-event-ingestor',
    description:
      'High-throughput Go ingestion service with Redis-backed rate limiting, JWT auth, and concurrency-safe batching.'
  },
  {
    image: 'images/project3.jpg',
    title: 'JinBo — AI Portfolio Assistant',
    slug: 'jinbo',
    description:
      'Stateless AI assistant built with Express.js and Hugging Face APIs to answer portfolio-specific questions.'
  },
  {
    image: 'images/project1.jpg',
    title: 'CloneCatch',
    slug: 'clone-catch',
    description:
      'Python-based duplicate image detection and face-based sorting utility using deep vision embeddings.'
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

readMore(project: Project) {
  this.router.navigate(['/all-projects'], {
    queryParams: { open: project.slug }
  });
}

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }
}
