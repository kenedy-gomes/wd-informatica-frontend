import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { SharedService } from '../service/shared.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ImageModule, AvatarModule, AvatarGroupModule, SidebarModule, ButtonModule, CommonModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username?: string;
  userData?: string;
  items: MenuItem[] | undefined;

  menuActive: boolean = false;
  sidebarVisible: boolean = false;

  ngOnInit() {
    this.items = [
      {
          items: [
              {
                  label: 'Perfil',
                  command: () => this.goToProfile(),   
                  icon: 'pi pi-cog'
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

  constructor(private authService: AuthService, private sharedService: SharedService, private cookieService: CookieService, private router: Router) {
    this.userData = this.cookieService.get('name');
    this.userData = this.extractFirstAndSecondName(this.userData);
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

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
