import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdatePlanos } from '../model/UpdatePlanos';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {
  data!: UpdatePlanos[];


  private BaseUrl = `${environment.apiPlanos}`
  constructor(private http: HttpClient, private cookieService: CookieService, private toastr: ToastrService) { }

  setHeadersForBearer() {
    return new HttpHeaders({
        'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
        'Content-Type': 'application/json'
    });
}
 
  getConteudo(): Observable<UpdatePlanos[]> {
    const headers = this.setHeadersForBearer();
    return this.http.get<UpdatePlanos[]>(this.BaseUrl, { headers }); 
  }

  updatePlano(plano: UpdatePlanos): Observable<UpdatePlanos>{
    const headers = this.setHeadersForBearer();
    return this.http.put<UpdatePlanos>(`${this.BaseUrl}/${plano.id}` , plano, { headers }); 
  }

  deletePlano(id: String): Observable<void>{ 
    const headers = this.setHeadersForBearer();
    return this.http.delete<void>(`${this.BaseUrl}/${id}`, { headers });
  }

}
