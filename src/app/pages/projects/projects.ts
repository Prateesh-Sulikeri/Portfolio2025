import { AfterViewInit, Component, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  live: string;
  github: string;
  tags: string[]; // ✅ added
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
      'Image sorting and duplicate detection tool powered by AWS Lambda (VGG16) and S3. Automates cleanup for large photo datasets.',
    live: '#',
    github: 'https://github.com/Prateesh-Sulikeri/CloneCatch',
    tags: ['AWS (Lambda, S3)', 'Python', "VGG16"] 
  },
  {
    image: 'images/project2.jpg',
    title: 'Redditorials API',
    description:
      'FastAPI-based Reddit content API to fetch and filter stories programmatically for automation tools.',
    live: '#',
    github: 'https://github.com/Prateesh-Sulikeri/redditorials',
    tags: ['FastAPI', 'Python', 'Reddit API']
  },
  {
    image: 'images/project3.jpg',
    title: 'JinBo — AI Assistant',
    description:
      'AI-powered personal assistant built with Express.js and Hugging Face APIs, integrated into my portfolio for dynamic Q&A.',
    live: 'https://jinbo.onrender.com/',
    github: 'https://github.com/Prateesh-Sulikeri/JinBo',
    tags: ['Hugging Face', 'Express', 'NLP']
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
