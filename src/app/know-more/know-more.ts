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

interface Certification {
  title: string;
  description: string;
  image?: string;
  link?: string;
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
      "Appreciate you sticking around! Wanna peek into The Developer's Thoughts? Click Here! (It's me, btw 😅)",
      15000, '/dev-thoughts'
    );

    setTimeout(() => {
      const link = document.getElementById('devThoughtsLink');
      if (link) {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          this.router.navigateByUrl('/dev-thoughts');
        });
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.stayTimer) {
      clearTimeout(this.stayTimer);
    }
    // Reset overflow when component is destroyed
    document.body.style.overflow = 'auto';
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
    { category: 'Backend ', skills: ['Java', 'Python', 'C++'] },
    { category: 'Frontend', skills: ['JavaScript', 'TypeScript'] },
    { category: 'Databases', skills: ['MongoDB', 'MySQL', 'PostGreSQL'] },
    { category: 'OS', skills: ['Linux', 'Win11', 'MacOS'] },
    { category: 'Frameworks', skills: ['Angular', 'SpringBoot'] },
    { category: 'UI', skills: ['Angular', 'ReactJS'] },
    { category: 'Cloud ', skills: ['AWS', 'GCP'] },
    { category: 'AI/ML', skills: ['TensorFlow', 'PyTorch', 'Pandas'] },
    { category: 'Data Science', skills: ['NumPy', 'MatPlotLib', 'LangChain'] },
    { category: 'Gen-AI', skills: ['RAG Pipelines', 'ChatGPT API'] },
  ];

  workExperiences: WorkExperience[] = [
    {
      role: 'Software Engineering Intern',
      company: 'Persistent Systems',
      duration: 'Jun 2023 – Aug 2023',
      details: [
        'Developed a FastAPI-based Employee Management System on Linux with MySQL backend.',
        'Worked hands-on with Python, Linux, and core database concepts, applying DSA principles to optimize operations.',
        'Gained experience in designing RESTful APIs, writing modular code, and implementing basic security and data validation.',
        'Collaborated in a remote team environment, practicing version control, testing, and code review workflows.'
      ]
    },
    {
      role: 'Associate Software Engineer',
      company: 'Xoriant Technologies',
      duration: 'Apr 2024 – Present',
      details: [
        'Contributed to a global FX settlement platform for 18+ multinational banks, handling high-volume, multi-currency transactions.',
        'Automated setup, testing, and deployment pipelines on AWS (Lambda, S3, DynamoDB), reducing regression effort by ~65%.',
        'Built a static code-analysis tool for C++ components using RATS, Flawfinder, and Valgrind, identifying memory leaks and performance issues automatically.',
        'Led C++11 → C++23 modernization and refactored large components into Java microservices with Spring Boot for better maintainability and performance.',
        'Implemented automated test-case generation scripts covering extensive permutations, ensuring high BRD coverage for unit testing.',
        'Developed POCs for C++ → Java conversions and deployed critical components in AWS, including InputQueue Drainer and PD Setter, improving reliability and audit compliance.',
        'Integrated Message Gateway components with UGA and Audit DB, streamlining operations and reducing manual intervention.',
        'Created a custom CI/CD monitoring dashboard using Angular and Spring Boot, enabling faster release visibility and proactive issue detection.',
        'Provided L3 production support, troubleshooting system-level issues, and ensuring uninterrupted service for mission-critical applications.',
        'Regularly leveraged Python and shell scripting to automate repetitive tasks, enhance monitoring, and improve deployment processes.'
      ]
    }
  ];

  certifications: Certification[] = [
    {
      title: 'Oracle Certified Java SE 8 Developer Associate (1Z0-808)',
      description: 'Java SE 8 certification focusing on core Java programming, object-oriented design, and basic API usage. Achieved 93% completion.',
      image: 'images/project3.jpg',
      link: 'https://education.oracle.com/java-se-8-developer/overview/pls/psp/portal'
    },
    {
      title: 'Oracle Cloud & AI Platforms Associate Engineer',
      description: 'Covers cloud architecture, AI services, and platform-specific tools on Oracle Cloud. Completion 95%.',
      image: 'assets/certs/oracle-cloud.png',
      link: 'https://education.oracle.com/oracle-cloud-ai-associate/overview/pls/psp/portal'
    },
    {
      title: 'DeepLearning.AI: GenAI, LangChain, Prompt Engineering, ChatGPT API Apps',
      description: 'Focused on Generative AI applications, building LLM pipelines, and prompt engineering for real-world AI tools.',
      image: 'assets/certs/deeplearning-ai.png',
      link: 'https://www.deeplearning.ai/certifications/'
    },
    {
      title: 'AWS Certified Developer Associate (DVA-C02)',
      description: 'Certification on AWS core services, application deployment, and development best practices. Currently in progress.',
      image: 'assets/certs/aws-dev-assoc.png'
    },
  ];

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'Prateesh_Sulikeri_Resume.pdf';
    link.download = 'Prateesh-Sulikeri_Resume.pdf';
    link.click();
  }

  expandedWork: WorkExperience | null = null;
  expandedCert: Certification | null = null;
  
  // Modal state
  isModalOpen = false;
  modalImageSrc: string = '';
  modalImageAlt: string = '';

  toggleExpand(work: WorkExperience) {
    this.expandedWork = this.expandedWork === work ? null : work;
  }

  toggleCert(cert: Certification) {
    this.expandedCert = this.expandedCert === cert ? null : cert;
  }

  openModal(imageUrl: string, altText: string) {
    console.log("Opening modal with:", imageUrl, altText);
    this.modalImageSrc = imageUrl;
    this.modalImageAlt = altText;
    this.isModalOpen = true;
    console.log("Modal state:", this.isModalOpen);
    document.body.style.overflow = 'hidden';
    
    // Force modal to render at body level
    setTimeout(() => {
      const modal = document.querySelector('.modal');
      if (modal && modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }
      console.log("Modal element found:", modal);
    }, 0);
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalImageSrc = '';
    this.modalImageAlt = '';
    document.body.style.overflow = 'auto';
  }
}