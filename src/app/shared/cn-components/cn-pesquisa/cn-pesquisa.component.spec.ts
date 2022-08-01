import { CnHelperTest, ENTITYS_BASICAS_TEST } from './../../cn-helpers/cn-helper-test';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

import { CnPesquisaComponent } from './cn-pesquisa.component';
import { CnSharedTestModule } from '../../shared-modulos/cn-shared-teste.module';
import { CnPesquisaModel } from './cn-pesquisa.model';
import { EntityBasica } from '../../models/entity-basica';

describe('CnPesquisaComponent', () => {
  let component: CnPesquisaComponent;
  let fixture: ComponentFixture<CnPesquisaComponent>;
  const label = 'Teste input';
  const formControlName = 'teste';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnPesquisaComponent ]
      , imports: [
        CnSharedTestModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnPesquisaComponent);
    component = fixture.componentInstance;
  });

  it('1 - deverá inicializar com sucesso', () => {
    component.model = CnPesquisaModel.ObterPesquisaModel(CnHelperTest.buscarEntitysBasicaCacheTest);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('2 - deverá pesquisar e emitir resultado', (done) => {
    component.model = CnPesquisaModel.ObterPesquisaModel(CnHelperTest.buscarEntitysBasicaCacheTest);
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, component.pesquisaControl!!.obterNameComoCssId(), 'rrow');
    component.resultado.subscribe((resultado: EntityBasica[]) => {
       expect(1).toEqual(resultado.length);
       done();
    });
    fixture.whenStable();
  });

  it('3 - deverá pesquisar com dependente e emitir resultado', (done) => {
    component.model = CnPesquisaModel.ObterPesquisaModelComDependencia(CnHelperTest.buscarEntitysBasicaCacheComDependenteTest, '10');
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, component.pesquisaControl!!.obterNameComoCssId(), 'rrow');
    component.resultado.subscribe((resultado: EntityBasica[]) => {
       expect(1).toEqual(resultado.length);
       done();
    });
    fixture.whenStable();
  });

  it('4 - deverá pesquisar com dependente e emitir resultado com limite de 2 resultados', (done) => {
    component.model = CnPesquisaModel.ObterPesquisaModel(CnHelperTest.buscarEntitysBasicaCacheTest);
    fixture.detectChanges();
    component.limiteControl!!.obterFormControl().setValue('2');
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, component.pesquisaControl!!.obterNameComoCssId(), '');
    component.resultado.subscribe((resultado: EntityBasica[]) => {
       expect(2).toEqual(resultado.length);
       done();
    });
  });

  it('5 - deverá pesquisar com dependente e emitir resultado com limite de 2 resultados', (done) => {
    component.model = CnPesquisaModel.ObterPesquisaModelComDependencia(CnHelperTest.buscarEntitysBasicaCacheComDependenteTest, '10');
    fixture.detectChanges();
    component.limiteControl!!.obterFormControl().setValue('2');
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, component.pesquisaControl!!.obterNameComoCssId(), '');
    component.resultado.subscribe((resultado: EntityBasica[]) => {
       expect(2).toEqual(resultado.length);
       done();
    });
  });

  it('6 - deverá pesquisar e entrar no catch error', (done) => {
    component.model = CnPesquisaModel.ObterPesquisaModel(CnHelperTest.buscarEntitysBasicaComErroTest);
    fixture.detectChanges();
    CnHelperTest.setarElementoPorCss(fixture, component.pesquisaControl!!.obterNameComoCssId(), '');
    component.ocorreuErro.subscribe(() => {
      expect(true).toEqual(true);
      done();
    });
  });

  it('7 - deverá pesquisar por metodo do proprio component', (done) => {
    const service = CnHelperTest.obterNovoTesteCrudService();
    component.model = CnPesquisaModel.ObterPesquisaModel(service.buscarPorNome);
    fixture.detectChanges();
    component.model.pesquisar();
    fixture.detectChanges();
    component.resultado.subscribe((resultado: EntityBasica[]) => {
       expect(3).toEqual(resultado.length);
       done();
    });
  });

  it('8 - deverá pesquisar por metodo respeitando limite pelo proprio component', (done) => {
    component.model = CnPesquisaModel.ObterPesquisaModel(CnHelperTest.buscarEntitysBasicaCacheTest);
    fixture.detectChanges();
    component.model.pesquisar();
    fixture.detectChanges();
    component.limiteControl!!.obterFormControl().setValue(2);
    component.resultado.subscribe((resultado: EntityBasica[]) => {
       expect(2).toEqual(resultado.length);
       done();
    });
  });

  it('8 - deverá emitir que carregou', (done) => {
    component.carregado.subscribe((event: any) => {
      expect(true).toEqual(event);
      done();
    });
    component.model = CnPesquisaModel.ObterPesquisaModel(CnHelperTest.buscarEntitysBasicaCacheTest);
    fixture.detectChanges();
  });
});
