import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { TableModule } from 'primeng/table';
import {CommonModule} from '@angular/common';
import {ListagemAdminComponent} from '../admin/listagem-admin/listagem-admin.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MensagensService } from '../service/mensagens.service';
import {ConteudoService} from '../service/conteudo.service';
import { PlanoServiceService } from '../service/plano-service.service';


@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, TableModule, CommonModule, ListagemAdminComponent, RouterLink, RouterOutlet],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})

export class PainelComponent implements OnInit {
  mensagemCount: number = 0;
  listCount: number = 0;
  listSolicitacaoCount: number = 0;

  constructor( private mensagensService: MensagensService, private conteudoService: ConteudoService, private planoServiceService: PlanoServiceService) { }

  ngOnInit(): void {
    this.getMensagensCount();
    this.getListPlanosCount();
    this.getListSolicitacaoCount();
  }

  getMensagensCount() {
    this.mensagensService.getMensagens().subscribe(
      (response: any[]) => {
        this.mensagemCount = response.length;
      },
      error => {
        console.error('Erro ao buscar planos', error);
      }
    );
  }

  getListPlanosCount() {
    this.conteudoService.getConteudo().subscribe(
      (response: any[]) => {
        this.listCount = response.length;
      },
      error => {
        console.error('Erro ao buscar planos', error);
      }
    )
  }

  getListSolicitacaoCount() {
    this.planoServiceService.getRequestPlans(0, 1).subscribe(
      (response: any) => {
        this.listSolicitacaoCount = response.totalElements;
      },
      error => {
        console.error('Erro ao buscar a contagem de solicitações', error);
      }
    );
  }

}
