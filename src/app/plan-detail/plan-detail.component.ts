import { Component, OnInit } from '@angular/core';
import { PlanoServiceService } from '../service/plano-service.service';
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from '@angular/common';   

@Component({
  selector: 'app-plan-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-detail.component.html',
  styleUrl: './plan-detail.component.css'
})
export class PlanDetailComponent implements OnInit {
  plan: any;
  constructor( private Planoservice: PlanoServiceService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.Planoservice.getPlanById(id).subscribe(data => {
        this.plan = data;
      });
    }
  }

}
