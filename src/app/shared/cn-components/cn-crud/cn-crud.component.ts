import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CnHelper } from '../../cn-helpers/cn-helper';
import { EntityBasica } from '../../models/entity-basica';
import { CnBtnModel } from '../model/cn-btn-model';
import { CnCrudModel } from '../model/cn-crud-model';
import { ANIMAR_ENTRADA } from './../../constants/animacoes.constant';
import { ICrudService } from './../../interfaces/i-crud-service';
import { CnDrawerService } from './../cn-drawer/cn-drawer.service';

@Component({
  selector: 'app-cn-crud',
  templateUrl: './cn-crud.component.html',
  styleUrls: ['./cn-crud.component.css'],
  animations: ANIMAR_ENTRADA
})
export class CnCrudComponent implements OnInit {
  readonly cssIdTabelaResultadoPesquisa = 'tabela-resultado-pesquisa';
  private _entitysPesquisadas: EntityBasica[] = [];
  ocorreuErroAoPesquisar = false;
  @Input() model?: CnCrudModel;
  btnRegistrar: CnBtnModel;
  btnAtualizar: CnBtnModel;

  constructor(private _rota: Router, private _drawerService: CnDrawerService) {
    this.btnRegistrar = CnBtnModel.obterBtnRegistrarPorLink();
    this.btnAtualizar = CnBtnModel.obterBtnAtualizarPorLink();
  }

  ngOnInit() {
    if (this.model!.formaFormularioEhModal) {
      const form = this.model!.stepperForm.stepperItens[0].gruposCampos;
      this.btnRegistrar = CnBtnModel.obterBtnRegistrarModal(this.model!.titulo, this.model!.obterDelegateServiceRegistrar, form, this.model!.tituloRegistrar);
    }
    this.model?.addDependenciaParaDelegateDeBtnOpcao(this._rota, "rota");
    this.model?.addDependenciaParaDelegateDeBtnOpcao(this._drawerService, "drawerService");
    this.model?.addDependenciaParaDelegateDeBtnOpcao(this.model.service, "service");
  }

  setarEntitysPesquisadas(resultado: EntityBasica[]): void {
    this.ocorreuErroAoPesquisar = false;
    this._entitysPesquisadas = resultado;
  }

  acionarPesquisa(): void {
    this.model?.pesquisa.pesquisar();
  }

  obterEntitys(): EntityBasica[] {
    return this._entitysPesquisadas;
  }

  haEntitys(): boolean {
    const possuiEntitys = !CnHelper.estaNuloVazioOuUndefined(this._entitysPesquisadas);
    return possuiEntitys;
  }

  obterBtnAtualizar(entityId: string): CnBtnModel {
    let model = this.model as CnCrudModel;
    if (this.model!.formaFormularioEhModal) {
      const form = this.model!.stepperForm.stepperItens[0].gruposCampos;
      return CnBtnModel.obterBtnAtualizarModal(model.titulo, entityId
                                              , model.service.buscarPorId, model.service.atualizar, form, model.tituloAtualizar);
    }
    return CnBtnModel.obterBtnAtualizarModal(model.titulo, entityId
      , model.service.buscarPorId, model.service.atualizar, [], model.tituloAtualizar);
    
  }

  obterBtnInativar(entityBasica: EntityBasica): CnBtnModel {
    let model = this.model as CnCrudModel;
    const serviceTest = (model.service as ICrudService);
    return CnBtnModel.obterBtnInativarModal(model.titulo, entityBasica, serviceTest.inativar);
  }

  setarErroAoPesquisa(): void {
    this.ocorreuErroAoPesquisar = true;
  }
}
