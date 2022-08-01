import { Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { CnControlValueAccessorBaseConponent } from '../../model/cn-control-value-acessor-base-component.model';
import { CnComboboxPesquisavelCvaModel } from '../models/cn-combobox-pesquisavel-cva.model';
import { CnHelper } from './../../../cn-helpers/cn-helper';
import { EntityBasica } from './../../../models/entity-basica';

@Component({
  selector: 'app-cn-combobox-pesquisavel-cva',
  templateUrl: './cn-combobox-pesquisavel-cva.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CnComboboxPesquisavelCvaComponent),
      multi: true
    }
  ]
})
export class CnComboboxPesquisavelCvaComponent extends CnControlValueAccessorBaseConponent {

  @Input() override model?: CnComboboxPesquisavelCvaModel;
  readonly nomeControlPesquisa = 'pesquisa';
  pesquisaControl = new FormControl('');
  opcoes: EntityBasica[] = [];
  opcoesCache: EntityBasica[] = [];
  valorPaiDependenteControl: string = '';
  ultimoValorDigitado = '';
  constructor(fb: FormBuilder) {
    super(fb);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    if (this.model?.pesquisaEhPorPaiDependente && this.model.obterControlPaiDelegate) {
      const controlPai = this.model.obterControlPaiDelegate();
      controlPai.valueChanges.subscribe({
        next: valorDependentePai => {
          if (valorDependentePai === this.valorPaiDependenteControl) return;

          this.valorPaiDependenteControl = valorDependentePai;
          this.pesquisaControl.setValue('');
        }
      })
    }
  }

  protected definirComoExportarValor(): void {
    this.pesquisaControl.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(texto => {
        const ultimaPesquisaEstaEmCache = this.opcoesCache.filter(opc => opc.nome === texto).length === 1;
        if (ultimaPesquisaEstaEmCache) return of(this.opcoesCache);

        let model = this.model as CnComboboxPesquisavelCvaModel;
        if (model?.pesquisaEhPorPaiDependente) {
          const valorPaiDependente = this._obterPaiDependente();
          if (CnHelper.estaNuloVazioOuUndefined(valorPaiDependente)) return of([]);

          return model.pesquisarPorNomeComPaiDependenteDelegate(texto, valorPaiDependente);
        }
        return model.pesquisarPorNomeDelegate(texto);
      })
    )
    .subscribe(valor => this._setarResultadoPesquisa(valor));
  }

  private _obterPaiDependente(): string {
    if (!CnHelper.estaNuloVazioOuUndefined(this.model?.paiDependenteId)) return this.model!.paiDependenteId;
    return this.valorPaiDependenteControl;
  }
  private _setarResultadoPesquisa(opcoes: EntityBasica[]): void {
    this._setarOpcoes(opcoes);
    this._setarValor();
  }
  private _setarOpcoes(opcoes: EntityBasica[]) {
    this.opcoes = opcoes;
    this.opcoesCache = opcoes;
  }
  private _setarValor() {
    let valorDigitado = this.pesquisaControl.value;
    let opcao = this.opcoes.find(opcaoItem => opcaoItem.nome === valorDigitado);
    if (opcao)
      this.setarValor(opcao.id);
    else
      this.setarValor(null);
  }

  protected adequarValorImportado(entityId: string): void {
    if (CnHelper.estaNuloVazioOuUndefined(entityId)) {
      this.setarValor(null);
      return;
    }
    this.model?.pesquisarPorIdDelegate(entityId).subscribe(entity => {
      this._setarOpcoes([entity]);
      this.pesquisaControl.setValue(entity.nome);
    });
  }
  protected addControlsNoFormulario(): void {
    this.addControlNoForm(this.nomeControlPesquisa, this.pesquisaControl);
  }

  pesquisar(): void {
    const valorAtual = this.pesquisaControl.value;
    this.pesquisaControl.setValue(valorAtual);
  }

}
