import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LandingComponent implements AfterViewInit {
  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(private elementRef: ElementRef) {}

  showWelcomeMessage() {
    this.notificationMessage = 'Welcome to MMS.';
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 15000);
    this.userName = '';
  }

  smoothScroll(targetId: string) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start', // Scroll to the start of the section
      });
    }
  }

  sendEmail() {
    if (!this.userName || !this.userEmail || !this.userPhone) {
      alert('Please fill out all required fields.');
      return;
    }
  
    const templateParams = {
      rob: this.userPhone,       // Assuming "rob" corresponds to the user's phone
      to_name: 'Client Name',    // Replace with a specific recipient name or keep it static
      from_name: this.userName,  // The user's name
      message: `Email: ${this.userEmail}\nPhone: ${this.userPhone}`, // Custom message combining details
      reply_to: this.userEmail   // User's email address
    };
  
    emailjs
      .send(
        'service_lt0czlg', // Replace with your EmailJS Service ID
        'template_gnc1yt5', // Replace with your EmailJS Template ID
        templateParams,
        'nVPvpgqQFuRs32lW_' // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          alert('Email sent successfully!');
          this.userName = '';
          this.userEmail = '';
          this.userPhone = '';
        },
        (error) => {
          alert('Failed to send email: ' + error.text);
        }
      );
  }
  
  

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in view
    );

    const elementsToAnimate = this.elementRef.nativeElement.querySelectorAll(
      '.container, .text-content, #image, .header-image img'
    );

    elementsToAnimate.forEach((el: Element) => observer.observe(el));
  }
}
