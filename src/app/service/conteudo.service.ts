import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdatePlanos } from '../model/UpdatePlanos';

@Injectable({
  providedIn: 'root'
})
export class ConteudoService {
  data!: UpdatePlanos[];

  private GetPlanos = `${environment.apiPlanos}`
  constructor(private http: HttpClient) { }
 
  getConteudo() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<UpdatePlanos[]>(this.GetPlanos, { headers }); 
  }

}
