import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import {HeaderComponent} from '../header/header.component';
import {TabMenuModule} from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import {ConteudoInternetComponent} from '../conteudo-internet/conteudo-internet.component';
 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, InputTextModule, HeaderComponent, TabMenuModule, ButtonModule, BadgeModule, CommonModule, ConteudoInternetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  selectedTab: string | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Internet', icon: 'pi pi-wifi' },
      { label: 'Internet + TV aberta', icon: 'pi pi-globe' },
    ];

    this.activeItem = this.items[0];
    this.selectedTab = this.activeItem.label;
  }

  onTabChange(event: any) {
    this.selectedTab = event.label;
  }
}
