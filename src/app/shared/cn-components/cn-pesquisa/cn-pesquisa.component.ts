import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';

import { EntityBasica } from '../../models/entity-basica';
import { CnFormBaseModel } from '../model/cn-form-base-model';
import { CnGrupoCamposFormulario } from '../model/cn-grupo-campos-formulario';
import { IHttpErrorResponse } from './../../interfaces/i-http-error-response';
import { CnInputCvaModel } from './../control-value-accessor/models/cn-input-cva.model';
import { CnPesquisaModel, CONTROL_NAME_PESQUISA_RESET } from './cn-pesquisa.model';

@Component({
  selector: 'app-cn-pesquisa',
  templateUrl: './cn-pesquisa.component.html'
})
export class CnPesquisaComponent implements OnInit, AfterViewInit {

  @Input() model?: CnPesquisaModel;
  @Output() carregado = new EventEmitter();
  @Output() resultado = new EventEmitter();
  @Output() ocorreuErro = new EventEmitter();
  readonly pesquisaControl?: CnInputCvaModel = CnInputCvaModel.obterTextoSimples(CnPesquisaModel.cssIdNamePesquisa(), 'Pesquisar', false, undefined, undefined);;
  readonly limiteControl?: CnInputCvaModel =  CnInputCvaModel.obterApenasNumero('limite', 'Limite', true);
  formModel?: CnFormBaseModel;

  constructor() {
  }


  ngOnInit(): void {
    this._definirFormsModel();
    this._emitirEventoCarregado();

  }
  ngAfterViewInit(): void {
    this._definirValueChangesPesquisa();
    this.model!.aoSolicitarPesquisa.subscribe({
      next: param => {
        if (param) {
          this.formModel?.formGroup?.setValue(param)
        } else {
          this.formModel!.formGroup?.get(CONTROL_NAME_PESQUISA_RESET)?.setValue('');
        }
      }
    })
  }
  private _definirFormsModel() {
    this.formModel = CnFormBaseModel.obterSemSubmit('', [
      new CnGrupoCamposFormulario('', this.model?.controlsPesquisaInputCva!)
    ])
  }
  private _definirValueChangesPesquisa() {
    this.formModel!.formGroup!.valueChanges.pipe(
      debounceTime(300)
      , switchMap(formValue =>  {
        let model = this.model as CnPesquisaModel;
        return model.pesquisarDelegate!(formValue);
      })
    ).subscribe({next: (entitys: EntityBasica[]) => this.resultado.emit(entitys),
                error: (error: IHttpErrorResponse) => {
                  console.log('erro ao carregar pesquisa.');
                  console.log(error);
                  this.ocorreuErro.emit();
                }});
  }
  private _emitirEventoCarregado() {
    this.carregado.emit(true);
  }


}
