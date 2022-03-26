import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Intefaces
import { MessageTemplate } from '../interfaces/messageTemplate.interface';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private baseUrl: string = environment.baseUrl;
  private messagesUrl = `${this.baseUrl}/templates`;

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<MessageTemplate[]> {
    return this.http.get<MessageTemplate[]>(`${this.messagesUrl}`);
  }

  getTemplateById(id: string) {
    return this.http.get(`${this.messagesUrl}/${id}`);
  }

  saveTemplate(message: MessageTemplate): Observable<MessageTemplate> {
    return this.http.post<MessageTemplate>(`${this.messagesUrl}`, message);
  }

  updateTemplate(message: MessageTemplate): Observable<MessageTemplate> {
    return this.http.put<MessageTemplate>(
      `${this.messagesUrl}/${message?._id}`,
      message
    );
  }

  deleteTemplate(id: string): Observable<any> {
    return this.http.delete(`${this.messagesUrl}/${id}`);
  }
}
