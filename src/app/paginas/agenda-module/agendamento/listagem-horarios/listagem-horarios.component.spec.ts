import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemHorariosComponent } from './listagem-horarios.component';

describe('ListagemHorariosComponent', () => {
  let component: ListagemHorariosComponent;
  let fixture: ComponentFixture<ListagemHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
