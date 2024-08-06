import { Component, OnInit } from '@angular/core';
import { PlanoServiceService } from '../service/plano-service.service';
import {SolicitacaoPlano} from '../model/SolicitacaoPlano';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-solicitacao-plano',
  standalone: true,
  imports: [TableModule, TreeTableModule, ButtonModule, DialogModule],
  templateUrl: './solicitacao-plano.component.html',
  styleUrl: './solicitacao-plano.component.css',
  providers: [PlanoServiceService],
})
export class SolicitacaoPlanoComponent implements OnInit {
  
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  solicitacao!: SolicitacaoPlano[];

  constructor(private productService: PlanoServiceService) {}

  ngOnInit() {
      this.productService.getRequestPlans().subscribe((response) => {
        this.solicitacao = response;
        console.log(this.solicitacao);
      }) 
  }
}