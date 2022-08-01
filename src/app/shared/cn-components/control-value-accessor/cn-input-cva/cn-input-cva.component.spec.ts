import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CnInputCvaModel } from './../models/cn-input-cva.model';
import { CnSharedTestModule } from '../../../shared-modulos/cn-shared-teste.module';
import { MAX_LENGTH_PADRAO, MIN_LENGTH_PADRAO } from 'src/app/shared/constants/string-length-padrao.constant';
import { CnInputCvaComponent } from './cn-input-cva.component';


describe('CnInputCvaComponent', () => {
  let component: CnInputCvaComponent;
  let fixture: ComponentFixture<CnInputCvaComponent>;
  const label = 'Teste input';
  const formControlName = 'teste';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnInputCvaComponent ]
      , imports: [
        CnSharedTestModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnInputCvaComponent);
    component = fixture.componentInstance;
    component.model = CnInputCvaModel.obterTextoSimples(formControlName, label, true, MAX_LENGTH_PADRAO, MIN_LENGTH_PADRAO);
    component.ativarEsadoDeTesteJasmine();
    fixture.detectChanges();
  });
  it('1 - deverá inicializar com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('2 - deverá inicializar com erro por nao passar dados do input model', () => {
    const mensagemErro = 'não foi passado os valores de configuração para o control value accessor CnInputCvaComponent';
    let erro = '';
    try {
      component.model = undefined;
      component.ngOnInit();
      fixture.detectChanges();
    } catch (error: any) {
      erro = error.message;
    }
    expect(erro).toContain(mensagemErro);
  });

  it('3 - deverá exibir um input text', () => {
    const htmlInput = fixture.debugElement.query(By.css('input'));
    expect(htmlInput).not.toBeNull();
  });

  it('4 - deverá exibir um textarea', () => {
    component.model = CnInputCvaModel.obterTextoLongo(formControlName, label, true);
    fixture.detectChanges();
    const htmlTextArea = fixture.debugElement.query(By.css('textarea'));
    expect(htmlTextArea).not.toBeNull();
  });

  it('5 - deverá exibir um input number', () => {
    component.model = CnInputCvaModel.obterApenasNumero(formControlName, label, true);
    fixture.detectChanges();
    const htmlInputType = fixture.debugElement.query(By.css('input')).properties.type;
    expect('number').toEqual(htmlInputType);
  });

  it('5 - deverá exibir um input e-mail', () => {
    component.model = CnInputCvaModel.obterEmail(formControlName, label, true);
    fixture.detectChanges();
    const htmlInputType = fixture.debugElement.query(By.css('input')).properties.type;
    expect('email').toEqual(htmlInputType);
  });
  it('6 - deverá exibir um input date', () => {
    component.model = CnInputCvaModel.obterData(formControlName, label, true);
    fixture.detectChanges();
    const htmlInputType = fixture.debugElement.query(By.css('input')).properties.type;
    expect('date').toEqual(htmlInputType);
  });

  it('7 - deverá setar um valor', () => {
    const valorTestar = 'teste teste teste';
    component.model = CnInputCvaModel.obterTextoSimples(formControlName, label, true, MAX_LENGTH_PADRAO, MIN_LENGTH_PADRAO);
    const control = component.form.controls[component.controlTexto];

    control.setValue(valorTestar);
    fixture.detectChanges();
    expect(valorTestar).toEqual(component.obterValor());
    expect(valorTestar).toEqual(fixture.debugElement.query(By.css('input')).nativeElement.value);
  });


  it('8 - deverá desabilitar e habilitar', () => {
    component.model = CnInputCvaModel.obterData(formControlName, label, true);
    fixture.detectChanges();
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(false).toEqual(component.estaHabilitado);

    component.setDisabledState(false);
    fixture.detectChanges();
    expect(true).toEqual(component.estaHabilitado);
  });
});
