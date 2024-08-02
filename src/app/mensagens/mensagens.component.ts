import { Component, OnInit } from '@angular/core';
import { MensagensService } from '../service/mensagens.service';
import { Mensagens } from '../model/Mensagens';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensagens',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.css',
})
export class MensagensComponent implements OnInit {

  mensagens!: Mensagens[];

  constructor( private mensagensService: MensagensService) { }

  ngOnInit(): void {
    this.getMensagens();
  }

  getMensagens() {
    this.mensagensService.getMensagens().subscribe(
      (response: Mensagens[]) => {
        this.mensagens = response;
      },
      error => {
        console.error('Erro ao buscar planos', error);
      }
    );
  }

}
