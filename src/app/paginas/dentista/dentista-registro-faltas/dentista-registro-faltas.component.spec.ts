import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistaRegistroFaltasComponent } from './dentista-registro-faltas.component';

describe('DentistaRegistroFaltasComponent', () => {
  let component: DentistaRegistroFaltasComponent;
  let fixture: ComponentFixture<DentistaRegistroFaltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistaRegistroFaltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistaRegistroFaltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
