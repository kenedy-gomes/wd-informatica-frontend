import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-agradecimento-solicitacao',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ButtonModule],
  templateUrl: './agradecimento-solicitacao.component.html',
  styleUrl: './agradecimento-solicitacao.component.css'
})
export class AgradecimentoSolicitacaoComponent {

  constructor(private router: Router) {}


  voltarInicio() {
    this.router.navigate(['/']);
  }

}
