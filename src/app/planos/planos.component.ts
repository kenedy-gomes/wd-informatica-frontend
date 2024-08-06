import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';


@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardModule, ButtonModule, KeyFilterModule, FormsModule, InputTextModule, SidebarModule],
  templateUrl: './planos.component.html',
  styleUrl: './planos.component.css'
})
export class PlanosComponent{
  sidebarVisible: boolean = false;
  constructor() { }
}
