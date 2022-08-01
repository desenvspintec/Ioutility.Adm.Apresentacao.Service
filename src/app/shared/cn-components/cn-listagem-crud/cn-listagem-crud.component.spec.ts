import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnListagemCrudComponent } from './cn-listagem-crud.component';

describe('CnListagemCrudComponent', () => {
  let component: CnListagemCrudComponent;
  let fixture: ComponentFixture<CnListagemCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnListagemCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnListagemCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
