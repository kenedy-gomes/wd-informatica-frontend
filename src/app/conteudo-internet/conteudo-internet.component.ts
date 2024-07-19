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
import { ToastrService } from 'ngx-toastr';
import { Update } from '../model/UpdateModel';
import { PerfilService } from '../service/perfil.service';

@Component({
  selector: 'app-conteudo-internet',
  standalone: true,
  imports: [ButtonModule, CommonModule, ConfirmPopupModule, DialogModule, InputTextModule, FormsModule],
  templateUrl: './conteudo-internet.component.html',
  styleUrl: './conteudo-internet.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ConteudoInternetComponent implements OnInit {
  visible: { [key: string]: boolean } = {};
  data!: UpdatePlanos[];
  roles?: string;
  loading: boolean = false;
  

  showDialog(plano: UpdatePlanos) {
    this.visible[plano.id] = true;
  }

  constructor(private conteudoService: ConteudoService, private router: Router, private cookieService: CookieService, 
    private confirmationService: ConfirmationService, private messageService: MessageService, private toastr: ToastrService, private perfilService: PerfilService
  ) { 
     this.roles = this.cookieService.get('role');
  }
 
confirm2(event: Event, id: String) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Deseja mesmo excluir esse plano?',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            this.deletePlanos(id);
            window.document.location.reload();
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

ngOnInit(): void {
  this.getPlanosConteudo();
}

  update(plano: UpdatePlanos) {
    this.conteudoService.updatePlano(plano).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        this.toastr.success('Plano atualizado!');
      }, 
      error => {
        this.toastr.error('Erro ao atualizar plano');
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    )
  }

  deletePlanos(id: String) {
    this.conteudoService.deletePlano(id).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        this.toastr.success('Plano excluido!');
      }, 
      error => {
        this.toastr.error('Erro ao excluir plano');
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    )
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
