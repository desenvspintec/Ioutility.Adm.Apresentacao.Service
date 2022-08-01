import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnUploadCvaComponent } from './cn-upload-cva.component';

describe('CnUploadCvaComponent', () => {
  let component: CnUploadCvaComponent;
  let fixture: ComponentFixture<CnUploadCvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnUploadCvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnUploadCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
