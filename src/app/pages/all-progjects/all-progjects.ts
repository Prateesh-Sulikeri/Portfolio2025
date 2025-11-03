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
export class AllProgjects implements AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
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
            'FAST API-based Employee Management System for internal HR and operations.',
          teamSize: '3',
          roles: 'Backend Developer',
          responsibilities:
            'Built REST APIs using Python, integrated MySQL, optimized data access using DSA principles, and deployed on Linux.',
          impact:
            'Streamlined HR workflows and improved data consistency and retrieval speed.',
          status: 'Internship Project',
          live: '',
          github: ''
        }
      ],
    },
    {
      name: 'Xoriant Technologies',
      projects: [
        {
          title: 'Inbound Message Gateway RTM Task',
          description:
            'Automated handling of inbound message gateway messages in a global FX settlement platform.',
          teamSize: '5',
          roles: 'Associate Software Engineer',
          responsibilities:
            'Handled message processing pipelines, integrated AWS services (Lambda, S3, DynamoDB), automated regression testing, and optimized C++ & Java microservices.',
          impact:
            'Reduced manual processing effort by 65%, improved reliability, and ensured high audit compliance.',
          status: 'Production',
          live: '',
          github: ''
        },
        {
          title: 'C++ v11 → v23 Upgrade & Java Microservices POCs',
          description:
            'Modernized legacy C++ components to C++23 and created new Java microservices for critical components.',
          teamSize: '4',
          roles: 'Software Engineer',
          responsibilities:
            'Refactored large components into smaller, testable Java microservices including InputQueue Drainer and PD Setter; implemented automatic test generation scripts.',
          impact:
            'Enhanced code maintainability, performance, and test coverage.',
          status: 'Delivered',
          live: '',
          github: ''
        },
        {
          title: 'Custom CI/CD Monitoring Dashboard',
          description:
            'Angular + Spring Boot dashboard to monitor build, test, and deployment pipelines.',
          teamSize: '2',
          roles: 'Full Stack Engineer',
          responsibilities:
            'Developed UI, backend services, and monitoring scripts; integrated alerts and visualizations.',
          impact:
            'Enabled proactive issue detection and faster release visibility for operations teams.',
          status: 'Delivered',
          live: '',
          github: ''
        },
        {
          title: 'Automatic Static Code Analysis Tool for C++',
          description:
            'Automated tool for detecting memory leaks and performance issues in C++ components.',
          teamSize: '2',
          roles: 'Software Engineer',
          responsibilities:
            'Integrated RATS, Flawfinder, and Valgrind to identify issues and generate reports.',
          impact:
            'Improved code quality and reduced manual debugging time.',
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
      section: 'Portfolio & Web Tools',
      projects: [
        {
          title: 'Clone Catch',
          description:
            'ML-powered tool for automatic person, place, and object detection, sorting, and removing blurry/duplicate images.',
          teamSize: '1',
          roles: 'Developer',
          responsibilities:
            'Implemented image processing pipeline using ML models, built UI for viewing results, and automated clone detection.',
          impact: 'Saved hours of manual image curation, improved dataset quality.',
          status: 'Active',
          live: '',
          github: ''
        },
        {
          title: 'JinBo',
          description:
            'Chat bot integrated into personal portfolio website for interactive communication.',
          teamSize: '1',
          roles: 'Developer',
          responsibilities:
            'Developed chatbot backend and frontend interactions, integrated Angular frontend.',
          impact: 'Enhanced interactivity of personal portfolio and user engagement.',
          status: 'Active',
          live: 'https://jinbo.onrender.com/',
          github: 'https://github.com/Prateesh-Sulikeri/JinBo/tree/main'
        },
        {
          title: 'FinBo',
          description:
            'AI-based financial advisor bot for expenditure analysis, investment portfolio guidance, spend control, and general finance advice.',
          teamSize: '1',
          roles: 'Developer',
          responsibilities:
            'Developed AI models to track expenses, analyze investments, and provide recommendations.',
          impact: 'Helped users make better financial decisions and manage spending efficiently.',
          status: 'Active',
          live: '',
          github: ''
        },
        {
          title: 'CalBo',
          description:
            'WhatsApp-based calorie tracker to monitor daily calorie intake.',
          teamSize: '1',
          roles: 'Developer',
          responsibilities:
            'Integrated Twilio API with backend logic for calorie tracking.',
          impact: 'Simplified health tracking via WhatsApp interface.',
          status: 'Active',
          live: '',
          github: ''
        }
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
