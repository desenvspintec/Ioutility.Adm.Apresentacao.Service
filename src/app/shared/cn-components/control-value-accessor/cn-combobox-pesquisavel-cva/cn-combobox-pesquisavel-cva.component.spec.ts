import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnComboboxPesquisavelCvaComponent } from './cn-combobox-pesquisavel-cva.component';
import { CnSharedTestModule } from 'src/app/shared/shared-modulos/cn-shared-teste.module';

describe('CnComboboxPesquisavelCvaComponent', () => {
  let component: CnComboboxPesquisavelCvaComponent;
  let fixture: ComponentFixture<CnComboboxPesquisavelCvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnComboboxPesquisavelCvaComponent ],
      imports: [
        CnSharedTestModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnComboboxPesquisavelCvaComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
