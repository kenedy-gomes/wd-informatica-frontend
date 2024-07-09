import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Update } from '../model/UpdateModel';
import { ToastrService } from 'ngx-toastr'; 

@Injectable({
  providedIn: 'root'
})
export class PerfilService{
  private apiProfile = `${environment.apiProfile}` 
  private apiUpdate = `${environment.apiUpdate}`

  constructor(private http: HttpClient, private cookieService: CookieService, private toastr: ToastrService) { }

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

 async updateUserProfile(user: Update){
    const headers = this.setHeadersForBearer();
    return this.http.put<Update>(this.apiUpdate + user.id , user, { headers }).subscribe(
     async (response) => {
        console.log(response);
        await this.toastr.success('Dados atualizados!');
      }
    );
  }
}
