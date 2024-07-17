import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UpdatePlanos } from '../model/UpdatePlanos';
import { ToastrService } from 'ngx-toastr'; 

@Injectable({
  providedIn: 'root'
})
export class PlanoServiceService {

  private baseUrl = environment.apiPlanos;
  private baseUrlPlanos = environment.apiUpdatePlanos;

  constructor(private http: HttpClient, private cookieService: CookieService, private toastr: ToastrService) { }

  setHeadersForBearer() {
    return new HttpHeaders({
        'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
        'Content-Type': 'application/json'
    });
}

  getPlans() {
    const headers = this.setHeadersForBearer();
    return this.http.get<any>(this.baseUrl, { headers });
  }

  getPlanById(id: String): Observable<any> {
    const headers = this.setHeadersForBearer();
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

 async updatePlano(plano: UpdatePlanos){
    const headers = this.setHeadersForBearer();
    return this.http.put<UpdatePlanos>(this.baseUrlPlanos, plano, { headers }).subscribe(
     async (response) => {
        console.log(response);
        await this.toastr.success('Plano atualizado!');
      }
    )
  } 
}
