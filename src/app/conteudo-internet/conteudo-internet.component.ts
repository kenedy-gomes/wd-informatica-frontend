import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConteudoService } from '../service/conteudo.service';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PerfilService } from '../service/perfil.service';
import { Plan } from '../model/Plan';

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
  data!: Plan[];
  roles?: string;
  loading: boolean = false;
  

  showDialog(plano: Plan) {
    this.visible[plano.id] = true;
  }

  constructor(private conteudoService: ConteudoService, private router: Router, private cookieService: CookieService, 
    private confirmationService: ConfirmationService, private messageService: MessageService, private toastr: ToastrService, private perfilService: PerfilService
  ) { 
     this.roles = this.cookieService.get('role');
  }
 
 
ngOnInit(): void {
  this.getPlanosConteudo();
}

  getPlanosConteudo() {
    this.conteudoService.getConteudo().subscribe(
      (response: Plan[]) => {
        this.data = response;
        console.log('Planos', response);
      },
      error => {
        console.error('Erro ao buscar planos', error);
      }
    )
  }
 
  viewPlanDetails(id: string): void {
    if (id) {
      this.router.navigate(['/plan', id]);
    } else {
      console.error('ID do plano está indefinido');
    }
  }
}
