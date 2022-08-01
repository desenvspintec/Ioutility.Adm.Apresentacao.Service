// import { NOME_DB_TEST_YARROW, NOME_DB_TEST_FREELANCER, NOME_DB_TEST_MATTIAS } from './../../services/teste-crud.service';
// import { CSS_CLASS_BTN_INATIVAR } from './../btns/cn-btn-inativar/cn-btn-inativar.component';
// import { CSS_CLASS_BTN_ATUALIZAR } from './../btns/cn-btn-atualizar/cn-btn-atualizar.component';
// import { CSS_CLASS_BTN_REGISTRAR } from './../btns/cn-btn-registrar/cn-btn-registrar.component';
// import { CnHelperTest } from './../../cn-helpers/cn-helper-test';
// import { CnPesquisaModel } from './../cn-pesquisa/cn-pesquisa.model';
// import { CnCrudComponent } from './cn-crud.component';
// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { CnSharedTestModule } from '../../shared-modulos/cn-shared-teste.module';
// import { CnCrudModel } from '../model/cn-crud-model';

// describe('CnCrudComponent', () => {
//   let component: CnCrudComponent;
//   let fixture: ComponentFixture<CnCrudComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ CnCrudComponent ]
//       , imports: [
//         CnSharedTestModule.forRoot(),
//         CnSharedTestModule
//       ]
//     });
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CnCrudComponent);
//     component = fixture.componentInstance;
//     const service = CnHelperTest.obterNovoTesteCrudService();
//     let model = CnCrudModel.obterComCamposIdENome('Teste titulo',
//                                , CnPesquisaModel.ObterPesquisaModel(service.buscarPorNome)
//                                , service);
//     component.model = model;
//     fixture.detectChanges();
//   });

//   it('1 - deverá inicializar com sucesso', () => {
//     expect(component).toBeTruthy();
//   });

//   it('2 - deverá pesquisar', (done) => {
//     const css = '#' + CnPesquisaModel.cssIdNamePesquisa();
//     setTimeout(() => {
//       fixture.detectChanges();
//       const cssTabela = '#' + component.cssIdTabelaResultadoPesquisa;
//       const elementoHtml = CnHelperTest.obterElementoHtml(fixture, cssTabela);
//       expect(elementoHtml.innerHTML).toContain(NOME_DB_TEST_YARROW);
//       expect(elementoHtml.innerHTML).toContain(NOME_DB_TEST_FREELANCER);
//       expect(elementoHtml.innerHTML).toContain(NOME_DB_TEST_MATTIAS);
//       done();
//     }, 1500);
//   });

//   it('3 - deverá exibir resultados após a pesquisa', (done) => {
//     const css = '#' + CnPesquisaModel.cssIdNamePesquisa();
//     CnHelperTest.setarElementoPorCss(fixture, css, NOME_DB_TEST_YARROW);
//     fixture.detectChanges();
//     setTimeout(() => {
//       fixture.detectChanges();
//       const cssTabela = '#' + component.cssIdTabelaResultadoPesquisa;
//       const elementoHtml = CnHelperTest.obterElementoHtml(fixture, cssTabela);
//       expect(elementoHtml.innerHTML).toContain(NOME_DB_TEST_YARROW);
//       expect(elementoHtml.innerHTML).not.toContain(NOME_DB_TEST_MATTIAS);
//       done();
//     }, 1500);
//   });

//   it('4 - deverá exibir resultados mensagem de itens não encontrados', (done) => {
//     const css = '#' + CnPesquisaModel.cssIdNamePesquisa();
//     CnHelperTest.setarElementoPorCss(fixture, css, 'fijasofjasiofjasdopfjisdofsdf');
//     fixture.detectChanges();
//     setTimeout(() => {
//       fixture.detectChanges();
//       const cssTabela = '#' + component.cssIdTabelaResultadoPesquisa;
//       const elementoHtml = CnHelperTest.obterElementoHtml(fixture, cssTabela);
//       expect(elementoHtml.innerHTML).toContain('Nenhum registro foi encontrado');
//       done();
//     }, 1500);
//   });

//   it('5 - deverá exibir resultados mensagem de itens carregando', () => {
//     const conteudo = fixture.debugElement.nativeElement;
//     expect(conteudo.innerHTML).toContain('app-cn-carregando');
//   });

//   it('6 - deverá exibir botõa registrar', () => {
//     const conteudo = CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_REGISTRAR);
//     expect(conteudo).not.toBeNull();

//   });

//   it('7 - deverá abrir atualizar', (done) => {
//     setTimeout(() => {
//       fixture.detectChanges();
//       const conteudo = CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_ATUALIZAR);
//       expect(conteudo).not.toBeNull();
//       fixture.detectChanges();
//       done();
//     }, 500);
//   });
//   it('8 - deverá abrir inativar', (done) => {
//     setTimeout(() => {
//       fixture.detectChanges();
//       const conteudo = CnHelperTest.obterElementoHtml(fixture, '.' + CSS_CLASS_BTN_INATIVAR);
//       expect(conteudo).not.toBeNull();
//       fixture.detectChanges();
//       done();
//     }, 500);
//   });
// });
