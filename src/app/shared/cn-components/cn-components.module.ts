import { CnListagemCrudItemPeronsalizadoComponent } from './cn-listagem-crud/cn-listagem-crud-item-peronsalizado/cn-listagem-crud-item-peronsalizado.component';
import { CnListagemPersonalizadaDirective } from './cn-listagem-crud/cn-listagem-personalizada.directive';
import { CnSublistagemCrudComponent } from './cn-sublistagem-crud/cn-sublistagem-crud.component';
import { CnSublistagemCrudDirective } from './cn-sublistagem-crud/cn-sublistagem-crud.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CnUploadCvaComponent } from './control-value-accessor/cn-upload-cva/cn-upload-cva.component';

import { CnModalHeaderComponent } from './modais/cn-modal-header/cn-modal-header.component';
import { CnEnderecoCvaComponent } from './control-value-accessor/cn-endereco-cva/cn-endereco-cva.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularCoreModule } from '../shared-modulos/angular-core.module';
import { AngularMaterialModule } from '../shared-modulos/angular-material.module';
import { ConfiguracoesComponent } from './../../template/configuracoes/configuracoes.component';
import { CnBtnAtualizarComponent } from './btns/cn-btn-atualizar/cn-btn-atualizar.component';
import { CnBtnInativarComponent } from './btns/cn-btn-inativar/cn-btn-inativar.component';
import { CnBtnRegistrarComponent } from './btns/cn-btn-registrar/cn-btn-registrar.component';
import { CnBtnSubmitComponent } from './btns/cn-btn-submit/cn-btn-submit.component';
import { CnCarregandoComponent } from './cn-carregando/cn-carregando.component';
import { ModalCarregandoComponent } from './cn-carregando/modal-carregando/modal-carregando.component';
import { CnCrudComponent } from './cn-crud/cn-crud.component';
import { CnDetalhesComponent } from './cn-detalhes/cn-detalhes.component';
import { CnDrawerComponent } from './cn-drawer/cn-drawer.component';
import { CnDrawerDirective } from './cn-drawer/cn-drawer.directive';
import { CnFormControlMensagemErroComponent } from './cn-form-control-mensagem-erro/cn-form-control-mensagem-erro.component';
import { TestCnFormControlMensagemErroComponent } from './cn-form-control-mensagem-erro/test-cn-form-control-mensagem-erro/test-cn-form-control-mensagem-erro.component';
import { CnFundoParaSobreposicaoComponent } from './cn-fundo-para-sobreposicao/cn-fundo-para-sobreposicao.component';
import { CnListagemCrudComponent } from './cn-listagem-crud/cn-listagem-crud.component';
import { CnPainelTituloComponent } from './cn-painel-titulo/cn-painel-titulo.component';
import { CnPesquisaComponent } from './cn-pesquisa/cn-pesquisa.component';
import { CnSubmenuComponent } from './cn-submenu/cn-submenu.component';
import { CnTabelaComponent } from './cn-tabela/cn-tabela.component';
import { CnComboboxPesquisavelCvaComponent } from './control-value-accessor/cn-combobox-pesquisavel-cva/cn-combobox-pesquisavel-cva.component';
import { CnInputCvaComponent } from './control-value-accessor/cn-input-cva/cn-input-cva.component';
import { CnSubformularioCvaComponent } from './control-value-accessor/cn-subformulario-cva/cn-subformulario-cva.component';
import { CnSubformulariosCvaComponent } from './control-value-accessor/cn-subformularios-cva/cn-subformularios-cva.component';
import { CnFormInativarComponent } from './foms/cn-form-inativar/cn-form-inativar.component';
import { CnFormComponent } from './foms/cn-form/cn-form.component';
import { CnFormModalComponent } from './modais/cn-form-modal/cn-form-modal.component';
import { TestCnFormularioBaseComponent } from './model/test-cn-formulario-base/test-cn-formulario-base.component';
import { CnStepperFormComponent } from './foms/cn-stepper-form/cn-stepper-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { CnBtnCancelarComponent } from './btns/btn-cancelar/cn-btn-cancelar.component';

const declarations = [
  CnCrudComponent,
  CnPesquisaComponent,
  CnPainelTituloComponent,
  CnFormControlMensagemErroComponent,
  CnInputCvaComponent,
  TestCnFormControlMensagemErroComponent,
  TestCnFormularioBaseComponent,
  CnTabelaComponent,
  CnBtnRegistrarComponent,
  CnBtnAtualizarComponent,
  CnBtnInativarComponent,
  CnFormModalComponent,
  CnFormComponent,
  CnBtnSubmitComponent,
  CnCarregandoComponent,
  ModalCarregandoComponent,
  CnFormInativarComponent,
  CnComboboxPesquisavelCvaComponent,
  CnSubformularioCvaComponent,
  CnSubformulariosCvaComponent,
  CnEnderecoCvaComponent,
  CnUploadCvaComponent,
  ConfiguracoesComponent,
  CnSubmenuComponent,
  CnListagemCrudComponent,
  CnDetalhesComponent,
  CnFundoParaSobreposicaoComponent,
  CnDrawerComponent,
  CnDrawerDirective,
  CnStepperFormComponent,
  CnBtnCancelarComponent,
  CnModalHeaderComponent,
  CnSublistagemCrudComponent,
  CnSublistagemCrudDirective,
  CnListagemPersonalizadaDirective,
  CnListagemCrudItemPeronsalizadoComponent,
]
@NgModule({
  declarations: declarations,
  imports: [AngularCoreModule, AngularMaterialModule, RouterModule, NgxMaskModule.forRoot(), NgxDropzoneModule],
  exports: declarations,
  entryComponents: [CnFormModalComponent, ModalCarregandoComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
})
export class CnComponentsModule {}
