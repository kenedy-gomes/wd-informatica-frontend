import { Component } from '@angular/core';
import { UpdatePlanos } from '../../model/UpdatePlanos';
import { PlanoServiceService } from '../../service/plano-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listagem-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem-admin.component.html',
  styleUrl: './listagem-admin.component.css'
})
export class ListagemAdminComponent{

  planos!: UpdatePlanos;
  loading: boolean = false;

  constructor(private PlanosService: PlanoServiceService, private router: Router, ) {
   
  } 

  update() {
    this.updatePlanos();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
 
  updatePlanos() {
    this.PlanosService.updatePlano(this.planos);
  }

  loadPlanos()  {
    this.PlanosService.getPlans().subscribe(
      (response: UpdatePlanos) => {
        this.planos = response;
        console.log('Planos', response);
      },
      (error) => {
        console.error('Erro ao buscar planos', error);
      }
    )
  }

}
 
