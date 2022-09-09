import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteAlterarStatusComponent } from './paciente-alterar-status.component';

describe('PacienteAlterarStatusComponent', () => {
  let component: PacienteAlterarStatusComponent;
  let fixture: ComponentFixture<PacienteAlterarStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteAlterarStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteAlterarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
