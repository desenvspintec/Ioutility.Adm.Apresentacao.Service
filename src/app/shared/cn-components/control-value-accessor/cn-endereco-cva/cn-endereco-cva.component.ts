import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CnInputCvaModel } from 'src/app/shared/cn-components/control-value-accessor/models/cn-input-cva.model';

import { CnControlValueAccessorBaseConponent } from '../../model/cn-control-value-acessor-base-component.model';
import { CnHelper } from './../../../cn-helpers/cn-helper';
import { ANIMAR_ENTRADA } from './../../../constants/animacoes.constant';
import { CnCepService } from './cn-cep.service';
import { CnEnderecoCvaModel, EnderecoConsultadoViaCep } from './models';

@Component({
  selector: 'app-cn-endereco-cva',
  templateUrl: './cn-endereco-cva.component.html',
  styleUrls: ['./cn-endereco-cva.component.scss'],
  animations: [ANIMAR_ENTRADA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CnEnderecoCvaComponent),
      multi: true,
    },
  ],
})
export class CnEnderecoCvaComponent extends CnControlValueAccessorBaseConponent {

  private readonly QUANTIDADE_CARACTERES_CEP = 8;
  @Input() override model?: CnEnderecoCvaModel;

  @Output() exportarControlsUtilizadosAoInicializar = new EventEmitter();
  enderecoConsultado = false;
  cnControls!: {
    bairro: CnInputCvaModel
    cep: CnInputCvaModel
    cidade: CnInputCvaModel
    complemento: CnInputCvaModel
    estado: CnInputCvaModel
    numero: CnInputCvaModel
    logradouro: CnInputCvaModel
    uf: CnInputCvaModel
    arquivos: CnInputCvaModel
  }
  constructor(private cepService: CnCepService, fb: FormBuilder, private _toastrService: ToastrService) {
    super(fb);
    const ufControl = CnInputCvaModel.obterComboBoxPesquisavel('uf', 'Estado', true, this.cepService.buscarEstadoPorNome, this.cepService.buscarEstadoPorSigla);
    this.cnControls = {
      uf: ufControl,
      bairro: CnInputCvaModel.obterTextoSimples('bairro', 'Bairro', true),
      cep: CnInputCvaModel.obterTextoSimplesComMask('cep', 'Cep', true, '00000-000'),
      cidade: CnInputCvaModel.obterComboBoxPesquisavelDependenteControl('cidade', 'Cidade', true, ufControl, this.cepService.buscarCidadePorNomeEEstado, this.cepService.buscarCidadePorNome),
      complemento: CnInputCvaModel.obterTextoSimples('complemento', 'Complemento', false),
      estado: CnInputCvaModel.obterHidden('estado'),
      numero: CnInputCvaModel.obterApenasNumero('numero', 'Numero', true),
      logradouro: CnInputCvaModel.obterTextoSimples('logradouro', 'Logradouro', true),
      arquivos: CnInputCvaModel.obterUploadArquivoPorDragAndDrop('arquivos', 'Comprovante de residencia', true),
    }

   }

  override ngOnInit(): void {
    this.cnControls.arquivos.setarRequired(this.model?.possuiCampoComprovante);
    super.ngOnInit();
    this._addNomeDoEstadoAoSelecionarUF();
    this._addValueChangesParaCep();
    this.exportarControlsUtilizadosAoInicializar.emit([
      this.cnControls.bairro,
      this.cnControls.cep,
      this.cnControls.cidade,
      this.cnControls.complemento,
      this.cnControls.estado,
      this.cnControls.numero,
      this.cnControls.logradouro,
      this.cnControls.uf,
    ])
  }

  private _addNomeDoEstadoAoSelecionarUF() {
    this.form.get(this.cnControls.uf.name)!.valueChanges.pipe(
      debounceTime(50),
      switchMap((siglaUf) => {
        return this.cepService.buscarEstadoPorSigla(siglaUf);
      })
    ).subscribe({
      next: (estado) => {
        this.form.get(this.cnControls.estado.name)?.setValue(estado.id);
      }
    });
  }

  private _addValueChangesParaCep() {
    this.form.get(this.cnControls.cep.name)?.valueChanges.pipe(
      debounceTime(300),
      switchMap(cep => this._obterObservableBuscarCep(cep))
    ).subscribe({
      next: (enderecoConsultado: any) => {
        if (enderecoConsultado === null)
          return;

        this.enderecoConsultado = true;
        const encontrouCep = CnHelper.estaNuloVazioOuUndefined(enderecoConsultado.erro);

        if (!encontrouCep) {
          this._notificarEnderecoNaoEncontrado();
          return;
        }
        const enderecoConsultadoComSucesso = enderecoConsultado as EnderecoConsultadoViaCep;

        this.form.get(this.cnControls.bairro.name)?.setValue(enderecoConsultadoComSucesso.bairro);
        this.form.get(this.cnControls.complemento.name)?.setValue(enderecoConsultadoComSucesso.complemento);
        this.form.get(this.cnControls.logradouro.name)?.setValue(enderecoConsultadoComSucesso.logradouro);
        this.form.get(this.cnControls.uf.name)?.setValue(enderecoConsultadoComSucesso.uf);
        setTimeout(() => {
          this.form.get(this.cnControls.cidade.name)?.setValue(enderecoConsultadoComSucesso.localidade);
        }, 600);
      }
    });
  }

  private _notificarEnderecoNaoEncontrado() {
    const cepConsultado = this.form.get(this.cnControls.cep.name)?.value;
    this._toastrService.info(`Por favor, verifique se esta correto, ou preencha o formulário manualmente`, `${cepConsultado} não foi encontrado.`);
  }

  protected definirComoExportarValor(): void {
    this.form.valueChanges.subscribe({
      next: (valorFormulario) => {
        if (!this.form.valid) this.setarValor(null);
        else this.setarValor(valorFormulario);
      }
    })
  }
  protected adequarValorImportado(valor: any): void {
    if (CnHelper.estaNuloVazioOuUndefined(valor)) return;
    this.form.patchValue(valor);
  }
  protected addControlsNoFormulario(): void {
    this.addCnInputControlNoForm(this.cnControls.bairro);
    this.addCnInputControlNoForm(this.cnControls.cep);
    this.addCnInputControlNoForm(this.cnControls.cidade);
    this.addCnInputControlNoForm(this.cnControls.complemento);
    this.addCnInputControlNoForm(this.cnControls.estado);
    this.addCnInputControlNoForm(this.cnControls.numero);
    this.addCnInputControlNoForm(this.cnControls.logradouro);
    this.addCnInputControlNoForm(this.cnControls.uf);
    this.addCnInputControlNoForm(this.cnControls.arquivos);
  }

  private _obterObservableBuscarCep(cep?: string): Observable<any> {
    if (cep?.length === this.QUANTIDADE_CARACTERES_CEP) return this.cepService.buscarCep(cep);
    return of(null)
  }

  podeExibirFormulario(): boolean {
    return this.enderecoConsultado && this.form.get(this.cnControls.cep.name)!.valid;
  }

}


