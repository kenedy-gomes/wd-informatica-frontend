import { Component, OnInit } from '@angular/core';
import { MensagensService } from '../service/mensagens.service';
import { Mensagens } from '../model/Mensagens';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensagens',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.css',
})
export class MensagensComponent implements OnInit {
  mensagens!: Mensagens[];
  totalRecords: number = 0;
  page: number = 0;
  size: number = 10;

  constructor( private mensagensService: MensagensService) { }

  ngOnInit(): void {
    this.getMensagens();
  }

  getMensagens(page: number = this.page, size: number = this.size) {
    this.mensagensService.getMensagens(page, size).subscribe(
      data => {
        this.mensagens = data.content;
        this.totalRecords = data.totalElements;
      },
      error => console.log(error)
    );
  }

  onPageChange(event: any) {
    this.page = event.first / event.rows;
    this.size = event.rows;
    this.getMensagens(this.page, this.size);
  }

}
