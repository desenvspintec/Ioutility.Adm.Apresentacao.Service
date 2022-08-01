import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnSubformulariosCvaComponent } from './cn-subformularios-cva.component';

describe('CnSubformulariosCvaComponent', () => {
  let component: CnSubformulariosCvaComponent;
  let fixture: ComponentFixture<CnSubformulariosCvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnSubformulariosCvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnSubformulariosCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
