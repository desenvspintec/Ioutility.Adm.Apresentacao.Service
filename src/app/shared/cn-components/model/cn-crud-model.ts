import { CnBtnModel } from './cn-btn-model';
import { CnFormModalComponent } from './../modais/cn-form-modal/cn-form-modal.component';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CnHelper } from 'src/app/shared/cn-helpers/cn-helper';

import { CnFormHelper } from '../../cn-helpers/cn-form-helper';
import { CnBaseDetalheModel, CnDetalheModel } from '../cn-detalhes/models/cn-detalhe-model';
import { RouterHelper } from './../../cn-helpers/cn-router-helper';
import { ROTA_COMPLEMENTO } from './../../constants/routes-constant';
import { MAX_LENGTH_PADRAO, MIN_LENGTH_PADRAO } from './../../constants/string-length-padrao.constant';
import { EFormaFormularioRegistro } from './../../enums/e-forma-formulario-registro';
import { ICrudService } from './../../interfaces/i-crud-service';
import { IEntity } from './../../models/entity';
import { CnDetalhesComponent } from './../cn-detalhes/cn-detalhes.component';
import { CnDrawerService } from './../cn-drawer/cn-drawer.service';
import { CnPesquisaModel } from './../cn-pesquisa/cn-pesquisa.model';
import { CnItemListagemExibicao } from './cn-item-listagem-exibicao';
import { CnListagemExibicaoBtnOpcao } from './cn-listagem-exibicao-btn-opcao';
import { CnListagemExibicaoModel } from './cn-listagem-exibicao-model';
import { CnStepperFormModel } from './cn-stepper-form.model';
import { CnSubmenu } from './cn-submenu';

export class CnCrudModel {

  titulo: string;
  pesquisa: CnPesquisaModel;
  service: ICrudService;
  stepperForm: CnStepperFormModel;
  itensSubmenu: CnSubmenu[];
  modelListagemExibicao: CnListagemExibicaoModel;
  detalhesModel: CnBaseDetalheModel;
  formaFormularioRegistro: EFormaFormularioRegistro;
  rotaIndex: string;
  tituloRegistrar: string;
  tituloAtualizar: string;
  registrarPersonalizadoDelegate?: (entity: IEntity) => Observable<any>;
  atualizarPersonalizadoDelegate?: (entity: IEntity) => Observable<any>;
  private _dependenciaParaDelegateDeBtnOpcao: any = {};
  constructor(rotaIndex: string, titulo: string, pesquisa: CnPesquisaModel, service: ICrudService, itemListagemExibicao: CnItemListagemExibicao[], stepperForm: CnStepperFormModel, detalhesModel: CnBaseDetalheModel, registrarDelegate?: (entity: IEntity) => Observable<any>, atualizarDelegate?: (entity: IEntity) => Observable<any>,) {
    this.titulo = titulo;
    this.pesquisa = pesquisa;
    this.service = service;
    this.stepperForm = stepperForm;
    this.itensSubmenu = [];
    this.detalhesModel = detalhesModel;
    this.rotaIndex = rotaIndex;
    this.modelListagemExibicao = new CnListagemExibicaoModel(service, [], this._dependenciaParaDelegateDeBtnOpcao, itemListagemExibicao)
    this.registrarPersonalizadoDelegate = registrarDelegate;
    this.atualizarPersonalizadoDelegate = atualizarDelegate;
    this.formaFormularioRegistro = EFormaFormularioRegistro.stepper;
    this.tituloRegistrar = 'Registrar ';
    this.tituloAtualizar = 'Atualizar ';
  }

  static obterComCamposIdENome(rotaIndex: string
    , titulo: string
    , pesquisa: CnPesquisaModel
    , service: ICrudService
    , maxLength = MAX_LENGTH_PADRAO
    , minLength = MIN_LENGTH_PADRAO): CnCrudModel {
    const campos = CnFormHelper.obterStpperFormularioComIdENome(maxLength, minLength);
    const model = new CnCrudModel(rotaIndex, titulo, pesquisa, service, [new CnItemListagemExibicao("nome", "Nome")], campos, CnFormHelper.obterDetalhesModelIdENome(service));
    model.addBtnVerDetalhes();
    model.addBtnAtualizar();
    model.addBtnInativar();
    return model;
  }

  setarTitulosPersonalizados(tituloRegistrar: string, tituloAtualizar: string): void{
    this.tituloRegistrar = tituloRegistrar;
    this.tituloAtualizar = tituloAtualizar;
  }

  obterTituloFormularioRegistrar(): string{
    return this.tituloRegistrar;
  }

  obterTituloFormularioAtualizar(): string{
    return this.tituloAtualizar;
  }

  get possuiRegistrarDelgatePersonalizado(): boolean {
    return !CnHelper.estaNuloVazioOuUndefined(this.registrarPersonalizadoDelegate);
  }
  get possuiAtualizarDelgatePersonalizado(): boolean {
    return !CnHelper.estaNuloVazioOuUndefined(this.atualizarPersonalizadoDelegate);
  }

  get obterDelegateServiceRegistrar(): (entity: IEntity) => Observable<any> {
    if (this.possuiRegistrarDelgatePersonalizado) return this.registrarPersonalizadoDelegate!;
    return this.service.registrar;
  }
  get obterDelegateServiceAtualizar(): (entity: IEntity) => Observable<any> {
    if (this.possuiRegistrarDelgatePersonalizado) return this.registrarPersonalizadoDelegate!;
    return this.service.atualizar;
  }
  setTipoFormularioParaModal(): void {
    this.formaFormularioRegistro = EFormaFormularioRegistro.modal;
  }
  setTipoFormularioParaStepper(): void {
    this.formaFormularioRegistro = EFormaFormularioRegistro.stepper;
  }
  get formaFormularioEhModal(): boolean { return this.formaFormularioRegistro === EFormaFormularioRegistro.modal; }
  get formaFormularioEhStepper(): boolean { return this.formaFormularioRegistro === EFormaFormularioRegistro.stepper; }

  setSubmenu(itensSubmenu: CnSubmenu[]): void {
    this.itensSubmenu = itensSubmenu;
  }
  addItensListagemExibicao(itens: CnItemListagemExibicao[]): void {
    itens.forEach(item => this.modelListagemExibicao.itens.push(item));
  }
  addItemListagemExibicao(item: CnItemListagemExibicao): void {
    this.modelListagemExibicao.itens.push(item);
  }

  addBtnAtualizar(): void {
    this.addBtnNaListagemExibicao('Editar', (entityId: string, params: { rota: Router }) => {
      params.rota.navigateByUrl(RouterHelper.formarRota([this.rotaIndex, entityId, ROTA_COMPLEMENTO.atualizar]))
    }, 'edit');
  }
  addBtnAtualizarModal(matDialog: MatDialog): void {
    this.addBtnNaListagemExibicao('Editar', (entityId: string, params: { rota: Router }) => {
      const campos = this.stepperForm.stepperItens[0].gruposCampos;
      const btnAtualizarModel = CnBtnModel.obterBtnAtualizarModal(this.titulo, entityId
        , this.service.buscarPorId, this.service.atualizar, campos, this.tituloAtualizar);
      this.abrirModalDeFormularioPorBotao(matDialog, CnFormModalComponent,{ data: btnAtualizarModel.formModel});
    }, 'edit');
  }
  addBtnInativar(): void {
    this.addBtnNaListagemExibicao('Excluir', (entityId: string, params: { rota: Router }) => params.rota.navigateByUrl(entityId + '/excluir'), 'delete')
  }
  addBtnVerDetalhes(): void {
    this.addBtnNaListagemExibicao('Ver detalhes', (entityId: string, params: { drawerService: CnDrawerService, service: ICrudService }) =>
      params.drawerService.abrir(CnDetalhesComponent, new CnDetalheModel(entityId, this.detalhesModel.buscarPorIdDelegate, this.detalhesModel.camposCabecalho, this.detalhesModel.sessoesGrupoCamposDetalhe)), 'visibility');
  }

  // para parametros despadronizados, devem ser adicionados pelo metodo addDependenciaParaDelegateDeBtnOpcao onde o mesmo será acessivel através da variavel
  // params da seguinte forma -> params.nomeVariavelDependente
  addBtnNaListagemExibicao(label: string, acaoDelegate: (entityId: string, params: any) => void, icon?: string): void {
    this.modelListagemExibicao.btnsOpcao.push(
      new CnListagemExibicaoBtnOpcao(label, acaoDelegate, icon)
    );
  }

  addDependenciaParaDelegateDeBtnOpcao(dependencia: any, nomeVariavel: string): void {
    this.dependenciaParaDelegateDeBtnOpcao[nomeVariavel] = dependencia;
  }

  get dependenciaParaDelegateDeBtnOpcao(): any {
    return this._dependenciaParaDelegateDeBtnOpcao;
  }
  navegarParaIndex(router: Router): void {
    router.navigateByUrl(this.rotaIndex);
  }

  abrirModalDeFormularioPorBotao = (matDialog: MatDialog, compoent: ComponentType<object>, dialogData: { data: any; }) => {
    const referencia = matDialog.open(compoent, dialogData)
    referencia.afterClosed().subscribe({
      next: resultado => {
        if (resultado?.executouAtualizacao) {
          this.pesquisa.pesquisar();
        }
      }
    });
  }
}
