import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaleConoscoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  enviarMensagem(nome: string, email: string, assunto: string, mensagem: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nome, email, assunto, mensagem};
    
    return this.http.post<any>(this.apiUrl, body, { headers });
  }

}
