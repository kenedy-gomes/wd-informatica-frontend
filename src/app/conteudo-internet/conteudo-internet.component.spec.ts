import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoInternetComponent } from './conteudo-internet.component';

describe('ConteudoInternetComponent', () => {
  let component: ConteudoInternetComponent;
  let fixture: ComponentFixture<ConteudoInternetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteudoInternetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteudoInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
