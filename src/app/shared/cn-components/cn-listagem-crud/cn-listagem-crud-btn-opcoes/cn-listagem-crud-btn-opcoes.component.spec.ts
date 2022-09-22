import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnListagemCrudBtnOpcoesComponent } from './cn-listagem-crud-btn-opcoes.component';

describe('CnListagemCrudBtnOpcoesComponent', () => {
  let component: CnListagemCrudBtnOpcoesComponent;
  let fixture: ComponentFixture<CnListagemCrudBtnOpcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnListagemCrudBtnOpcoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnListagemCrudBtnOpcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
