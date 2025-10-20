import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Contact } from './pages/contact/contact';
import { ContactForm } from './pages/contact-form/contact-form';
import { Main } from './pages/main/main';

export const routes: Routes = [
  { path: '', component: Main }, 
  { path: 'contact-form', component: ContactForm } ,
  {path: '**', redirectTo: ''},
];
