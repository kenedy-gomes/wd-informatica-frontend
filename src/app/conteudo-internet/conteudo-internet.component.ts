import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConteudoService } from '../service/conteudo.service';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conteudo-internet',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './conteudo-internet.component.html',
  styleUrl: './conteudo-internet.component.css'
})
export class ConteudoInternetComponent implements OnInit {
  data: any[] = [];

  constructor(private conteudoService: ConteudoService, private router: Router) { }

  ngOnInit(): void {
      this.getPlanos();
  }
   
  getPlanos() {
    this.conteudoService.getConteudo().subscribe(
      response => {
        this.data = response;
        console.log('Planos', response);
      },
      error => {
        console.error('Erro ao buscar planos', error);
      }
    )
  }

  viewPlanDetails(id: string): void {
    this.router.navigate(['/plan', id]);
  }
}
