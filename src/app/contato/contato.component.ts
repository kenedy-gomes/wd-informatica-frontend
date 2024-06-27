import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { FaleConoscoService } from '../service/fale-conosco.service';
import { FormsModule } from '@angular/forms';
 
import {FooterComponent} from '../footer/footer.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent, InputTextModule, InputTextareaModule, ButtonModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit {
  nome!: string;
  email!: string;
  assunto!: string;
  mensagem!: string;
  enviado: boolean = false;
  erro: string | null = null;

  constructor(private faleConoscoService: FaleConoscoService) { }

  ngOnInit(): void {
    console.log('API URL:', environment.apiUrl);
  }

  onSubmit() {
    this.faleConoscoService.enviarMensagem(this.nome, this.email, this.assunto, this.mensagem).subscribe(
      response => {
        console.log('Formulário enviado com sucesso', response);
        this.enviado = true;
        this.erro = null;
      },
      error => {
        console.error('Erro ao enviar o formulário', error);
        this.erro = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.';
        this.enviado = false;
      }
    );
  }

}
