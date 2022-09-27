import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioLegendaComponent } from './calendario-legenda.component';

describe('CalendarioLegendaComponent', () => {
  let component: CalendarioLegendaComponent;
  let fixture: ComponentFixture<CalendarioLegendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioLegendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioLegendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
