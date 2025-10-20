import { Component } from '@angular/core';
import { Home } from '../../home/home';
import { About } from '../about/about';
import { Projects } from '../projects/projects';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-main',
  imports: [Home, About, Projects, Contact],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
