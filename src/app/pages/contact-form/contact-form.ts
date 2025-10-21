import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm implements OnInit {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  loading = false;

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  sendEmail(contactForm: any) {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      alert('Please fill in all the fields before submitting!');
      return;
    }

    this.loading = true;

    const serviceID = 'service_0kdsbac';
    const templateID = 'template_9jf82n2'; // your main email to yourself
    const autoReplyTemplateID = 'template_82jbmlr'; // new template for user

    const publicKey = 'cQu-WN7uKd020aD0e';

    // Send email to yourself
    emailjs.send(serviceID, templateID, this.formData, publicKey)
      .then((response) => {
        console.log('Main email sent!');

        // Send automated reply to user
        emailjs.send(serviceID, autoReplyTemplateID, this.formData, publicKey)
          .then((resp) => console.log('Auto-reply sent!'))
          .catch((err) => console.error('Auto-reply failed:', err));

        setTimeout(() => {
          this.loading = false;
          alert('Thanks for reaching out! Your message has been sent.');
          this.formData = { name: '', email: '', message: '' };
          contactForm.resetForm();
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          this.loading = false;
          alert('Oops! Something went wrong. Please try again.');
        }, 1000);
        console.error(error);
      });
  }
}
