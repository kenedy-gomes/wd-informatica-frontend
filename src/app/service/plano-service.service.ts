import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ToastrService } from 'ngx-toastr';
import { SolicitacaoPlano } from '../model/SolicitacaoPlano';
import { Plan } from '../model/Plan';

@Injectable({
  providedIn: 'root',
})
export class PlanoServiceService {
  private baseUrl = environment.apiPlanos;
  private baseUrlSolicitar = environment.apiSolicitacoes;
  page: number = 0;
  size: number = 10;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {}

  setHeadersForBearer() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('authToken'),
      'Content-Type': 'application/json',
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

  async updatePlano(plano: Plan) {
    const headers = this.setHeadersForBearer();
    return this.http.put<Plan>(this.baseUrl, plano, { headers }).subscribe(
      async (response) => {
        console.log(response);
        await this.toastr.success('Plano atualizado!');
      },
      (error) => {
        console.error('Error', error.error);
        this.toastr.error('Plano não atualizado!');
      }
    );
  }

  getAllPlansForUser(userId: string): Observable<SolicitacaoPlano[]> {
    const headers = this.setHeadersForBearer();
    return this.http.get<SolicitacaoPlano[]>(
      `${this.baseUrl}/user-plan-requests/${userId}`,
      { headers, responseType: 'json' }
    );
  }

  registerPlano(plano: Plan): Observable<any> {
    const headers = this.setHeadersForBearer();
    return this.http.post(this.baseUrl, plano, {
      headers,
      responseType: 'text',
    });
  }

  requestPlan(request: any): Observable<any> {
    const headers = this.setHeadersForBearer();
    return this.http.post(`${this.baseUrlSolicitar}/request-plan`, request, {
      headers,
    });
  }

  rejectedPlan(id: String): Observable<any> {
    const headers = this.setHeadersForBearer();
    return this.http.post(
      `${this.baseUrlSolicitar}/reject-plan-request/${id}`,
      {},
      { headers }
    );
  }

  approvedPlan(id: String): Observable<any> {
    const headers = this.setHeadersForBearer();
    return this.http.post(
      `${this.baseUrlSolicitar}/approve-plan-request/${id}`,
      {},
      { headers }
    );
  }

  getRequestPlans(page: number, size: number): Observable<any> {
    const headers = this.setHeadersForBearer();
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    return this.http.get(
      `${this.baseUrlSolicitar}/plan-requests?page=${page}&size=${size}`,
      { headers, params }
    );
  }
}
