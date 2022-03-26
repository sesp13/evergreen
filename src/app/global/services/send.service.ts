import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../interfaces/message.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SendService {
  private baseUrl: string = environment.baseUrl;
  private messagesUrl: string = `${this.baseUrl}/messages`;

  constructor(private http: HttpClient, private userService: UserService) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl);
  }

  createMessage(newMsg: Message, type: string): Observable<Message> {
    return this.http.post<Message>(`${this.messagesUrl}/${type}`, newMsg);
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.messagesUrl}/${id}`);
  }

  sendMessage(id: string): Observable<Message> {
    return this.http.put<Message>(`${this.messagesUrl}/${id}`, {});
  }
}
