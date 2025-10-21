import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
};

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  projects = [
    {
      image: 'images/project1.jpg',
      title: 'Portfolio Website',
      description: 'A modern personal portfolio built with Angular and a custom dark theme.',
      live: '#',
      github: '#'
    },
    {
      image: 'images/project2.jpg',
      title: 'Task Manager API',
      description: 'Spring Boot REST API for managing tasks with JWT authentication.',
      live: '#',
      github: '#'
    },
    {
      image: 'images/project3.jpg',
      title: 'ML Model Dashboard',
      description: 'Data visualization dashboard for machine learning models.',
      live: '#',
      github: '#'
    }
  ];

  openLink(url: string) {
    window.open(url, '_blank');
  }

  constructor(private router: Router) {}

  viewMore() {
    this.router.navigateByUrl('/all-projects');
  }
}
