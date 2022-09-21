import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteproComponent } from './testepro.component';

describe('TesteproComponent', () => {
  let component: TesteproComponent;
  let fixture: ComponentFixture<TesteproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteproComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
