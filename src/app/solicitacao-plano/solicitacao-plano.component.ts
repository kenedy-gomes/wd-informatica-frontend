import { Component, OnInit } from '@angular/core';
import { PlanoServiceService } from '../service/plano-service.service';
import {SolicitacaoPlano} from '../model/SolicitacaoPlano';
import { TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {CommonModule} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TreeTableModule } from 'primeng/treetable';

@Component({
  selector: 'app-solicitacao-plano',
  standalone: true,
  imports: [TableModule, TreeTableModule, ButtonModule, DialogModule, CommonModule],
  templateUrl: './solicitacao-plano.component.html',
  styleUrl: './solicitacao-plano.component.css',
  providers: [PlanoServiceService],
})
export class SolicitacaoPlanoComponent implements OnInit {
  solicitacao: SolicitacaoPlano[] = [];
  selectedSolicitacao?: SolicitacaoPlano;
  loading: boolean = true;
  visible: boolean = false;
  totalRecords: number = 0;
  page: number = 0;
  size: number = 10;


  showDialog(solicitacao: SolicitacaoPlano) {
    this.selectedSolicitacao = solicitacao;
      this.visible = true;
  }

  constructor(private planoService: PlanoServiceService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadPlans();
  }

  loadPlans(page: number = this.page, size: number = this.size) {
    this.loading = true;
    this.planoService.getRequestPlans(page, size).subscribe(data => {
      this.solicitacao = data.content;
      this.totalRecords = data.totalElements;
      this.loading = false;
    });
  }


  onPageChange(event: any) {
    this.page = event.first / event.rows;
    this.size = event.rows;
    this.loadPlans(this.page, this.size);
  }
 

  aprovadoPlan(request: SolicitacaoPlano) {
    this.planoService.approvedPlan(request.id).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Plano aprovado!');
        this.visible = false;
        this.ngOnInit();
      },
      (error) => {
        console.error('Error', error.error);
        this.toastr.error('Plano não aprovado!');
        this.ngOnInit();
        this.visible = false;
      } 
    )
  }

  rejectedPlan(request: SolicitacaoPlano) {
    this.planoService.rejectedPlan(request.id).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Plano recusado!');
        this.visible = false;
        this.ngOnInit();
      },
      (error) => {
        console.error('Error', error.error);
        this.toastr.error('Plano não recusado!');
        this.visible = false;
        this.ngOnInit();
      }
    );
  }
}