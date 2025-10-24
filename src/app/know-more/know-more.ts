import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Notification } from '../services/notification';
import { Router } from '@angular/router';

interface SkillCategory {
  category: string;
  skills: string[];
}

interface WorkExperience {
  role: string;
  company: string;
  duration: string;
  details: string[];
}

@Component({
  selector: 'app-know-more',
  imports: [CommonModule],
  templateUrl: './know-more.html',
  styleUrl: './know-more.css'
})
export class KnowMore implements AfterViewInit, OnInit, OnDestroy {
  private stayTimer: any;

  constructor(private notify: Notification, private router: Router) { }

  notification_caller() {
    this.stayTimer = setTimeout(() => {
      this.showeasterEggNotification();
    }, 15000);
  }

  showeasterEggNotification() {
    this.notify.info(
      "Appreciate you sticking around! Wanna peek into The Developer’s Thoughts? Click Here! (It’s me, btw 😅)",
      15000, '/dev-thoughts'
    );

    setTimeout(() => {
      const link = document.getElementById('devThoughtsLink');
      if (link) {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          this.router.navigateByUrl('/dev-thoughts'); // opens in the same tab
        });
      }
    }, 100);
  }



  ngOnDestroy() {
    // Clear the timer when leaving page or component destroyed
    if (this.stayTimer) {
      clearTimeout(this.stayTimer);
    }
  }

  ngOnInit(): void {
    this.notification_caller();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
  }

  skills: SkillCategory[] = [
    { category: 'Languages', skills: ['Java', 'Python', 'C++'] },
    { category: 'Tools', skills: ['VSCode', 'Nvim'] },
    { category: 'OS', skills: ['Linux', 'Windows'] },
    { category: 'Databases', skills: ['MongoDB', 'MySQL', 'PostGreSQL', 'asidjioasjdioajsdiojsdiojsdadiojsiojdiasjdio'] },
    { category: 'Frameworks', skills: ['Angular', 'SpringBOOT'] },
    { category: 'UI', skills: ['ReactJS'] },
    { category: 'Misc', skills: ['Tomato pasta'] }
  ];

  workExperiences: WorkExperience[] = [
    {
      role: 'Software Developer',
      company: 'Company A',
      duration: 'Jan 2021 - Dec 2022',
      details: [
        'Built scalable backend services using Java & SpringBOOT',
        'Integrated cloud services (AWS & GCP)',
        'Collaborated with frontend teams for Angular & React apps'
      ]
    },
    {
      role: 'Cloud Engineer',
      company: 'Company B',
      duration: 'Feb 2023 - Present',
      details: [
        'Designed and maintained cloud infrastructure',
        'Optimized CI/CD pipelines',
        'Worked on containerized applications using Docker & Kubernetes'
      ]
    }
  ];

  downloadResume() {
    // Provide the path to your resume file in assets folder
    const link = document.createElement('a');
    link.href = 'resume-sample.pdf';
    link.download = 'Prateesh-Sulikeri_Resume.pdf';
    link.click();
  }
}
