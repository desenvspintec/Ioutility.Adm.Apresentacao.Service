import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnStepperFormComponent } from './cn-stepper-form.component';

describe('CnStepperFormComponent', () => {
  let component: CnStepperFormComponent;
  let fixture: ComponentFixture<CnStepperFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnStepperFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnStepperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
