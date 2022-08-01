import { CnHelperTest } from './../../../cn-helpers/cn-helper-test';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCnFormControlMensagemErroComponent } from './test-cn-form-control-mensagem-erro.component';
import { CnSharedTestModule } from 'src/app/shared/shared-modulos/cn-shared-teste.module';
import { CnInputCvaModel } from '../../control-value-accessor/models/cn-input-cva.model';
import { By } from '@angular/platform-browser';
import { CnMensagemErroHelper } from 'src/app/shared/cn-helpers/cn-mensagem-erro-helper';

describe('TestCnFormControlMensagemErroComponent', () => {
  let component: TestCnFormControlMensagemErroComponent;
  let fixture: ComponentFixture<TestCnFormControlMensagemErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCnFormControlMensagemErroComponent
       ]
       , imports: [
         CnSharedTestModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCnFormControlMensagemErroComponent);
    component = fixture.componentInstance;
  });

  it('1 - deverá inicializar', () => {
    component.campo = CnInputCvaModel.obterTextoSimples('teste', 'Teste label', true );
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('2 - deverá exibir que o campo é obrigatório', () => {
    component.campo = CnInputCvaModel.obterTextoSimples('teste', 'Teste label no component', true );
    fixture.detectChanges();

    CnHelperTest.setarElementoPorCss(fixture, 'input', 'teste');
    CnHelperTest.setarElementoPorCss(fixture, 'input', '');

    let erroElement = CnHelperTest.obterElementoHtml(fixture, '#mensagem-erro');

    expect(erroElement.innerHTML).toContain(new CnMensagemErroHelper().required());
  });

  it('3 - deverá exibir erro de minLength', () => {
    component.campo = CnInputCvaModel.obterTextoSimples('teste', 'Teste label no component', false );
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, 'input', 't');
    let erroElement = CnHelperTest.obterElementoHtml(fixture, '#mensagem-erro');

    expect(erroElement.innerHTML).toContain(new CnMensagemErroHelper().minLength(component!!.campo!!.minLength!!));
  });

  it('4 - deverá exibir erro de maxLength', () => {
    component.campo = CnInputCvaModel.obterTextoSimples('teste', 'Teste label no component', false, 3, 0 );
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, 'input', 'teste');
    let erroElement = CnHelperTest.obterElementoHtml(fixture, '#mensagem-erro');

    expect(erroElement.innerHTML).toContain(new CnMensagemErroHelper().maxLength(component!!.campo!!.maxLength!!));
  });

  it('5 - deverá exibir erro de e-mail invalido', () => {
    component.campo = CnInputCvaModel.obterEmail('teste', 'Teste label no component', false );
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, 'input', 'teste');
    let erroElement = CnHelperTest.obterElementoHtml(fixture, '#mensagem-erro');

    expect(erroElement.innerHTML).toContain(new CnMensagemErroHelper().email());
  });
});
