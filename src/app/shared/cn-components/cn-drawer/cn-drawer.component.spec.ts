import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnDrawerComponent } from './cn-drawer.component';

describe('CnDrawerComponent', () => {
  let component: CnDrawerComponent;
  let fixture: ComponentFixture<CnDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
