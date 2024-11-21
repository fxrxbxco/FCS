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

    if (targetId === 'formContainermain') {
      // Scroll to the top of the page explicitly for "Home"
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else if (targetElement) {
      // Scroll to the specified element
      targetElement.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start', // Scroll to the start of the section
      });
    } else {
      console.error(`Element with ID '${targetId}' not found.`);
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
      notification.style.borderRadius = '7px';
      notification.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
      notification.style.fontSize = '18px';
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
        'service_ce0bn1i', // Replace with your EmailJS Service ID
        'template_c2dmyar', // Replace with your EmailJS Template ID
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

    // Initialize toggle button functionality
    this.initializeNavbarToggle();
  }

  private initializeNavbarToggle() {
    const navLinks = this.elementRef.nativeElement.querySelector('#navLinks');
    const navbar = this.elementRef.nativeElement.querySelector('#navbar');
    const toggleButton = document.createElement('button');
  
    // Configure the toggle button
    toggleButton.textContent = '☰';
    toggleButton.id = 'toggleButton'; // Add an id for easier targeting in CSS
    toggleButton.style.fontSize = '24px';
    toggleButton.style.background = 'none';
    toggleButton.style.border = 'none';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.color = '#5d0c1d';
    toggleButton.style.marginLeft = '20px';
    // toggleButton.style.padding ='20px';
  
    // Add toggle button to the navbar
    navbar.insertBefore(toggleButton, navLinks);
  
    // Add a class to ensure proper styling
    toggleButton.classList.add('dynamic-toggle'); // Optional: Adds extra class for debugging/styling
  
    // Add click event listener
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Dynamically show or hide the button based on screen size
  const updateButtonVisibility = () => {
    if (window.innerWidth <= 768) {
      toggleButton.style.display = 'inline-block'; // Show on mobile
    } else {
      toggleButton.style.display = 'none'; // Hide on desktop
    }
  };

  // Call the function once to set the initial state
  updateButtonVisibility();

  // Update visibility on window resize
  window.addEventListener('resize', updateButtonVisibility);
  }
  
}
