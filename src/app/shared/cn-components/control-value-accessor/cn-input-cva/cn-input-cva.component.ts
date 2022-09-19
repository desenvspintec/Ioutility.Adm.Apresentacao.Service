import { CnHelper } from './../../../cn-helpers/cn-helper';
import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CnMensagemErroHelper } from 'src/app/shared/cn-helpers/cn-mensagem-erro-helper';

import { CnControlValueAccessorBaseConponent } from '../../model/cn-control-value-acessor-base-component.model';
import { CnInputCvaModel, ETipoInput } from './../models/cn-input-cva.model';

@Component({
  selector: 'app-cn-input-cva',
  templateUrl: './cn-input-cva.component.html',
  styleUrls: ['cn-input-cva.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CnInputCvaComponent),
      multi: true,
    },
  ],
})
export class CnInputCvaComponent extends CnControlValueAccessorBaseConponent {
  readonly inputTypeIndefinido = 'indefinido';
  readonly controlTexto = 'texto';
  readonly mensagemErro = new CnMensagemErroHelper();
  @Input() override model?: CnInputCvaModel;
  @Input() override logIdentificador: string = '';
  formControl?: FormControl;
  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  override ngOnInit() {
    super.ngOnInit();
    // em caso de debug, basta descomentar o codigo abaixo
    // console.log('--------------------------------------');
    // console.log('label:');
    // console.log(this.model!!.label);
    // console.log('hidden:');
    // console.log(this.ehHidden());
    // console.log('input type:');
    // console.log(this.obterInputType());
    // console.log('input type valido:');
    // console.log(this.inputTypeValido());
    // console.log('combobox:');
    // console.log(this.ehComboBoxPesquisavel());
    // console.log('CONTROL INDEFINIDO:');
    // console.log(this.controlIndefinido());
    // console.log('this.model?.valorPadrao');
    // console.log(this.model?.valorPadrao);
  }

  addControlsNoFormulario(): void {
    this.formControl = this._formBuilder.control('', this._obterValidadores());
    this.addControlNoForm(this.controlTexto, this.formControl);
  }
  private _obterValidadores(): any[] {
    return this.model!!.obterValidadoresDoControlPrincipal();
  }
  protected adequarValorImportado(valor?: any): void {
    valor = this.adequarValorQuandoData(valor);
    valor = this.adequarValorQuandoDecimal(valor);

    this.formControl?.setValue(valor);
  }
  private adequarValorQuandoDecimal(valor: any) {
    const necessidadeAdequarNumeroDecimal = this.model?.tipo === ETipoInput.apenasNumero && !CnHelper.estaNuloVazioOuUndefined(valor) && (valor.toString() as string).includes('.');
    if (necessidadeAdequarNumeroDecimal)
      valor = (valor.toString() as string).replace('.', ',');
    return valor;
  }

  private adequarValorQuandoData(valor: any) {
    const nescessitaAdequarData = this.model?.tipo === ETipoInput.data && valor?.length > 0;
    if (nescessitaAdequarData)
      valor = valor.substring(0, 10);
    return valor;
  }

  definirComoExportarValor(): void {
    let control = this.form.get(this.controlTexto) as AbstractControl;
    control.valueChanges.subscribe((texto) => {
      this.setarValor(texto);
    });
  }
  obterInputType(): string {
    switch (this.model!!.tipo) {
      case ETipoInput.hidden:
        return 'hidden';
      case ETipoInput.textoSimples:
        return 'text';
      case ETipoInput.apenasNumero:
        return 'number';
      case ETipoInput.data:
        return 'date';
      case ETipoInput.dataHora:
        return 'datetime-local';
      case ETipoInput.email:
        return 'email';
      case ETipoInput.textoLongo:
        return '';
      case ETipoInput.uploadArquivo:
        return 'file';
      case ETipoInput.hora:
        return 'time';
      default:
        return this.inputTypeIndefinido;
    }
  }
  inputTypeValido(): boolean {
    return this.obterInputType() !== this.inputTypeIndefinido;
  }
  controlIndefinido(): boolean {
    if (this.model!.tipo === ETipoInput.subformularios) return false;
    if (this.model!.tipo === ETipoInput.subformulario) return false;
    if (this.model!.tipo === ETipoInput.checkbox) return false;
    if (this.model!.tipo === ETipoInput.comboBox) return false;
    if (this.model!.tipo === ETipoInput.comboBoxPesquisavel) return false;
    if (this.model!.tipo === ETipoInput.comboBoxPesquisavelDependente) return false;
    if (this.model!.tipo === ETipoInput.comboBoxMultiSelect) return false;
    if (this.model!.tipo === ETipoInput.endereco) return false;
    if (this.model!.tipo === ETipoInput.uploadArquivo) return false;
    if (this.obterInputType() !== this.inputTypeIndefinido) return false;

    return true;
  }

  ehTextoLongo(): boolean {
    if (this.model!!.tipo === ETipoInput.textoLongo) return true;
    return false;
  }

  ehHidden(): boolean {
    if (this.model!.tipo === ETipoInput.hidden) return true;
    return false;
  }

  ehComboBoxPesquisavel(): boolean {
    if (this.model!.tipo === ETipoInput.comboBoxPesquisavel) return true;
    return false;
  }

  ehComboBoxMultiSelect(): boolean {
    if (this.model!.tipo === ETipoInput.comboBoxMultiSelect) return true;
    return false;
  }

  ehComboBoxPesquisavelDependente(): boolean {
    if (this.model!.tipo === ETipoInput.comboBoxPesquisavelDependente) return true;
    return false;
  }

  ehSubformulario(): boolean {
    if (this.model!.tipo === ETipoInput.subformulario) return true;
    return false;
  }

  ehSubformularios(): boolean {
    if (this.model!.tipo === ETipoInput.subformularios) return true;
    return false;
  }

  ehCheckbox(): boolean {
    if (this.model!.tipo === ETipoInput.checkbox) return true;
    return false;
  }

  ehCombobox(): boolean {
    if (this.model!.tipo === ETipoInput.comboBox) return true;
    return false;
  }
  ehEndereco(): boolean {
    if (this.model!.tipo === ETipoInput.endereco) return true;
    return false;
  }
  ehTexto(): boolean {
    switch (this.model!.tipo) {
      case ETipoInput.apenasNumero:
        return true;
      case ETipoInput.email:
        return true;
      case ETipoInput.textoSimples:
        return true;
      case ETipoInput.textoLongo:
        return true;
      case ETipoInput.data:
        return true;
      case ETipoInput.dataHora:
          return true;
      case ETipoInput.hora:
          return true;
      default:
    }
    return false;
  }
  ehUploadArquivo(): boolean {
    if (this.model!.tipo === ETipoInput.uploadArquivo) return true;
    return false;
  }
}
