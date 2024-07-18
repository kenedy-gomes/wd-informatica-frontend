import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConteudoService } from '../service/conteudo.service';
import { PlanoServiceService } from '../service/plano-service.service';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import { UpdatePlanos } from '../model/UpdatePlanos'; 
 


@Component({
  selector: 'app-conteudo-internet',
  standalone: true,
  imports: [ButtonModule, CommonModule, ConfirmPopupModule, DialogModule, InputTextModule, FormsModule],
  templateUrl: './conteudo-internet.component.html',
  styleUrl: './conteudo-internet.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ConteudoInternetComponent implements OnInit {
  visible: boolean = false;
  data!: UpdatePlanos[];
  roles?: string;
  

  showDialog() {
      this.visible = true;
  }

  constructor(private conteudoService: ConteudoService, private router: Router, private cookieService: CookieService, 
    private confirmationService: ConfirmationService, private messageService: MessageService, private planoServiceService: PlanoServiceService
  ) { 
    this.roles = this.cookieService.get('role');
  }
 
confirm2(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Deseja mesmo excluir esse plano?',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

  ngOnInit(): void {
      this.getPlanosConteudo();
  }

  getPlanosConteudo() {
    this.conteudoService.getConteudo().subscribe(
      (response: UpdatePlanos[]) => {
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
