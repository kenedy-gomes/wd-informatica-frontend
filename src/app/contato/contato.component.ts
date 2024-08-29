import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { FaleConoscoService } from '../service/fale-conosco.service';
import { ToastrService } from 'ngx-toastr';
import {FooterComponent} from '../footer/footer.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../header/header.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { FormsModule, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule, HeaderComponent, FooterComponent, InputTextModule, InputTextareaModule, ButtonModule, GoogleMapsModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit {
  enviado: boolean = false;
  display: any;
  mensagemForm!: FormGroup;
  loading: boolean = false;

  constructor(private faleConoscoService: FaleConoscoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createPlanosForm(); 
  }

  private createPlanosForm() {
    this.mensagemForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(5)]),
      assunto: new FormControl('', [Validators.required, Validators.minLength(5)]),
      mensagem: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  submit() {
    if (this.mensagemForm.invalid) {
      this.mensagemForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    this.faleConoscoService.enviarMensagem(this.mensagemForm.value).subscribe(
       Response => {
         this.toastr.success("Mensagem enviada com sucesso!");
         this.loading = false;
         this.ngOnInit();
       }, 
       error => {
         this.toastr.error("Erro ao enviar a mensagem!", error);
         this.loading = false;
       }
    );
  }



  center: google.maps.LatLngLiteral = {
    lat: -16.60718372285459,
    lng: -49.32577208868824    
  };
 
  zoom = 15;

  markerOptions: google.maps.MarkerOptions = {
    position: this.center,
    title: "WD Informática",
    draggable: false,

  };
  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  get nome() {
    return this.mensagemForm.get('nome')!;
  }

  get email() {
    return this.mensagemForm.get('email')!;
  }

  get telefone() {
    return this.mensagemForm.get('telefone')!;
  }

  get assunto() {
    return this.mensagemForm.get('assunto')!;
  }

  get mensagem() {
    return this.mensagemForm.get('description')!;
  }
  
}
