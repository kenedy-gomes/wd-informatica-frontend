import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthModel } from './model/registerModel/AuthModel';
import { Register } from './model/registerModel/register';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiRegister}`;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      this.authUrl,
      { email, password },
      { headers: headers }
    );
  }

  async register(registerModel: Register) {
    this.deleteCookies();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(registerModel);

    this.http.post(this.authUrl, body, { headers }).subscribe(
      async (response) => {
        await this.setCookies(response);
        const model = await Object.assign(new AuthModel(), response);
        await this.navigate(model.role); 
      },
      (error) => {
        console.error('Error', error.error);
      }
    );
  }


  async navigate(role: any) {
    if (role === 'USER') {
        await this.router.navigateByUrl('/planos')
    } if (role === 'ADMIN') {
        await this.router.navigateByUrl('/admin/perfil')
    }
}

  isLoggedIn(): boolean {
    const token = this.cookieService.get('authToken');
    return !!token && this.isTokenValid(token);
  }

  logout(): void {
    this.cookieService.delete('authToken');
    this.cookieService.delete('name');
    this.cookieService.delete('role');
    window.location.reload();
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
  }
}
