import { Routes } from '@angular/router';
import { ContactForm } from './pages/contact-form/contact-form';
import { Main } from './pages/main/main';
import { KnowMore } from './know-more/know-more';

export const routes: Routes = [
  { path: '', component: Main }, 
  { path: 'contact-form', component: ContactForm } ,
  { path: 'know-more', component: KnowMore } ,
  {path: '**', redirectTo: ''},
];
