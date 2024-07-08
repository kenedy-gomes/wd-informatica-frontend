import { Component, OnInit } from '@angular/core';
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
import { SharedService } from '../service/shared.service';
import { PerfilService } from '../service/perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardModule, ButtonModule, KeyFilterModule, FormsModule, InputTextModule, AvatarModule, AvatarGroupModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  roles?: string;
  userData?: string;


  constructor( private cookieService: CookieService, private sharedService: SharedService, private perfilService: PerfilService) {
    this.roles = this.cookieService.get('role');
    if (this.roles === 'USER' || this.roles === 'ADMIN') {
      this.userData = this.cookieService.get('name').toUpperCase();
    }
  }

  ngOnInit(): void {
    this.loadUserProfile(); 
  }

  loadUserProfile(){
    this.perfilService.getUserProfile().subscribe((response) => {
      console.log(response)
    })
  }  
}
