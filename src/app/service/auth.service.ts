import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthModel } from '../model/AuthModel';
import { Register } from '../model/register';
import { Login} from '../model/login';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";
;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrlRegister = `${environment.apiRegister}`;
  private AuthUrlLogin = `${environment.apiLogin}`

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private toastr: ToastrService) {}

  setHeadersForBearer() {
    return new HttpHeaders({
        'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
        'Content-Type': 'application/json'
    });
}

 
 async login(loginModel: Login) {
    this.deleteCookies();
    const headers = this.setHeadersForBearer(); 
    this.http.post(this.AuthUrlLogin, loginModel, { headers }).subscribe(
      async (response) => {
        await this.setCookies(response);
        await this.toastr.success('Login realizado com sucesso!');
        const model = await Object.assign(new AuthModel(), response);
        await this.navigate(model.role);
        console.log(response)
      }, 
      (error) => {
        console.error('Error', error.error);
         this.toastr.error('Dados incorretos!');
      }  
    )
  }

  async register(registerModel: Register) {
    this.deleteCookies();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(registerModel);

    this.http.post(this.authUrlRegister, body, { headers }).subscribe(
      async (response) => {
        await this.setCookies(response);
        await this.toastr.success('Cadastrado com sucesso!');
        const model = await Object.assign(new AuthModel(), response);
        await this.navigate(model.role); 
      },
      (error) => {
        console.error('Error', error.error);
        this.toastr.error('Não foi possivel efetuar o cadastro!');
      }
    );
  }


  async navigate(role: any) {
    if (role === 'USER') {
        await this.router.navigateByUrl('/planos')
    } if (role === 'ADMIN') {
        await this.router.navigateByUrl('/admin/painel')
    }
}

  isLoggedIn(): boolean {
    const token = this.cookieService.get('authToken');
    return !!token && this.isTokenValid(token);
  }

  logout(): void {
    this.cookieService.delete('authToken');
    this.cookieService.delete('name');
    window.document.location.href = '/login';
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      return Date.now() < exp * 1000;
    } catch (e) {
      return false;
    }
  }

  async setCookies(response: any) {
    this.cookieService.deleteAll();
    const auth = Object.assign(new AuthModel(), response);
    this.cookieService.set('authToken', auth.token);
    this.cookieService.set('name', auth.name);
    this.cookieService.set('role', auth.role);
    this.cookieService.set('id', auth.id);
    return auth;
  }

  obterTokenUsuario() {
    var token = this.cookieService.get('authToken');
    if (token) {
      return token;
    }
    return null;
  }

  deleteCookies(): void {
    this.cookieService.delete('authToken');
    this.cookieService.delete('name');
    this.cookieService.delete('role');
    this.cookieService.delete('id');
  }
}
