import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';  
import { FooterComponent } from '../footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient } from '@angular/common/http';
 
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
    DropdownModule,
  ],
  styleUrls: ['./register.component.css'],
  standalone: true
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false;

  private readonly apiUrl = 'https://viacep.com.br/ws';
  
  sexOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' }
  ];

  constructor(private authService: AuthService , private http: HttpClient) {}

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
      dataNascimento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}-?[0-9]{3}$')]),
      endereco: new FormControl(),
      complemento: new FormControl(),
      bairro: new FormControl(),
      cidade: new FormControl(),
      estado: new FormControl(),
      role: new FormControl('USER')
    });
  }

  consultarCep() {
    const cep = this.registerForm.get('cep')!.value.replace(/\D/g, '');
    if (cep && cep.length === 8) {
      this.http.get(`${this.apiUrl}/${cep}/json/`).subscribe((data: any) => {
        if (!data.erro) {
          this.registerForm.patchValue({
            endereco: data.logradouro,
            complemento: data.complemento,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          });
        } else {
          console.error('CEP não encontrado.');
        }
      }, (error) => {
        console.error('Erro ao consultar o CEP:', error);
      });
    } else {
      console.error('CEP inválido.');
    }
  }

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
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

  get dataNascimento() {
    return this.registerForm.get('dataNascimento')!;
  }

  get sexo() {
    return this.registerForm.get('sexo')!;
  }

  get cep() {
    return this.registerForm.get('cep')!;
  }

  get endereco() {
    return this.registerForm.get('endereco')!;
  }

  get complemento() {
    return this.registerForm.get('complemento')!;
  }

  get bairro() {
    return this.registerForm.get('bairro')!;
  }

  get cidade() {
    return this.registerForm.get('cidade')!;
  }

  get estado() {
    return this.registerForm.get('estado')!;
  }
}
