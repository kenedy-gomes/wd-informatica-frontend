import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  private baseUrl = environment.apiMensagens;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  setHeadersForBearer() {
    return new HttpHeaders({
        'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
        'Content-Type': 'application/json'
    });
 }

  getMensagens(page: number, size: number) {
    const headers = this.setHeadersForBearer();
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    return this.http.get<any>(this.baseUrl, { headers, params });
  }
}
