import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../footer/footer.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [InputTextModule, FloatLabelModule, PasswordModule, ReactiveFormsModule, ButtonModule, FooterComponent, ToastModule],
  styleUrls: ['./register.component.css'],
  standalone: true
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.deleteCookies();
    this.createForm();
  }

  private createForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      role: new FormControl('USER') 
    });
  }

  submit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    this.authService.register(this.registerForm.value);
  }

  get name() {
    return this.registerForm.get('name')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get cpf() {
    return this.registerForm.get('cpf')!;
  }
}
