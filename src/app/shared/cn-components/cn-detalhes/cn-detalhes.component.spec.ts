import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnDetalhesComponent } from './cn-detalhes.component';

describe('CnDetalhesComponent', () => {
  let component: CnDetalhesComponent;
  let fixture: ComponentFixture<CnDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
