
import {environment} from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Plan } from '../model/Plan';

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {
  data!: Plan[];


  private BaseUrl = `${environment.apiPlanos}`
  constructor(private http: HttpClient, private cookieService: CookieService, private toastr: ToastrService) { }

  setHeadersForBearer() {
    return new HttpHeaders({
        'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
        'Content-Type': 'application/json'
    });
}
 
  getConteudo(): Observable<Plan[]> {
    const headers = this.setHeadersForBearer();
    return this.http.get<Plan[]>(this.BaseUrl, { headers }); 
  }

  updatePlano(plano: Plan): Observable<Plan>{
    const headers = this.setHeadersForBearer();
    return this.http.put<Plan>(`${this.BaseUrl}/${plano.id}` , plano, { headers }); 
  }

  deletePlano(id: String): Observable<void>{ 
    const headers = this.setHeadersForBearer();
    return this.http.delete<void>(`${this.BaseUrl}/${id}`, { headers });
  }

}
