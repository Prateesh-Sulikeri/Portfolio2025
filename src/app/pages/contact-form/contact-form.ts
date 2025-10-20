import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm implements OnInit{
  formData = {
    name: '',
    email: '',
    message: ''
  };

  ngOnInit(): void {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  sendEmail() {
  const serviceID = 'service_0kdsbac';
  const templateID = 'template_9jf82n2';
  const publicKey = 'cQu-WN7uKd020aD0e';

    emailjs.send(serviceID, templateID, this.formData, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Thanks for reaching out! Your message has been sent.');
        this.formData = { name: '', email: '', message: '' }; // reset form
      }, (error) => {
        console.error('FAILED...', error);
        alert('Oops! Something went wrong. Please try again.');
      });
  }

  onSubmit(){}
}
