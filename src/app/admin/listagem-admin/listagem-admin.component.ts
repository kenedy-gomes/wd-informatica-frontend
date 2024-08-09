import { Component, OnInit } from '@angular/core';
import { UpdatePlanos } from '../../model/UpdatePlanos';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConteudoService } from '../../service/conteudo.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PlanoServiceService } from '../../service/plano-service.service';
import { Mensagens } from '../../model/Mensagens';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';


@Component({
  selector: 'app-listagem-admin',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmPopupModule, FormsModule, DialogModule, 
    PaginatorModule, ButtonModule, InputTextModule, InputTextareaModule, ReactiveFormsModule],
  templateUrl: './listagem-admin.component.html',
  styleUrl: './listagem-admin.component.css',
  providers: [ConfirmationService, MessageService]
})

export class ListagemAdminComponent implements OnInit {
  first: number = 0;
  rows: number = 10;

  visible: { [key: string]: boolean } = {};
  data!: UpdatePlanos[];
  mensagens!: Mensagens[];
  loading: boolean = false;
  visibleCreate: boolean = false;
  registerPlanosForm!: FormGroup;

  constructor(private conteudoService: ConteudoService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService, private toastr: ToastrService, private planoService: PlanoServiceService) { }

  ngOnInit(): void {
    this.createPlanosForm(); 
    this.conteudoService.getConteudo().subscribe(
      (response: UpdatePlanos[]) => {
        this.data = response;
      },
      error => {
        console.error('Erro ao buscar planos', error);
      }
    );
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
  
  showDialog(plano: UpdatePlanos) {
    this.visible[plano.id] = true;
  }

  showDialogCreate() {
    this.visibleCreate = true;
    this.registerPlanosForm.reset();
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
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }


  deletePlanos(id: String) {
    this.conteudoService.deletePlano(id).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        this.toastr.success('Plano excluido!');
        this.ngOnInit();
      },
      error => {
        this.toastr.error('Erro ao excluir plano');
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    );
  }

  update(plano: UpdatePlanos) {
    this.conteudoService.updatePlano(plano).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record updated', life: 3000 });
        this.toastr.success('Plano atualizado!');
      },
      error => {
        this.toastr.error('Erro ao atualizar plano');
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    );
  }

  private createPlanosForm() {
    this.registerPlanosForm = new FormGroup({
      megas: new FormControl('', [Validators.required, Validators.minLength(2)]),
      plano: new FormControl('', [Validators.required]),
      servicos: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  submit() {
    if (this.registerPlanosForm.invalid) {
      this.registerPlanosForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.planoService.registerPlano(this.registerPlanosForm.value).subscribe(
      (response) => {
        this.toastr.success(response);
        this.loading = false;
        this.visibleCreate = false;
        this.ngOnInit(); 
      },
      (error) => {
        this.toastr.error('Erro ao criar plano');
        this.loading = false;
      }
    );
  }

  get megas() {
    return this.registerPlanosForm.get('megas')!;
  }

  get plano() {
    return this.registerPlanosForm.get('plano')!;
  }

  get servicos() {
    return this.registerPlanosForm.get('servicos')!;
  }

  get description() {
    return this.registerPlanosForm.get('description')!;
  }

  getFormattedMegas(megas: string): string {
    return `${megas} megas`;
  }

  getFormattedPlano(plano: string): string {
    return `R$ ${plano}`;
  }
 
}
