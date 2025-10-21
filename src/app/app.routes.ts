import { Routes } from '@angular/router';
import { ContactForm } from './pages/contact-form/contact-form';
import { Main } from './pages/main/main';
import { KnowMore } from './know-more/know-more';
import { AllProgjects } from './pages/all-progjects/all-progjects';

export const routes: Routes = [
  { path: '', component: Main }, 
  { path: 'contact-form', component: ContactForm } ,
  { path: 'know-more', component: KnowMore } ,
  { path: 'all-projects', component: AllProgjects } ,
  {path: '**', redirectTo: ''},
];
