import { CnHelperTest } from './../../../cn-helpers/cn-helper-test';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCnFormularioBaseComponent } from './test-cn-formulario-base.component';
import { CnSharedTestModule } from 'src/app/shared/shared-modulos/cn-shared-teste.module';

describe('TestCnFormularioBaseComponent', () => {
  let component: TestCnFormularioBaseComponent;
  let fixture: ComponentFixture<TestCnFormularioBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCnFormularioBaseComponent ], imports: [CnSharedTestModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCnFormularioBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deverá inicializar', () => {
    expect(component).toBeTruthy();
  });

  it('deverá conter os formControls nome e email', () => {
    const controlNome = component.form.get(component.controls.nome.name);
    const controlEmail = component.form.get(component.controls.email.name);
    expect(controlNome).not.toBeNull();
    expect(controlEmail).not.toBeNull();
  });

  it('deverá conter erros de validação para nome e email', () => {
    const controlNome = component.form.get(component.controls.nome.name);
    const controlEmail = component.form.get(component.controls.email.name);

    CnHelperTest.setarElementoPorCss(fixture, component.controls.nome.obterNameComoCssId(), 'a') ;
    CnHelperTest.setarElementoPorCss(fixture, component.controls.email.obterNameComoCssId(), 'b') ;
    expect(controlNome).not.toBeNull();
    expect(controlEmail).not.toBeNull();
  });
});
