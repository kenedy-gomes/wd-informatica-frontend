import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {
  data: any;
   private GetPlanos = `${environment.apiPlanos}`
  constructor(private http: HttpClient, ) { }

  getConteudo() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.GetPlanos, { headers }); 
  }

}
