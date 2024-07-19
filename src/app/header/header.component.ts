import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { SharedService } from '../service/shared.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Update } from '../model/UpdateModel';
import { PerfilService } from '../service/perfil.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ImageModule, AvatarModule, AvatarGroupModule, SidebarModule, ButtonModule, CommonModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  roles?: string;
  userData?: string;
  token?: string;
  userProfile?: Update;  
  items: MenuItem[] | undefined;

  menuActive: boolean = false;
  sidebarVisible: boolean = false;

  constructor(private authService: AuthService, private sharedService: SharedService, private cookieService: CookieService, private router: Router, private perfilService: PerfilService) {
    this.userData = this.cookieService.get('name');
    this.userData = this.extractFirstAndSecondName(this.userData);
    this.roles = this.cookieService.get('role');
    this.token = this.cookieService.get('authToken');
  }

  ngOnInit() {
   this.setMenuItems();
  }

  private setMenuItems() {
      if (this.roles === 'USER') {
        this.items = [
          {
            items: [
              {
                label: 'Perfil',
                command: () => this.goToProfile(),
                icon: 'pi pi-cog'
              },
              {
                label: 'Meu plano',
                command: () => this.goToPlanos(),
                icon: 'pi pi-th-large'
              },
              {
                label: 'Sair',
                command: () => this.logout(),
                icon: 'pi pi-sign-out'
              }
            ]
          }
        ];
      } else if (this.roles === 'ADMIN') {
        this.items = [
          {
            items: [
              {
                label: 'Perfil',
                command: () => this.goToProfile(),
                icon: 'pi pi-cog'
              },
              {
                label: 'Painel',
                command: () => this.goToPanel(),
                icon: 'pi pi-th-large'
              },
              {
                label: 'Sair',
                command: () => this.logout(),
                icon: 'pi pi-sign-out'
              }
            ]
          }
        ];
      }
    
  }

  private extractFirstAndSecondName(name: string): string {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0]} ${nameParts[1]}`.toUpperCase();
    }
    return name; 
  }

  logout() {
    this.authService.logout();
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
  }

  goToPanel() {
    this.router.navigate(['/admin/painel']);
  }

  goToPlanos() {
    this.router.navigate(['/planos']);
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
