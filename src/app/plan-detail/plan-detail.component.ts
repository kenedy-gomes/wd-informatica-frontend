import { Component, OnInit } from '@angular/core';
import { PlanoServiceService } from '../service/plano-service.service';
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";   
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './plan-detail.component.html',
  styleUrl: './plan-detail.component.css'
})
export class PlanDetailComponent implements OnInit {
  plan: any;
  constructor( private planoservice: PlanoServiceService, private route: ActivatedRoute, private cookieService: CookieService, private toastr: ToastrService ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.planoservice.getPlanById(id).subscribe(data => {
        this.plan = data;
      });
    }
  }

  assinarPlano() {
    const userId = this.cookieService.get('id');
    if (!userId) {
      console.error('ID do usuário não encontrado no cookie');
      return;
    }
    const request = {
      userId: userId,
      planId: this.plan.id
    };
    this.planoservice.requestPlan(request).subscribe(response => {
      this.toastr.success('Plano solicitado com sucesso');
      window.location.href = '/solicitacao-planos';
    }, error => {
      console.error('Erro ao solicitar plano', error);
      this.toastr.error('Erro ao solicitar plano');
    });
  }
}
