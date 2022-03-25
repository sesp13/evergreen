import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;
  private usersUrl = `${this.baseUrl}/users`;

  constructor(private http: HttpClient) {}

  getSenderUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}`);
  }

  getReceiverUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}`);
  }
}
