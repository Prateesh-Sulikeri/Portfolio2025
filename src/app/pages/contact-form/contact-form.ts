import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { Notification } from '../../services/notification';

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
  isMobile = false; // ✅ for responsive prompt switching

  constructor(private notify: Notification) {}

  ngOnInit(): void {
    // Initial responsive detection
    this.isMobile = window.innerWidth <= 768;

    // Ensure viewport is reset properly when entering the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ✅ Dynamically handle viewport width changes
  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
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
      .then(() => {
        console.log('Main email sent!');

        // Send automated reply to user
        emailjs.send(serviceID, autoReplyTemplateID, this.formData, publicKey)
          .then(() => console.log('Auto-reply sent!'))
          .catch((err) => console.error('Auto-reply failed:', err));

        setTimeout(() => {
          this.loading = false;
          this.notify.success(
            "Hey! Thanks for reaching out!! Looking forward to connect with you!",
            7000
          );
          this.formData = { name: '', email: '', message: '' };
          contactForm.resetForm();
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          this.loading = false;
          this.notify.error(
            "Oops! Looks like something went wrong. Don’t worry — I’ll look into it. You can try sending your message again or contact me on my socials.",
            10000
          );
        }, 1000);
        console.error(error);
      });
  }
}
