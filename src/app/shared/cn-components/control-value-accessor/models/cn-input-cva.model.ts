import { IEntityBasica } from './../../../models/entity-basica';
import { CnUploadInputCva } from './cn-upload-cva.model';
import { ETipoUpload } from './cv-enums-input-cva';
import { ICnInputCvaValorImbutir } from './i-cn-input-cva-valor-imbutir';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { CnHelper } from 'src/app/shared/cn-helpers/cn-helper';
import { EntityBasica } from 'src/app/shared/models/entity-basica';

import { MAX_LENGTH_PADRAO, MIN_LENGTH_PADRAO } from '../../../constants/string-length-padrao.constant';
import { CnControlValueAccessorModelBase } from '../../model/cn-control-value-accessor-model-base.model';
import { TAMANHO_RESPONSIVO_6, TAMANHO_UNICO_12 } from './../../../constants/css-class-tamanhos';
import { GUID_VAZIO } from './../../../constants/valores-padroes';
import { CnComboboxPesquisavelCvaModel } from './cn-combobox-pesquisavel-cva.model';
import { CnSubformularioInputCva } from './cn-subformulario-cva-model';
import { CnSubformulariosInputCva } from './cn-subformularios-cva-model';
import { ICnInputCvaValorObtido } from './i-cn-input-cva-valor-obtido';
import { CnEnderecoCvaModel } from '../cn-endereco-cva/models';

export class CnInputCvaModel extends CnControlValueAccessorModelBase {


  contrato?: boolean;
  tipo: ETipoInput;
  dadosTextoLongo?: DadosTextoLongo;
  maxLength?: number;
  minLength?: number;
  mask?: string;
  cssClassTamanho: string;
  dadosComboBoxPesquisavelDependente?: DadosComboBoxPesquisavelDependente;
  dadosComboBoxPesquisavel?: DadosComboBoxPesquisavel;
  opcoesCombobox?: OpcaoCombobox[] = [];
  possuiDelegate = false;
  visivel = true;
  subformulario?: CnSubformularioInputCva;
  subformularios?: CnSubformulariosInputCva;
  endereco?: CnEnderecoCvaModel;
  valorPadraoAoRegistrar: any;
  mensagemErroValidacao?: string;
  upload?: {
    tipoUpload: ETipoUpload
  }
  possuiErroValidacao = false;
  ehValueObjectPersonalizado = false;
  controlsValueObjectPersonalizado?: CnInputCvaModel[];
  private _mapearValores?: {
    aoSetarValor: (valorSetarNoControl: any) => ICnInputCvaValorImbutir,
    aoLerValor: (valorControl: any) => ICnInputCvaValorObtido,
  }
  get possuiMapeamentoDeValores(): boolean { return this._mapearValores != undefined; }
  private _validacoesPersonalizadas: ValidatorFn[] = [];
  get validacoesPersonalizadas(): ValidatorFn[] { return this._validacoesPersonalizadas;}
  get possuiValidacoesPersonalizadas(): boolean { return this._validacoesPersonalizadas.length > 0;}

  eventoAoCarregarFormulario?: (form: FormGroup) => void;
  private constructor(name: string, label: string, required: boolean, tipo: ETipoInput, contrato?: boolean) {
    super(name, label, required);
    this.tipo = tipo;
    this.cssClassTamanho = TAMANHO_RESPONSIVO_6;
    this.setarClassTamanho,
    this.contrato = contrato
  }

  override obterValidadoresDoControlPrincipal(): any[] {
    let validadores = [];
    if (this.required)
      validadores.push(Validators.required);
    if (this.maxLength && this.maxLength > 0)
      validadores.push(Validators.maxLength(this.maxLength));
    if (this.minLength && this.minLength > 0)
      validadores.push(Validators.minLength(this.minLength));
    if (this.tipo === ETipoInput.email)
      validadores.push(Validators.email);
    validadores.push(...this._validacoesPersonalizadas);
    return validadores;
  }

  setarMapeamentoDeValores(aoSetarValor: (valorSetarNoControl: any) => ICnInputCvaValorImbutir, aoLerValor: (valorControl: any) => ICnInputCvaValorObtido): CnInputCvaModel {
    this._mapearValores = {
      aoLerValor,
      aoSetarValor
    };
    return this;
  }

  setarRequired(required = true) {
    this.required = required;
  }

  obterValorFormControl(): any {
    let valor = this.obterFormControl().value;
    if (this.possuiMapeamentoDeValores)
      valor = this._mapearValores?.aoLerValor(valor).valorControl;
    return valor;
  }

  setarValidacoesPersonalizada(validacoes: ValidatorFn[]): CnInputCvaModel {
    this._validacoesPersonalizadas.push(...validacoes);
    return this;
  }
  setarMask(mask: string): CnInputCvaModel {
    this.mask = mask;
    return this;
  }
  setarClassTamanho(classCss: string): CnInputCvaModel {
    this.cssClassTamanho = classCss;
    return this;
  }
  obterComboBoxPesquisavelModel(): CnComboboxPesquisavelCvaModel {
    return CnComboboxPesquisavelCvaModel.obter(this.name, this.label, this.required
                                             , (this.dadosComboBoxPesquisavel as DadosComboBoxPesquisavel).pesquisarPorNomeDelegate
                                             , (this.dadosComboBoxPesquisavel as DadosComboBoxPesquisavel).pesquisarPorIdDelegate
                                             , this.placeholder);
  }
  obterComboBoxPesquisavelDependenteModel(): CnComboboxPesquisavelCvaModel {
    return CnComboboxPesquisavelCvaModel.obterComPaiDependenciaControl(this.name, this.label, this.required,
                                                () => this.dadosComboBoxPesquisavelDependente!.inputPai.obterFormControl()
                                             , (this.dadosComboBoxPesquisavelDependente as DadosComboBoxPesquisavelDependente).pesquisarPorNomeComPaiDependenteDelegate
                                             , (this.dadosComboBoxPesquisavelDependente as DadosComboBoxPesquisavelDependente).pesquisarPorIdDelegate
                                             , this.placeholder);
  }
  obterUploadModel(): CnUploadInputCva {
    return new CnUploadInputCva(this.name, this.label, this.required, this.upload!.tipoUpload);
  }

  obterClassCss(): string {
    return this.cssClassTamanho + "  cn-input-cva";
  }
  addEventoAoCarregarFormulario(delegate:  (form: FormGroup) => void): CnInputCvaModel {
    this.possuiDelegate = true;
    this.eventoAoCarregarFormulario = delegate;
    return this;
  }
  setarVisivel(): void {
    this.visivel = true;
  }

  setarInvisivel(): void {
    this.visivel = false;
  }
  setarErroValidacao(erro: string): void {
    this.mensagemErroValidacao = erro;
    this.possuiErroValidacao = true;
  }
  removerErroValidacao(): void {
    this.mensagemErroValidacao = undefined;
    this.possuiErroValidacao = false;
  }
  setarControlsDoValueObjectPersonalizado(controls: CnInputCvaModel[]): void {
    this.controlsValueObjectPersonalizado = controls;
  }

  valorApiEstaIgual(valorApi: string): boolean {
    const valorControl = this.obterFormControl().value;
    if (this.tipo === ETipoInput.data) {
      valorApi = CnHelper.converterValorApiParaValorFormControl(valorApi, valorControl,this.tipo);
    }
    return valorApi === valorControl;
  }

  setarValor(valor: any): void {
    let valorSetar = valor;
    if (this.possuiMapeamentoDeValores) {
      valorSetar = this._mapearValores?.aoSetarValor(valor).valorImbutir;
    }
    this.obterFormControl()?.setValue(valorSetar);
  }

  static InstanciaVazia(): CnInputCvaModel {
    const input = new CnInputCvaModel('', '', false, ETipoInput.hidden);
    return input;
  }
  static obterHidden(name: string): CnInputCvaModel {
    const input = new CnInputCvaModel(name, '', false, ETipoInput.hidden);
    input.setarClassTamanho('');
    return input;
  }


  static obterHiddenGuid(name: string): CnInputCvaModel {
    const input = new CnInputCvaModel(name, '', false, ETipoInput.hidden);
    input.setarClassTamanho('');
    input.valorPadrao = GUID_VAZIO;
    return input;
  }

  static obterSubformulario(name: string, label: string, required: boolean, grupoCampos: CnGrupoCamposFormulario[]): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.subformulario);
    input.setarClassTamanho(TAMANHO_UNICO_12);
    input.subformulario = new CnSubformularioInputCva(name, label, required, grupoCampos, true);
    return input;
  }

  static obterSubformularios(name: string, label: string, required: boolean, exibeContorno: boolean, exibeTitulo: boolean, grupoCampos: CnGrupoCamposFormulario[]): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.subformularios);
    input.setarClassTamanho(TAMANHO_UNICO_12);
    input.subformularios = new CnSubformulariosInputCva(name, label, required,exibeContorno, exibeTitulo, grupoCampos);
    if (required)
      input.setarValorPadrao([{}]);
    return input;
  }
  static obterTextoSimples(name: string, label: string, required: boolean,
                           maxLength = MAX_LENGTH_PADRAO, minLength = MIN_LENGTH_PADRAO): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.textoSimples);
    input.maxLength = maxLength;
    input.minLength = minLength;
    return input;
  }

  static obterTextoSimplesComMask(name: string, label: string, required: boolean, mask: string): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.textoSimples);
    input.mask = mask;
    return input;
  }
  static obterTextoLongo(name: string, label: string, required: boolean, row = 5, contrato?: boolean): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.textoLongo, contrato);
    input.dadosTextoLongo = new DadosTextoLongo(row);
    input.setarClassTamanho(TAMANHO_UNICO_12);
    return input;
  }
  static obterEmail(name: string, label: string, required: boolean): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.email);
    return input;
  }
  static obterCheckbox(name: string, label: string): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, true, ETipoInput.checkbox);
    return input;
  }
  static obterApenasNumero(name: string, label: string, required: boolean): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.apenasNumero);
    return input;
  }
  static obterData(name: string, label: string, required: boolean): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.data );
    return input;
  }
  static obterEndereco(name: string, label: string, required: boolean, necessitaComprovante: boolean): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.endereco);
    input.endereco = new CnEnderecoCvaModel(name, label, required, necessitaComprovante);

    input.cssClassTamanho = TAMANHO_UNICO_12;
    input.ehValueObjectPersonalizado = true;
    return input;
  }
  static obterUploadArquivoPorBotao(name: string, label: string, required: boolean): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.uploadArquivo);
    input.cssClassTamanho = TAMANHO_UNICO_12;
    input.upload = {
      tipoUpload: ETipoUpload.botao
    };
    return input;
  }
  static obterUploadArquivoPorDragAndDrop(name: string, label: string, required: boolean): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.uploadArquivo);
    input.cssClassTamanho = TAMANHO_UNICO_12;
    input.upload = {
      tipoUpload: ETipoUpload.dragAndDrop
    };

    return input;
  }
  static obterDataHora(name: string, label: string, required: boolean): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.dataHora );
    return input;
  }
  static obterCombobox(name: string, label: string, required: boolean, opcoes: OpcaoCombobox[]): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.comboBox );
    input.opcoesCombobox = opcoes;
    return input;
  }
  static obterComboboxMultiSelect(name: string, label: string, required: boolean, opcoes: OpcaoCombobox[]): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.comboBoxMultiSelect );
    input.opcoesCombobox = opcoes;
    return input;
  }
  static obterComboBoxPesquisavel(name: string
                                , label: string
                                , required: boolean
                                , pesquisarPorNomeDelegate: (palavraChave: string) => Observable<IEntityBasica[]>
                                , pesquisarPorIdDelegate: (palavraChave: string) => Observable<IEntityBasica>): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.data);
    input.tipo = ETipoInput.comboBoxPesquisavel;
    input.dadosComboBoxPesquisavel = {pesquisarPorNomeDelegate, pesquisarPorIdDelegate};
    return input;
  }

  static obterComboBoxPesquisavelDependenteControl(name: string
    , label: string
    , required: boolean
    , inputPai: CnInputCvaModel
    , pesquisarPorNomeDelegate: (palavraChave: string, paiDependenteId: string) => Observable<EntityBasica[]>
    , pesquisarPorIdDelegate: (palavraChave: string) => Observable<EntityBasica>): CnInputCvaModel {
      const input = new CnInputCvaModel(name, label, required, ETipoInput.data);
      input.tipo = ETipoInput.comboBoxPesquisavelDependente;
      input.dadosComboBoxPesquisavelDependente = new DadosComboBoxPesquisavelDependente(pesquisarPorNomeDelegate, pesquisarPorIdDelegate, inputPai);
      return input;
  }

  static obterHora(name: string, label: string, required: boolean): CnInputCvaModel {
    const input = new CnInputCvaModel(name, label, required, ETipoInput.hora );
    return input;
  }

}
export enum ETipoInput {
  hidden,
  textoSimples,
  textoLongo,
  email,
  apenasNumero,
  data,
  dataHora,
  comboBoxPesquisavel,
  comboBoxPesquisavelDependente,
  comboBox,
  checkbox,
  endereco,
  subformulario,
  subformularios,
  comboBoxMultiSelect,
  uploadArquivo,
  hora
}
export class DadosTextoLongo {
  constructor (public row: number){

  }
}
export class DadosComboBoxPesquisavel {
  constructor (public pesquisarPorNomeDelegate: (palavraChave: string) => Observable<EntityBasica[]>,public  pesquisarPorIdDelegate: (palavraChave: string) => Observable<EntityBasica>) {}
}
export class DadosComboBoxPesquisavelDependente {
  constructor (public pesquisarPorNomeComPaiDependenteDelegate: (palavraChave: string, paiDependenteId: string) => Observable<EntityBasica[]>,public  pesquisarPorIdDelegate: (palavraChave: string) => Observable<EntityBasica>, public inputPai: CnInputCvaModel) {}
}

export class OpcaoCombobox {
  constructor(public id: any, public nome: string){}
}

