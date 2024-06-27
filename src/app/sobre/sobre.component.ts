import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
 

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {

}
