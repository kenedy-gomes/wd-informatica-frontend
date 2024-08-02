import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoPlanoComponent } from './solicitacao-plano.component';

describe('SolicitacaoPlanoComponent', () => {
  let component: SolicitacaoPlanoComponent;
  let fixture: ComponentFixture<SolicitacaoPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoPlanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
