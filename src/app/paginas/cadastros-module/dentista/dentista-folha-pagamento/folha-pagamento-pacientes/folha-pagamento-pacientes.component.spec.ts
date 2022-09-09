import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolhaPagamentoPacientesComponent } from './folha-pagamento-pacientes.component';

describe('FolhaPagamentoPacientesComponent', () => {
  let component: FolhaPagamentoPacientesComponent;
  let fixture: ComponentFixture<FolhaPagamentoPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolhaPagamentoPacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolhaPagamentoPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
