import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';  // Import the mock API service

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    // Use the mock backend API
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 })
  ],
  declarations: [/* your components here */],
  bootstrap: [/* your main component here */]
})
export class AppModule {}
