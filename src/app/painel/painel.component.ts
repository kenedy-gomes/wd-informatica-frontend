import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { TableModule } from 'primeng/table';
import {CommonModule} from '@angular/common';
import {ListagemAdminComponent} from '../admin/listagem-admin/listagem-admin.component';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, TableModule, CommonModule, ListagemAdminComponent, RouterLink, RouterOutlet],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})

export class PainelComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
}
