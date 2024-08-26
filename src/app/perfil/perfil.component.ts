
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CookieService } from 'ngx-cookie-service';
import { PerfilService } from '../service/perfil.service';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar'; 
import {Update} from '../model/UpdateModel'
import { DropdownModule } from 'primeng/dropdown';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CardModule,
    ButtonModule,
    KeyFilterModule,
    FormsModule,
    InputTextModule,
    AvatarModule,
    AvatarGroupModule,
    CommonModule,
    CalendarModule,
    DropdownModule,
    
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  roles?: string;
  userData?: string;
  userProfile?: Update;
  loading: boolean = false;
 
  sexOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' }
  ];
  constructor(
    private cookieService: CookieService,
    private perfilService: PerfilService, 
  ) {
  
    if (this.userProfile?.role === 'USER' || this.userProfile?.role === 'ADMIN') {
      this.userData = this.cookieService.get('name').toUpperCase();
    }
  }
  ngOnInit(): void {
    this.loadUserProfile();
  }
  updateUserProfile() {
    this.perfilService.updateUserProfile(this.userProfile!);
  }
  update() {
      this.updateUserProfile();
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
  }

  loadUserProfile() {
    this.perfilService.getUserProfile().subscribe(
      (response: Update) => {
        this.userProfile = response;
        console.log(this.userProfile);
        if (this.userProfile && this.userProfile.dataNascimento) {
          this.userProfile.dataNascimento = this.formatarData(
            this.userProfile.dataNascimento
          );
        }
      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );
  }
 
  formatarData(data: string): string {
    const dataNascimento = new Date(data);
    const ano = dataNascimento.getUTCFullYear();
    const mes = dataNascimento.getUTCMonth() + 1;
    const dia = dataNascimento.getUTCDate();

    return `${this.pad(dia)}/${this.pad(mes)}/${ano}`;
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}
