import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { PlanoServiceService } from '../service/plano-service.service';
import { SolicitacaoPlano } from '../model/SolicitacaoPlano';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardModule, ButtonModule, KeyFilterModule, FormsModule, InputTextModule, SidebarModule, CommonModule],
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {
  sidebarVisible: boolean = false;
  planRequests: SolicitacaoPlano[] = [];
  pendingRequests: SolicitacaoPlano[] = [];
  rejectedRequests: SolicitacaoPlano[] = [];
  approvedRequests: SolicitacaoPlano[] = [];
  userId: string;

  constructor(private planoservice: PlanoServiceService, private cookieService: CookieService) {
    this.userId = this.cookieService.get('id');
  }

  ngOnInit(): void {
    this.getUserPlanRequests();
  }

  getUserPlanRequests(): void {
    this.planoservice.getAllPlansForUser(this.userId).subscribe(
      (data: SolicitacaoPlano[]) => {
        this.planRequests = data;
        this.pendingRequests = this.planRequests.filter(request => request.status === 'PENDENTE');
        this.rejectedRequests = this.planRequests.filter(request => request.status === 'RECUSADO');
        this.approvedRequests = this.planRequests.filter(request => request.status === 'APROVADO');
        console.log(this.planRequests);
      },
      (error) => {
        console.error('Error fetching user plan requests', error);
      }
    );
  }
}
