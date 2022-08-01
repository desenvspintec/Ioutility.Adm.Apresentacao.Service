import { MatDialogRef } from '@angular/material/dialog';
import { TesteCrudService } from 'src/app/shared/services/teste-crud.service';
import { CSS_CLASS_BTN_SUBMIT } from './../../btns/cn-btn-submit/cn-btn-submit.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormComponent
       , CSS_ID_TITULO_FORM
       , CSS_CLASS_ERRO_VALIDACAO_SUBMIT
       , MENSAGEM_ERRO_AO_CARREGAR_ENTITY_EDICAO
       , CSS_CLASS_ERRO_AO_CARREGAR_ENTITY_EDICAO } from './cn-form.component';
import { CnFormBaseModel } from '../../model/cn-form-base-model';
import { CnFormHelper } from 'src/app/shared/cn-helpers/cn-form-helper';
import { CnSharedTestModule } from 'src/app/shared/shared-modulos/cn-shared-teste.module';
import { CSS_CLASS_MENSAGEM_ERRO_FORM } from '../../cn-form-control-mensagem-erro/cn-form-control-mensagem-erro.component';
import { CnHelperTest } from './../../../cn-helpers/cn-helper-test';
import { CnMensagemErroHelper } from './../../../cn-helpers/cn-mensagem-erro-helper';
import { MIN_LENGTH_PADRAO } from './../../../constants/string-length-padrao.constant';

describe('CnFormComponent', () => {
  let component: CnFormComponent;
  let fixture: ComponentFixture<CnFormComponent>;
  let modal: MatDialogRef<any, any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormComponent ]
      , imports: [CnSharedTestModule, CnSharedTestModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormComponent);
    modal = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
  });

  it('1 - deverá inicializar', () => {
    component.model = CnFormBaseModel.obterRegistrar('Teste'
                                                    , CnHelperTest.obterNovoTesteCrudService().registrar
                                                    , CnFormHelper.obterCamposIdENome());
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('2 - deverá exibir o titulo registrar', () => {
    component.model = CnFormBaseModel.obterRegistrar('Teste'
                                                    , CnHelperTest.obterNovoTesteCrudService().registrar
                                                    , CnFormHelper.obterCamposIdENome());
    fixture.detectChanges();
    const htmlElementTitulo = CnHelperTest.obterElementoHtml(fixture, '#' + CSS_ID_TITULO_FORM);
    expect(htmlElementTitulo.innerHTML).toContain('Registrar Teste');
  });
  it('3 - deverá exibir o titulo atualizar', () => {
    const service = CnHelperTest.obterNovoTesteCrudService();
    component.model = CnFormBaseModel.obterAtualizar('Teste'
                                                    , '1'
                                                    , service.buscarPorId
                                                    , service.atualizar
                                                    , CnFormHelper.obterCamposIdENome());
    fixture.detectChanges();
    const htmlElementTitulo = CnHelperTest.obterElementoHtml(fixture, '#' + CSS_ID_TITULO_FORM);
    expect(htmlElementTitulo.innerHTML).toContain('Atualizar Teste');
  });

  it('4 - deverá exibir erro de validação no control nome', () => {
    component.model = CnFormBaseModel.obterRegistrar('Teste'
                                                    , CnHelperTest.obterNovoTesteCrudService().registrar
                                                    , CnFormHelper.obterCamposIdENome());
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, '#nome', 'a');
    fixture.detectChanges();
    const htmlElement = CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_MENSAGEM_ERRO_FORM);
    expect(htmlElement.innerHTML).toContain(new CnMensagemErroHelper().minLength(MIN_LENGTH_PADRAO));
  });

  it('5 - deverá submeter com sucesso, exibir notificacao, fechar modal e marcar formulário em estado de submção ', (done) => {
    const service = CnHelperTest.obterNovoTesteCrudService();
    const nomeTeste = ' programador 1';
    component.model = CnFormBaseModel.obterRegistrar('Teste', service.registrar, CnFormHelper.obterCamposIdENome()).definirModal(modal);
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, '#nome', nomeTeste);
    CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_SUBMIT).click();
    spyOn(modal, 'close');
    spyOn(component.toastrService, 'success');
    expect(component.submetendo).toEqual(true);
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.submetendo).toEqual(false);
      expect(service.obterFakeDb().filter(entity => entity.nome === nomeTeste).length).toEqual(1);
      expect(component.toastrService.success).toHaveBeenCalled();
      expect(modal.close).toHaveBeenCalled();
      done();
    }, 11);
  });

  it('6 - deverá submeter clicando duas vezes, mas a execução ocorrera apenas uma vez', (done) => {
    const service = CnHelperTest.obterNovoTesteCrudService();
    const nomeTeste = ' programador 1';
    component.model = CnFormBaseModel.obterRegistrar('Teste', service.registrar, CnFormHelper.obterCamposIdENome());
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, '#nome', nomeTeste);
    CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_SUBMIT).click();
    CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_SUBMIT).click();
    expect(component.submetendo).toEqual(true);
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.submetendo).toEqual(false);
      expect(service.obterFakeDb().filter(entity => entity.nome === nomeTeste).length).toEqual(1);
      done();
    }, 11);
  });

  it('7 - deverá submeter e exibir erros de validação', (done) => {
    const service = CnHelperTest.obterNovoTesteCrudService();
    const nomeTeste = ' programador 1';
    component.model = CnFormBaseModel.obterRegistrar('Teste', service.registrarComErroTratado, CnFormHelper.obterCamposIdENome());
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, '#nome', nomeTeste);
    CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_SUBMIT).click();
    fixture.detectChanges();
    setTimeout(() => {
      const erroTratado = TesteCrudService.errorTratadoFake();
      const errosElement = CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_ERRO_VALIDACAO_SUBMIT);
      expect(errosElement.innerHTML).toContain(erroTratado.error.errors[0]);
      expect(component.submetendo).toEqual(false);
      done();
    }, 11);
  });

  it('8 - deverá submeter e exibir mensagem de erro não tratado', (done) => {
    const service = CnHelperTest.obterNovoTesteCrudService();
    const nomeTeste = ' programador 1';
    component.model = CnFormBaseModel.obterRegistrar('Teste', service.registrarComErroNaoTratado, CnFormHelper.obterCamposIdENome());
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, '#nome', nomeTeste);
    CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_SUBMIT).click();
    fixture.detectChanges();
    setTimeout(() => {
      const erroTratado = TesteCrudService.errorTratadoFake();
      const errosElement = CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_ERRO_VALIDACAO_SUBMIT);
      expect(errosElement.innerHTML).toContain(new CnMensagemErroHelper().erroNaoTratado());
      done();
    }, 11);
  });

  it('9 - deverá submeter e exibir notificacao de erro', (done) => {
    const service = CnHelperTest.obterNovoTesteCrudService();
    const nomeTeste = ' programador 1';
    component.model = CnFormBaseModel.obterRegistrar('Teste', service.registrarComErroTratado, CnFormHelper.obterCamposIdENome());
    fixture.detectChanges();
    spyOn(component.toastrService, 'error');
    CnHelperTest.setarElementoPorCss(fixture, '#nome', nomeTeste);
    CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_SUBMIT).click();
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.toastrService.error).toHaveBeenCalled();
      done();
    }, 11);
  });


  it('10 - deverá atualizar com sucesso', (done) => {
    const service = CnHelperTest.obterNovoTesteCrudService();
    const nomeTeste = ' programador 1';
    component.model = CnFormBaseModel.obterAtualizar('Teste'
                                                    , '1'
                                                    , service.buscarPorId
                                                    , service.atualizar
                                                    , CnFormHelper.obterCamposIdENome());
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, '#nome', nomeTeste);
    CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_SUBMIT).click();
    setTimeout(() => {

      fixture.detectChanges();
      const entityEditada = service.obterFakeDb().find(entity => entity.id === '1');
      expect(entityEditada!!.nome).toEqual(nomeTeste);
      done();
    }, 11);
  });

  it('11 - deverá buscar dados para atualizar, mas exibir erro', (done) => {
    const service = CnHelperTest.obterNovoTesteCrudService();
    const mensagemErro = MENSAGEM_ERRO_AO_CARREGAR_ENTITY_EDICAO;
    component.model = CnFormBaseModel.obterAtualizar('Teste'
                                                    , '1984980'
                                                    , service.buscarPorId
                                                    , service.atualizar
                                                    , CnFormHelper.obterCamposIdENome());
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      const erroElement = CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_ERRO_AO_CARREGAR_ENTITY_EDICAO);
      expect(component.erroAoCarregarDadosEdicao).toEqual(true);
      expect(erroElement.innerHTML).toContain(mensagemErro);
      done();
    }, 10);
  });

});
