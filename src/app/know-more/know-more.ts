import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';

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
export class KnowMore implements AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
  }

  skills: SkillCategory[] = [
    { category: 'Languages', skills: ['Java', 'Python', 'C++'] },
    { category: 'Tools', skills: ['VSCode', 'Nvim'] },
    { category: 'OS', skills: ['Linux', 'Windows'] },
    { category: 'Databases', skills: ['MongoDB', 'MySQL', 'PostGreSQL'] },
    { category: 'Frameworks', skills: ['Angular', 'SpringBOOT'] },
    { category: 'UI', skills: ['ReactJS'] },
    { category: 'Misc', skills: ['Tomato pasta']}
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
    link.href = 'assets/YourResume.pdf';
    link.download = 'My_Resume.pdf';
    link.click();
  }
}
