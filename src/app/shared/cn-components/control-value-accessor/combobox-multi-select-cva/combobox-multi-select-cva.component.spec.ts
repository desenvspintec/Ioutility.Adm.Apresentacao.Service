import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxMultiSelectCvaComponent } from './combobox-multi-select-cva.component';

describe('ComboboxMultiSelectCvaComponent', () => {
  let component: ComboboxMultiSelectCvaComponent;
  let fixture: ComponentFixture<ComboboxMultiSelectCvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboboxMultiSelectCvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxMultiSelectCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
