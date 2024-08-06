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
  private baseUrlSolicitar = environment.apiSolicitacoes;

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
    return this.http.put<UpdatePlanos>(this.baseUrl, plano, { headers }).subscribe(
     async (response) => {
        console.log(response);
        await this.toastr.success('Plano atualizado!');
      }, 
      (error) => {
        console.error('Error', error.error);
         this.toastr.error('Plano não atualizado!');
      }
    )
  }
  
  registerPlano(plano: UpdatePlanos): Observable<any> {
    const headers = this.setHeadersForBearer();
    return this.http.post(this.baseUrl, plano, { headers, responseType: 'text' });
  }

  requestPlan(request: any): Observable<any> {
    const headers = this.setHeadersForBearer();
    return this.http.post(`${this.baseUrlSolicitar}/request-plan`, request, { headers});
  }

  getRequestPlans(): Observable<any> {
    const headers = this.setHeadersForBearer();
    return this.http.get(`${this.baseUrlSolicitar}/plan-requests`, { headers});
  }
}
