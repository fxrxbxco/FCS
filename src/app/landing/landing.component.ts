import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LandingComponent {
  userName: string = '';
  showNotification: boolean = false;
  notificationMessage: string = '';

  showWelcomeMessage() {
    // Show welcome message
    this.notificationMessage = 'Welcome to MMS!';
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 15000); // Duration for "Welcome to MMS" notification

    // Clear the textbox after submission
    this.userName = '';
  }
}
