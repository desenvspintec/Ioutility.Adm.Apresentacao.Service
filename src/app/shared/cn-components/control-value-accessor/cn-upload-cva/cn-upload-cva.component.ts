import { debounceTime } from 'rxjs/operators';
import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, FormControl, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { CnControlValueAccessorBaseConponent } from '../../model/cn-control-value-acessor-base-component.model';
import { CnHelper } from './../../../cn-helpers/cn-helper';
import { StringHelper } from './../../../cn-helpers/cn-string-helper';
import { ApiServicesUrl } from './../../../constants/api-services';
import { SEPARADOR_ARQUIVO } from './../../../constants/forms-contante';
import {
  GUID_VAZIO,
  SERVIDOR_ARQUIVO_PASTA_TEMPORARIA,
} from './../../../constants/valores-padroes';
import { CnUploadInputCva } from './../models/cn-upload-cva.model';
import { ETipoUpload } from './../models/cv-enums-input-cva';
import { UploadService } from './upload.service';

interface arquivoLista {
  addedFiles: any[];
}
@Component({
  selector: 'app-cn-upload-cva',
  templateUrl: './cn-upload-cva.component.html',
  styleUrls: ['./cn-upload-cva.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CnUploadCvaComponent),
      multi: true,
    },
  ],
})
export class CnUploadCvaComponent extends CnControlValueAccessorBaseConponent {
  @Input() override model?: CnUploadInputCva;
  @Input() label?: string;
  readonly tipoDragAndDrop = ETipoUpload.dragAndDrop;
  readonly tipoBotao = ETipoUpload.botao;
  @ViewChild('arquivoControl') arquivoControl: any;
  mensagemErroUpload = '';
  nomeArquivos: string[] = [];
  aoMudarListaArquivo = new Subject<string>();
  ultimoArquivoDoBotao?: string;
  controlArquivo?: AbstractControl;
  get podeClicarEmFazerUpload(): boolean {
    return this.nomeArquivos.length === 0;
  }

  protected definirComoExportarValor(): void {
    this.aoMudarListaArquivo.asObservable().subscribe((arquivos) => {
      this.setarValor(arquivos);
      this._addValorAoControlAuxiliarDeTeste();
    });
  }
  protected adequarValorImportado(valorImportar: string): void {
    if (CnHelper.estaNuloVazioOuUndefined(valorImportar)) return;
    this.nomeArquivos.push(
      ...StringHelper.converterStringEmLista(valorImportar, SEPARADOR_ARQUIVO)
    );
    this._addValorAoControlAuxiliarDeTeste();

    if (this.podeClicarEmFazerUpload) this.controlArquivo!.enable() ;
    else this.controlArquivo!.enable();
  }
  protected addControlsNoFormulario(): void {
    this.addControlNoForm('arquivo', this._formBuilder.control(''));
    this.addControlNoForm('arquivo-valor', this._formBuilder.control(''));
    this.controlArquivo = this.form.get('arquivo')!;

    this.controlArquivo.valueChanges.subscribe((valorControl) => {
      if (this.ultimoArquivoDoBotao === valorControl) return;
      if (!this.arquivoControl) return;
      this.ultimoArquivoDoBotao = valorControl;
      const arquivos: arquivoLista = {
        addedFiles: this.arquivoControl.nativeElement.files,
      };
      this.addArquivo(arquivos);
    });
  }

  private _addValorAoControlAuxiliarDeTeste(): void {
    if (!this.nomeArquivos) return;
    const valor = StringHelper.converterListaEmString(this.nomeArquivos);
    this.form.get('arquivo-valor')?.setValue(valor);
  }

  constructor(formBuilder: FormBuilder, private _service: UploadService) {
    super(formBuilder);
  }

  addArquivo(event: any) {
    this.registrarQueUsuarioTocou!('');
    this.controlArquivo?.disable();
    this._service.upload(event.addedFiles)
    .pipe(
      debounceTime(100)
    )
    .subscribe({
      next: (nomesArquivosSalvos) => {
        this.nomeArquivos.push(...nomesArquivosSalvos);
        this._registrarMudanca();
      },
    });
  }
  private _registrarMudanca() {
    let arquivosString = '';
    this.nomeArquivos.forEach(
      (nomeArquivo) => (arquivosString += nomeArquivo + SEPARADOR_ARQUIVO)
    );
    arquivosString = StringHelper.removerUltimosCaracter(
      arquivosString,
      SEPARADOR_ARQUIVO.length
    );

    this.aoMudarListaArquivo.next(arquivosString);
  }

  removerArquivo(event: any) {
    this.controlArquivo?.setValue('');
    this.controlArquivo?.enable();
    this.ultimoArquivoDoBotao = undefined;
    this.nomeArquivos.splice(this.nomeArquivos.indexOf(event), 1);
    console.log(this.controlArquivo);
    this._registrarMudanca();
  }

  formatarArquivoParaExibir(arquivoExibir: string): string {
    return arquivoExibir.substring(GUID_VAZIO.length, arquivoExibir.length);
  }

  abrirArquivoEmNovaGuia(arquivo: string): void {
    window.open(
      ApiServicesUrl.get(false).upload +
        SERVIDOR_ARQUIVO_PASTA_TEMPORARIA +
        arquivo
    );
  }
}
