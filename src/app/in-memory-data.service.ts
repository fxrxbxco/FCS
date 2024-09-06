import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const welcomeMessage = { status: 200, message: 'Welcome to MMS.' };
    return { welcomeMessage };
  }
}
