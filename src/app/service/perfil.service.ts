import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService{

  private apiProfile = `${environment.apiProfile}` 

  constructor(private http: HttpClient) { }

  getUserProfile(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.apiProfile, { headers });
  }
}
