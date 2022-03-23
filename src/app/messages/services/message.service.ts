import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Intefaces
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl: string = environment.baseUrl;
  private messagesUrl = `${this.baseUrl}/messages`;

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.messagesUrl}`);
  }
}
