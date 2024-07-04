import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardModule, ButtonModule, KeyFilterModule, FormsModule, InputTextModule, AvatarModule, AvatarGroupModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  roles?: string;
  userData?: string;

  constructor( private cookieService: CookieService) {
    this.roles = this.cookieService.get('role');
    if (this.roles === 'USER') {
      this.userData = this.cookieService.get('name').toUpperCase();
    }
  }



}
