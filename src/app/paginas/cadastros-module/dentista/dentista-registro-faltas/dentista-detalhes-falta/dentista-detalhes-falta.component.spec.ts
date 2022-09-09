import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistaDetalhesFaltaComponent } from './dentista-detalhes-falta.component';

describe('DentistaDetalhesFaltaComponent', () => {
  let component: DentistaDetalhesFaltaComponent;
  let fixture: ComponentFixture<DentistaDetalhesFaltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistaDetalhesFaltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistaDetalhesFaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
