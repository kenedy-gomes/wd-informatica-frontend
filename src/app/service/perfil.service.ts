import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService{

  private apiProfile = `${environment.apiProfile}` 

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  setHeadersForBearer() {
    return new HttpHeaders({
        'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
        'Content-Type': 'application/json'
    });
}

  getUserProfile(){
    const headers = this.setHeadersForBearer();
    return this.http.get<any>(this.apiProfile, { headers });
  }
}
