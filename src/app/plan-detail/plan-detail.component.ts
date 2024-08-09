import { Component, OnInit } from '@angular/core';
import { PlanoServiceService } from '../service/plano-service.service';
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";   
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-plan-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ButtonModule],
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {
  loading: boolean = false;
  plan: any;

  constructor(
    private planoservice: PlanoServiceService, 
    private route: ActivatedRoute, 
    private cookieService: CookieService, 
    private toastr: ToastrService 
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const userId = this.cookieService.get('id');
    if (id && userId) {
      this.planoservice.getPlanById(id).subscribe(data => {
        this.plan = data;
      });
    }
  }

  assinarPlano() {
    this.loading = true;
    const userId = this.cookieService.get('id');
    if (!userId) {
      this.loading = false;
      return;
    }
    const request = {
      userId: userId,
      planId: this.plan.id
    };
    this.planoservice.requestPlan(request).subscribe(response => {
      console.log('Response', response);
      this.loading = false;
      this.toastr.success('Plano solicitado com sucesso');
      window.location.href = '/solicitacao-planos';
    }, error => {
      console.error('Erro ao solicitar plano', error);
      this.toastr.error('Erro ao solicitar plano');
      this.loading = false;
    });
  }
}
