import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getWelcomeMessage(): Observable<any> {
    return this.http.get('/api/welcomeMessage'); // This will hit the mock API
  }
}
