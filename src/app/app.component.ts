import { Component } from '@angular/core';
import { LandingComponent } from './landing/landing.component'; // Import the LandingComponent

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [LandingComponent]  // Import the LandingComponent
})
export class AppComponent {}
