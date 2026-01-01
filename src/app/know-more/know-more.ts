import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Notification } from '../services/notification';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface SkillItem {
  name: string;
  icon: string;
}

interface SkillCategory {
  category: string;
  skills: SkillItem[];
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
  imports: [CommonModule, FormsModule],
  templateUrl: './know-more.html',
  styleUrl: './know-more.css'
})
export class KnowMore implements AfterViewInit, OnInit, OnDestroy {
  private stayTimer: any;

  constructor(private notify: Notification, private router: Router) { }

  notification_caller() {
    this.stayTimer = setTimeout(() => {
      this.showeasterEggNotification();
    }, 30000);
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
    {
      category: 'backend-languages',
      skills: [
        { name: 'Go (GoLang)', icon: 'devicon-go-original-wordmark' },
        { name: 'Java (Spring Boot)', icon: 'devicon-java-plain' },
        { name: 'C++', icon: 'devicon-cplusplus-plain' },
      ]
    },
    {
      category: 'cloud-&-devOps',
      skills: [
        { name: 'AWS', icon: 'devicon-amazonwebservices-plain' },
        { name: 'GCP', icon: 'devicon-googlecloud-plain' },
        { name: 'Docker', icon: 'devicon-docker-plain' },
        { name: 'CI/CD', icon: 'devicon-githubactions-plain' },
        { name: 'Linux', icon: 'devicon-linux-plain' }
      ]
    },
    {
      category: 'frontend',
      skills: [
        { name: 'Angular', icon: 'devicon-angular-plain' },
        { name: 'HTML', icon: 'devicon-html5-plain' },
        { name: 'CSS', icon: 'devicon-css3-plain' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain' },
        { name: 'TypeScript', icon: 'devicon-typescript-plain' }
      ]
    },
    {
      category: 'ai/ml (exploratory)',
      skills: [
        { name: 'LangChain', icon: 'fa-solid fa-link' },
        { name: 'Hugging Face', icon: 'fa-regular fa-face-smile-beam' },
        { name: 'RAG Pipelines', icon: 'fa-solid fa-network-wired' }
      ]
    },
    {
      category: 'scripting-languges',
      skills: [
        { name: 'Python scripts', icon: 'devicon-python-plain' },
        { name: 'Shell scripts', icon: 'devicon-bash-plain' }
      ]
    },
    {
      category: 'databases',
      skills: [
        { name: 'MySQL', icon: 'devicon-mysql-plain' },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
        { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
        { name: 'IBM DB2', icon: 'fa-solid fa-database' }
      ]
    }
  ];

  workExperiences: WorkExperience[] = [
    {
      role: 'Software Engineering Intern',
      company: 'Persistent Systems',
      duration: 'Jun 2023 – Aug 2023',
      details: [
        'Selected for the Martian internship program and trained on industry-grade SDLC practices.',
        'Built a FastAPI-based Employee Management System on Linux with a MySQL backend, covering routing, validation, and custom business logic.',
        'Implemented RESTful endpoints and input validation, applying algorithmic/data-structure fundamentals to optimize workflows.',
        'Gained exposure to version control (Git), unit testing, documentation, and collaborative agile development practices.'
      ]
    },
    {
      role: 'Junior Backend Developer',
      company: 'Xoriant Technologies',
      duration: 'Apr 2024 – Present',
      details: [
        'Contributing to a foreign exchange settlement system used by 18+ multinational banks, including federal and central banking institutions, to support multi-currency, risk-free settlements processing transactions worth billions.',

        'Delivered a currency-validation enhancement that required coordinated changes across business logic, cache handling, and database design. Drove clarifications with BAs, aligned the approach with onshore architects, implemented the feature, wrote tests, and supported it through release until stable.',

        'Implemented support for the SWIFT ISO 20022 fxtr.08 (ForeignExchangeTradeStatusNotification) message, enabling accurate tracking of trade status updates throughout the FX settlement lifecycle.',

        'Built a repeatable automation setup on AWS (Lambda, S3, DynamoDB) to streamline environment configuration, test preparation, and deployment checks — saving hours of manual setup during regression cycles.',

        'Wrote scripts to automatically annotate and map thousands of RTM test cases for inbound message flows. This reduced repetitive manual work and improved consistency of coverage for New Trade, Amend, and Cancel cases.',

        'Helped modernize the codebase from C++11 toward C++23, and contributed to early-stage conversion of selected components into Spring Boot microservices to improve maintainability and reduce deployment friction.',

        'Introduced gMock-based patterns for unit testing and implemented a DB access mock that removed database dependency for UTs. Added structure and guidelines for UT layout, Makefile execution, and reporting, and contributed 1200+ test cases across inbound and outbound components.',

        'Improved coverage and code quality by enhancing Gcovr reports, fixing bugs and critical issues raised in SonarQube, and integrating static analysis tools (RATS, Flawfinder, Valgrind) into the review pipeline.',

        'Developed an internal build and analysis dashboard (Angular + Spring Boot) to visualize CI/CD progress and failure patterns, reducing the need to dig through raw logs and helping DevOps teams identify issues faster.',

        'Supported L3 debugging during releases with a zero-downtime requirement. Investigated issues across components, validated fixes, and coordinated with multiple teams to ensure readiness before deployment.',

        'Recognized with the Xor-Champ Award (2025) for consistency, ownership of deliverables, and contributions that improved productivity, coverage, and platform stability.'
      ]
    }


  ];



  certifications: Certification[] = [
    {
      title: 'Oracle Certified Java SE 8 Developer Associate (1Z0-808)',
      description: 'Validated strong foundation in Java programming, OOP design, and core API usage for enterprise applications.',
      image: 'images/oracle_java_cert.jpg',
      link: 'https://education.oracle.com/java-se-8-developer/overview/pls/psp/portal'
    },
    {
      title: 'Oracle Cloud & AI Platforms Associate Engineer',
      description: 'Covers Oracle Cloud architecture, AI service integration, and platform automation fundamentals.',
      image: 'images/oracle_ai_cert.jpg',
      link: 'https://education.oracle.com/oracle-cloud-ai-associate/overview/pls/psp/portal'
    },
    {
      title: 'DeepLearning.AI — Generative AI, LangChain, Prompt Engineering, ChatGPT Apps',
      description: 'Hands-on specialization in LLM workflows, building RAG pipelines, and real-world generative AI integrations.',
      image: 'images/deeplearning_cert.png',
      link: 'https://www.deeplearning.ai/certifications/'
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