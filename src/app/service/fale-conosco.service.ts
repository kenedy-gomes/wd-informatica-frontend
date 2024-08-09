import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import {ContatoModel} from '../model/ContatoModel';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FaleConoscoService {
  private apiUrl = environment.apiMensagens;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  setHeadersForBearer() {
    return new HttpHeaders({
        'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
        'Content-Type': 'application/json'
    });
}

  enviarMensagem(body: ContatoModel): Observable<any> {
    const headers = this.setHeadersForBearer();
    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' });
  }
}
