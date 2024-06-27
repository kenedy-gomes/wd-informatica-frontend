import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import {FormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, PasswordModule, FormsModule, ButtonModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  value!: string;
}
