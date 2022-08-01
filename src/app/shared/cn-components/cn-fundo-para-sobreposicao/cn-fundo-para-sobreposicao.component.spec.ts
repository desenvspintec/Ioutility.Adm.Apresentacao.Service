import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFundoParaSobreposicaoComponent } from './cn-fundo-para-sobreposicao.component';

describe('CnFundoParaSobreposicaoComponent', () => {
  let component: CnFundoParaSobreposicaoComponent;
  let fixture: ComponentFixture<CnFundoParaSobreposicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnFundoParaSobreposicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFundoParaSobreposicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
