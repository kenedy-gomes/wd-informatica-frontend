import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import {CommonModule} from '@angular/common';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ImageModule, AvatarModule, AvatarGroupModule, SidebarModule, ButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuActive: boolean = false;
  sidebarVisible: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

}
