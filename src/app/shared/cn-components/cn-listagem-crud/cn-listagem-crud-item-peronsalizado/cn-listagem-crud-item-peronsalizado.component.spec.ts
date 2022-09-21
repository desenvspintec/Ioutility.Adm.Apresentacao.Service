import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnListagemCrudItemPeronsalizadoComponent } from './cn-listagem-crud-item-peronsalizado.component';

describe('CnListagemCrudItemPeronsalizadoComponent', () => {
  let component: CnListagemCrudItemPeronsalizadoComponent;
  let fixture: ComponentFixture<CnListagemCrudItemPeronsalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnListagemCrudItemPeronsalizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnListagemCrudItemPeronsalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
