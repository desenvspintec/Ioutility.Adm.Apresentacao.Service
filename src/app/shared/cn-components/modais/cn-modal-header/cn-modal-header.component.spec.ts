import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnModalHeaderComponent } from './cn-modal-header.component';

describe('CnModalHeaderComponent', () => {
  let component: CnModalHeaderComponent;
  let fixture: ComponentFixture<CnModalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnModalHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
