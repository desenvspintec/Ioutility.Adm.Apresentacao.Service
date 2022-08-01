import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnEnderecoCvaComponent } from './cn-endereco-cva.component';

describe('CnEnderecoCvaComponent', () => {
  let component: CnEnderecoCvaComponent;
  let fixture: ComponentFixture<CnEnderecoCvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnEnderecoCvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnEnderecoCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
