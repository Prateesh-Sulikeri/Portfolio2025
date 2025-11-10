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
      category: 'Backend',
      skills: ['Java (Spring Boot)', 'C++', 'Python', 'REST APIs', 'Microservices']
    },
    {
      category: 'Cloud & DevOps',
      skills: ['AWS', 'GCP', 'Docker', 'CI/CD', 'Linux']
    },
    {
      category: 'Frontend',
      skills: ['Angular', 'TypeScript', 'JavaScript']
    },
    {
      category: 'AI / ML (Exploratory)',
      skills: ['LangChain', 'TensorFlow', 'Hugging Face', 'RAG Pipelines']
    },
    {
      category: 'Scripting languges',
      skills: ['Python scripts', 'Shell scripts', 'JS Scripts']
    },
    {
      category: 'Databases',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB']
    }
  ];


  workExperiences: WorkExperience[] = [
    {
      role: 'Software Engineering Intern',
      company: 'Persistent Systems',
      duration: 'Jun 2023 – Aug 2023',
      details: [
        'Part of Martian internship program',
        'Built a FastAPI-based Employee Management System on Linux with a MySQL backend.',
        'Implemented RESTful endpoints and data validation while applying DSA principles for optimized operations.',
        'Gained hands-on experience with version control, testing, and collaborative development workflows.'
      ]
    },
    {
      role: 'Junior Backend Developer',
      company: 'Xoriant Technologies',
      duration: 'Apr 2024 – Present',
      details: [
        'Part of the engineering team responsible for developing and maintaining components powering a global foreign-exchange settlement platform used by 18+ multinational banks, processing multi-currency transactions worth billions daily.',
        'Devised an automated setup, testing, and deployment framework on AWS (Lambda, S3, DynamoDB), cutting regression effort by nearly 65%.',
        'Contributed to integrating SWIFT 2025 messaging standards in C++ components, adding secure message parsing and processing for SWIFT MFP and TDA channels.',
        'Engineered a static code-analysis pipeline using RATS, Flawfinder, and Python, reducing manual review time by 50% and embedding automated checks into release workflows.',
        'Collaborated on modernizing the C++11 → C++23 codebase and refactoring core modules into Java microservices (Spring Boot), improving maintainability and deployment reliability.',
        'Built an internal CI/CD monitoring dashboard (Angular 17 + Spring Boot 3) adopted by DevOps for release visibility and faster issue detection.',
        'Provided L3 production support for high-value, mission-critical settlement systems, ensuring seamless operations and zero downtime during releases.'
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
    {
      title: 'AWS Certified Developer Associate (DVA-C02)',
      description: 'Validates ability to build, deploy, and debug cloud-native applications on AWS using modern development practices. (In progress)',
      image: 'images/AWS.jpg'
    }
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