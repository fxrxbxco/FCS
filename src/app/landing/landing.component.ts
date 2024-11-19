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
    const showNotification = (message: string, type: 'success' | 'error') => {
      console.log('Notification triggered:', message); // Debug log
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.style.position = 'fixed';
      notification.style.bottom = '20px';
      notification.style.right = '20px';
      notification.style.padding = '10px 20px';
      notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';
      notification.style.color = 'white';
      notification.style.borderRadius = '5px';
      notification.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
      notification.style.fontSize = '14px';
      notification.style.zIndex = '1000';
      document.body.appendChild(notification);
  
      setTimeout(() => {
        notification.remove();
      }, 5000);
    };
  
    if (!this.userName || !this.userEmail || !this.userPhone) {
      showNotification('Please fill out all required fields.', 'error');
      return;
    }
  
    const templateParams = {
      rob: this.userPhone,
      to_name: 'Client Name',
      from_name: this.userName,
      message: `Email: ${this.userEmail}\nPhone: ${this.userPhone}`,
      reply_to: this.userEmail,
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
          showNotification('Email sent successfully!', 'success');
          this.userName = '';
          this.userEmail = '';
          this.userPhone = '';
        },
        (error) => {
          showNotification('Failed to send email: ' + error.text, 'error');
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
