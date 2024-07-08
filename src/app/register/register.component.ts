import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';  // Importando o CommonModule
import { FooterComponent } from '../footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    FooterComponent,
    ToastModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule
  ],
  styleUrls: ['./register.component.css'],
  standalone: true
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false;
  sexOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' }
  ];

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
      cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern('^\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}$')]),
      nascimento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      role: new FormControl('USER')
    });
  }

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formValues = { ...this.registerForm.value };
    formValues.nascimento = formatDate(this.nascimento.value, 'yyyy-MM-dd', 'en-US');
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

  get nascimento() {
    return this.registerForm.get('nascimento')!;
  }

  get sexo() {
    return this.registerForm.get('sexo')!;
  }
}
