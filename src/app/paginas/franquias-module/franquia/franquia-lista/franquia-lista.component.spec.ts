import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranquiaListaComponent } from './franquia-lista.component';

describe('FranquiaListaComponent', () => {
  let component: FranquiaListaComponent;
  let fixture: ComponentFixture<FranquiaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FranquiaListaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranquiaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
