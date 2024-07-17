import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import {FormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import { AuthService } from '../service/auth.service';
import {Login} from '../model/login';
import { InputMaskModule } from 'primeng/inputmask';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, PasswordModule, FormsModule, ButtonModule, HeaderComponent, FooterComponent, ReactiveFormsModule, InputMaskModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
   loginForm!: FormGroup;
   loading: boolean = false;


  constructor(private authService: AuthService) {}
    
  ngOnInit() {
    this.authService.deleteCookies();
      this.loginForm = new FormGroup({
          'cpf': new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern('^\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}$')]),
          'password': new FormControl('', [Validators.required])
      });
  }
 
submit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }
  this.loading = true;

  setTimeout(() => {
      this.loading = false
  }, 2000);
  this.login();
}


get cpfControl() {
  return this.loginForm.get('cpf')!;
}

  get passwordControl() {
  return this.loginForm.get('password')!;
}

login() {
  if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
  }
  const login: Login = {
      cpf: this.cpfControl.value,
      password: this.passwordControl.value
  };
  this.authService.login(login);
}

}


