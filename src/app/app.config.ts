import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component'; // Import your component

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule),
    provideRouter([
      { path: '', component: LandingComponent }, // Configure routing if necessary
      // other routes...
    ])
  ]
};
