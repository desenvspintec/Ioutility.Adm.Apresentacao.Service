import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnSubformularioCvaComponent } from './cn-subformulario-cva.component';

describe('CnSubformularioCvaComponent', () => {
  let component: CnSubformularioCvaComponent;
  let fixture: ComponentFixture<CnSubformularioCvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnSubformularioCvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnSubformularioCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
