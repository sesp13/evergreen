import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Intefaces
import { MessageTemplate } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl: string = environment.baseUrl;
  private messagesUrl = `${this.baseUrl}/messages`;

  constructor(private http: HttpClient) {}

  getMessages(): Observable<MessageTemplate[]> {
    return this.http.get<MessageTemplate[]>(`${this.messagesUrl}`);
  }

  getMessageById(id: string) {
    return this.http.get(`${this.messagesUrl}/${id}`);
  }

  saveMessage(message: MessageTemplate): Observable<MessageTemplate> {
    return this.http.post<MessageTemplate>(`${this.messagesUrl}`, message);
  }

  updateMessage(message: MessageTemplate): Observable<MessageTemplate> {
    return this.http.put<MessageTemplate>(
      `${this.messagesUrl}/${message?.id}`,
      message
    );
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.messagesUrl}/${id}`);
  }
}
