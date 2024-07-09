import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class PlanoServiceService {

  private baseUrl = environment.apiPlanos;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  setHeadersForBearer() {
    return new HttpHeaders({
        'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
        'Content-Type': 'application/json'
    });
}

  getPlans(): Observable<any[]> {
    const headers = this.setHeadersForBearer();
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getPlanById(id: String): Observable<any> {
    const headers = this.setHeadersForBearer();
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }
}
