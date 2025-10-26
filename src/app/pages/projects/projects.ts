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
      title: 'Clone Catch',
      description: 'ML-powered tool for automatic person, place, and object detection, sorting, and removing blurry/duplicate images.',
      live: '#',      // Replace with actual live demo URL if available
      github: '#'     // Replace with actual GitHub repo URL
    },
    {
      image: 'images/project2.jpg',
      title: 'JinBo',
      description: 'Personal portfolio chat bot for interactive communication and dynamic content display.',
      live: '#',
      github: '#'
    },
    {
      image: 'images/project3.jpg',
      title: 'FinBo',
      description: 'AI-based financial advisor bot for expenditure analysis, investment portfolio guidance, spend control, and general finance advice.',
      live: '#',
      github: '#'
    },
  ];



  openLink(url: string) {
    window.open(url, '_blank');
  }

  constructor(private router: Router) { }

  viewMore() {
    this.router.navigateByUrl('/all-projects');
  }
}
