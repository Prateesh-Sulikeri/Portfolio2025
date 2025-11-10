import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

interface Project {
  title: string;
  description: string;
  teamSize: string;
  roles: string;
  responsibilities: string;
  impact: string;
  status: string;
  live?: string;   // optional live link
  github?: string; // optional GitHub link
}

interface CompanyProjects {
  name: string;
  projects: Project[];
}

interface PersonalSection {
  section: string;
  projects: Project[];
}

@Component({
  selector: 'app-all-progjects',
  imports: [CommonModule],
  templateUrl: './all-progjects.html',
  styleUrls: ['./all-progjects.css']
})
export class AllProgjects implements AfterViewInit, OnInit {

  isMobile = false;

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
  }


  constructor(private el: ElementRef) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
    // Wait until header height is known
    setTimeout(() => {
      const header = document.querySelector('.app-header') as HTMLElement;
      const section = this.el.nativeElement.querySelector('.projects-page') as HTMLElement;

      if (header && section) {
        const headerHeight = header.offsetHeight;
        section.style.scrollMarginTop = `${headerHeight + 20}px`;
        section.style.paddingTop = `${headerHeight + 30}px`;
      }
    }, 100); // ensure layout settled
  }


  expandedProject: Project | null = null;

  // =================== PROFESSIONAL PROJECTS ===================
  professionalProjects: CompanyProjects[] = [
    {
      name: 'Persistent Systems',
      projects: [
        {
          title: 'Employee Management System',
          description:
            'FastAPI-based employee management solution designed for internal HR and operations under the Martian Internship Program.',
          teamSize: '3',
          roles: 'Backend Developer (Intern)',
          responsibilities:
            'Developed REST APIs in Python (FastAPI), integrated MySQL, and deployed on Linux. Focused on data validation, modular design, and optimized query performance using DSA principles.',
          impact:
            'Streamlined HR workflows, improved data consistency, and reduced query response times by optimizing backend logic.',
          status: 'Delivered',
          live: '',
          github: ''
        }
      ],
    },
    {
      name: 'Xoriant Technologies',
      projects: [
        {
          title: 'Global FX Settlement Platform — Core Components',
          description:
            'Enterprise-scale foreign exchange settlement platform used by 18+ multinational banks, processing multi-currency transactions worth billions daily.',
          teamSize: '8',
          roles: 'Junior Backend Developer',
          responsibilities:
            'Developed and maintained backend services in C++ and Java (Spring Boot), automated setup and regression pipelines on AWS (Lambda, S3, DynamoDB), and integrated SWIFT 2025 message formats (MFP/TDA).',
          impact:
            'Reduced regression effort by ~65%, improved reliability, and achieved full SWIFT compliance for critical message flows.',
          status: 'Production',
          live: '',
          github: ''
        },
        {
          title: 'C++ Modernization & Java Microservice Refactor',
          description:
            'Migration initiative to modernize legacy C++11 code to C++23 and modularize core settlement components into Java microservices.',
          teamSize: '4',
          roles: 'Software Engineer',
          responsibilities:
            'Refactored large C++ modules into Java (Spring Boot) services, implemented automated unit test generators, and improved cross-component reliability in AWS deployments.',
          impact:
            'Enhanced maintainability, boosted test coverage, and reduced build failures across multiple environments.',
          status: 'Delivered',
          live: '',
          github: ''
        },
        {
          title: 'Static Code Analysis Automation',
          description:
            'Automated pipeline for detecting memory leaks and performance issues in C++ components using open-source analysis tools.',
          teamSize: '2',
          roles: 'Backend Engineer',
          responsibilities:
            'Integrated RATS, Flawfinder, and Valgrind into CI/CD workflows; automated report generation and flagged code-level issues pre-merge.',
          impact:
            'Reduced manual code review time by 50% and improved release quality by enforcing static analysis in every build.',
          status: 'Delivered',
          live: '',
          github: ''
        },
        {
          title: 'CI/CD Monitoring Dashboard',
          description:
            'Angular + Spring Boot dashboard for real-time monitoring of build, test, and deployment pipelines across internal environments.',
          teamSize: '2',
          roles: 'Full Stack Developer',
          responsibilities:
            'Developed UI and backend services, implemented alerts and analytics for release visibility, and integrated it into DevOps tooling.',
          impact:
            'Enabled proactive issue detection and faster troubleshooting across teams.',
          status: 'Delivered',
          live: '',
          github: ''
        }
      ],
    },
  ];

  // =================== PERSONAL PROJECTS ===================
  personalProjects: PersonalSection[] = [
    {
      section: 'Personal Projects',
      projects: [
        {
          title: 'Clone Catch',
          description:
            'Backend-driven image management tool powered by AWS Lambda (VGG16) and S3 for duplicate and blurry image detection at scale.',
          teamSize: '1',
          roles: 'Backend Developer',
          responsibilities:
            'Implemented ML inference on AWS Lambda using VGG16, managed file pipelines via REST APIs, and stored processed data in S3. Built lightweight frontend for uploads and results visualization.',
          impact:
            'Automated the tedious process of image curation and cleanup for large datasets.',
          status: 'Active',
          live: '',
          github: 'https://github.com/Prateesh-Sulikeri/CloneCatch'
        },
        {
          title: 'Redditorials API',
          description:
            'FastAPI-based backend service for fetching and filtering Reddit stories for automated content generation workflows.',
          teamSize: '1',
          roles: 'Backend Developer',
          responsibilities:
            'Developed REST endpoints using FastAPI and Reddit API, implemented JSON-based query filters, and optimized caching for repeated queries.',
          impact:
            'Enabled automated content aggregation for YouTube storytelling and text-to-speech projects.',
          status: 'Delivered',
          live: '',
          github: 'https://github.com/Prateesh-Sulikeri/redditorials'
        },
        {
          title: 'JinBo — AI Portfolio Assistant',
          description:
            'AI assistant built with Express.js and Hugging Face APIs, integrated into my portfolio for conversational Q&A and interactive engagement.',
          teamSize: '1',
          roles: 'Full Stack Developer',
          responsibilities:
            'Built backend using Express.js and Hugging Face transformers, implemented fuzzy search and RAG for personalized responses, and connected to Angular frontend.',
          impact:
            'Improved user engagement and portfolio interactivity through natural conversation features.',
          status: 'Active',
          live: 'https://jinbo.onrender.com/',
          github: 'https://github.com/Prateesh-Sulikeri/JinBo'
        }
      ]
    }
  ];


  // =================== LOGIC ===================
  toggleExpand(project: Project): void {
    this.expandedProject =
      this.expandedProject === project ? null : project;
  }

  // ✅ Easily add new personal sections dynamically
  addPersonalSection(sectionName: string): void {
    this.personalProjects.push({ section: sectionName, projects: [] });
  }

  addPersonalProject(sectionName: string, newProject: Project): void {
    const section = this.personalProjects.find(
      (s) => s.section === sectionName
    );
    if (section) {
      section.projects.push(newProject);
    }
  }
}
