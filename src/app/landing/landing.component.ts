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
  notificationMessage: string = '';  // Generic notification message

  showWelcomeMessage() {
    if (!this.userName.trim()) {  // Check if the userName is empty
      this.notificationMessage = 'Please enter your name!';
      this.showNotification = true;

      // Hide notification after 5 seconds
      setTimeout(() => {
        this.showNotification = false;
      }, 5000);
      
      return;
    }

    this.notificationMessage = `Welcome to MMS, ${this.userName}!`;  // Set the welcome message
    this.showNotification = false;

    // Trigger reflow and then show notification again
    setTimeout(() => {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 30000); // Hide notification after 30 seconds
    }, 10); // Small delay to allow DOM to update
  }
}
