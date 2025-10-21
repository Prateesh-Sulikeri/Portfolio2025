import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

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
export class AllProgjects implements AfterViewInit{

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
  }

  expandedProject: Project | null = null;

  // =================== PROFESSIONAL PROJECTS ===================
  professionalProjects: CompanyProjects[] = [
    {
      name: 'Company-A',
      projects: [
        {
          title: 'Employee Management Portal',
          description:
            'A scalable internal tool for managing employees, attendance, and payroll workflows.',
          teamSize: '6',
          roles: 'Backend Developer',
          responsibilities:
            'Designed REST APIs, integrated AWS S3 for document storage, optimized query performance.',
          impact:
            'Reduced manual operations by 40% and improved internal workflow efficiency.',
          status: 'Deployed & Maintained',
          live: 'https://google.com', // optional
          github: 'https://github.com/company-a/emp-portal'
        },
        {
          title: 'Customer Data Platform',
          description:
            'A microservice-based system that unified customer profiles across multiple touchpoints.',
          teamSize: '8',
          roles: 'Java Developer',
          responsibilities:
            'Developed core services in Java Spring Boot, integrated Kafka pipelines, and led CI/CD automation.',
          impact:
            'Enhanced customer data accuracy by 25%, reducing data redundancy.',
          status: 'Production (active)',
          live: 'https://company-a.com/cdp',
          github: ''
        },
      ],
    },
    {
      name: 'Company-B',
      projects: [
        {
          title: 'Cloud Infrastructure Dashboard',
          description:
            'An observability dashboard to monitor AWS and GCP cloud services in real-time.',
          teamSize: '5',
          roles: 'Full Stack Engineer',
          responsibilities:
            'Developed backend metrics collector and frontend data visualizations using Angular.',
          impact:
            'Reduced downtime detection time by 60% and improved DevOps visibility.',
          status: 'Delivered',
          live: '',
          github: ''
        },
      ],
    },
  ];

  // =================== PERSONAL PROJECTS ===================
  personalProjects: PersonalSection[] = [
    {
      section: 'Open Source Contributions',
      projects: [
        {
          title: 'Portfolio 2025',
          description:
            'My personal website showcasing projects, design, and development work — built with Angular & custom CSS.',
          teamSize: '1',
          roles: 'Developer & Designer',
          responsibilities:
            'Designed UI/UX, implemented SPA routing, and optimized performance.',
          impact: 'Improved personal branding and outreach.',
          status: 'Active',
          live: 'https://portfolio2025.com',
          github: 'https://github.com/myusername/portfolio2025'
        },
      ],
    },
    {
      section: 'Experimental Projects',
      projects: [
        {
          title: 'AI-Powered Resume Analyzer',
          description:
            'A machine learning model that evaluates resumes and suggests improvements.',
          teamSize: '1',
          roles: 'ML Engineer',
          responsibilities:
            'Built NLP pipeline using Python, deployed via FastAPI and integrated into Angular UI.',
          impact:
            'Enhanced resume evaluation accuracy and saved HR review time.',
          status: 'In Progress',
          live: '',
          github: 'https://github.com/myusername/ai-resume-analyzer'
        },
      ],
    },
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
