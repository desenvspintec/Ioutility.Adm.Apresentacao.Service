import { MatDialogRef } from '@angular/material/dialog';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnFormInativarComponent, CSS_CLASS_TITULO_INATIVAR, CSS_CLASS_MENSAGEM_INATIVAR } from './cn-form-inativar.component';
import { CnSharedTestModule } from 'src/app/shared/shared-modulos/cn-shared-teste.module';
import { CnFormInativarModel } from '../../model/cn-form-inativar-model';
import { ICrudServiceTest } from 'src/app/shared/interfaces/i-crud-service-test';
import { CnHelperTest } from 'src/app/shared/cn-helpers/cn-helper-test';
import { NOME_DB_TEST_YARROW } from 'src/app/shared/services/teste-crud.service';
import { CSS_CLASS_BTN_SUBMIT } from '../../btns/cn-btn-submit/cn-btn-submit.component';
import { CnMensagemErroHelper } from 'src/app/shared/cn-helpers/cn-mensagem-erro-helper';
import { CSS_CLASS_ERRO_VALIDACAO_SUBMIT } from '../cn-form/cn-form.component';

describe('CnFormInativarComponent', () => {
  let component: CnFormInativarComponent;
  let fixture: ComponentFixture<CnFormInativarComponent>;
  let service: ICrudServiceTest;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnFormInativarComponent ],
      imports: [ CnSharedTestModule, CnSharedTestModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnFormInativarComponent);
    service = CnHelperTest.obterNovoTesteCrudService();
    let modal = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    component.model = new CnFormInativarModel('teste', {id: '1', nome: NOME_DB_TEST_YARROW}, service.inativar)
      .definirModal(modal);
    fixture.detectChanges();
  });

  it('1 - deverá inicializar', () => {
    expect(component).toBeTruthy();
  });
  it('2 - deverá exibir titulo', () => {
    let elementoTitulo = CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_TITULO_INATIVAR);
    expect(elementoTitulo.innerHTML).toContain(component.titulo());
  });
  it('3 - deverá exibir mensagem de confirmação de inativacao', () => {
    let elementoTitulo = CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_MENSAGEM_INATIVAR);
    expect(elementoTitulo.innerHTML).toContain('Você tem certeza que deseja');
    expect(elementoTitulo.innerHTML).toContain('inativar');
    expect(elementoTitulo.innerHTML).toContain(component.model.entityBasica.nome);
  });
  it('4 - deverá inativar e notificar sucesso', (done) => {
    const entityInativar = service.obterFakeDb().find(entity => entity.id === component.model.entityBasica.id);
    spyOn(component.toastrService, 'success');
    CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_SUBMIT).click();
    expect(entityInativar).not.toEqual(undefined);
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      const entityInativada = service.obterFakeDb().find(entity => entity.id === component.model.entityBasica.id);
      expect(entityInativada).toEqual(undefined);
      expect(component.toastrService.success).toHaveBeenCalled();
      done();
    }, 11);
  });
  it('5 - deverá inativar e notificar erro', (done) => {
    component.model = new CnFormInativarModel('teste', {id: '1', nome: NOME_DB_TEST_YARROW}, service.inativarComErroNaoTratado)
      .definirModal(TestBed.inject(MatDialogRef));
    fixture.detectChanges();
    // component.ngOnInit();
    fixture.detectChanges();
    const entityInativar = service.obterFakeDb().find(entity => entity.id === component.model.entityBasica.id);
    spyOn(component.toastrService, 'error');
    CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_SUBMIT).click();
    expect(entityInativar).not.toEqual(undefined);
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      const elementoHtmlErro = CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_ERRO_VALIDACAO_SUBMIT);
      const entityInativada = service.obterFakeDb().find(entity => entity.id === component.model.entityBasica.id);
      expect(elementoHtmlErro.innerHTML).toContain(new CnMensagemErroHelper().erroNaoTratado());
      expect(entityInativada).toEqual(entityInativar);
      expect(component.toastrService.error).toHaveBeenCalled();
      done();
    }, 11);
  });

});
