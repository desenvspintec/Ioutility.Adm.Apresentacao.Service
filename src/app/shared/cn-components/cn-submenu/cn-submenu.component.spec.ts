import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnSubmenuComponent } from './cn-submenu.component';

describe('CnSubmenuComponent', () => {
  let component: CnSubmenuComponent;
  let fixture: ComponentFixture<CnSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnSubmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
