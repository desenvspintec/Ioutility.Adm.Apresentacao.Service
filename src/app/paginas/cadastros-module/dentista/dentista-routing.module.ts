import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouterHelper } from './../../../shared/cn-helpers/cn-router-helper';
import { ROTA_COMPLEMENTO, ROTA_MODULO, ROTA_PARAMETRO } from './../../../shared/constants/routes-constant';
import { DentistaContratoComponent } from './dentista-contrato/dentista-contrato.component';
import { DentistaFeriasComponent } from './dentista-ferias/dentista-ferias.component';
import { DentistaFormComponent } from './dentista-form/dentista-form.component';
import { DentistaRegistroFaltasComponent } from './dentista-registro-faltas/dentista-registro-faltas.component';
import { DentistaTermoDistratoComponent } from './dentista-termo-distrato/dentista-termo-distrato.component';
import { DentistaComponent } from './dentista.component';
import { DentistaFolhaPagamentoComponent } from './dentista-folha-pagamento/dentista-folha-pagamento.component';

export const ROTAS_DENTISTA = {
  redirecionamentoIndex: RouterHelper.obterPathRedirecionado({ em: [''], irPara: [ROTA_COMPLEMENTO.indexModulo] }),
  index: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.indexModulo], component: DentistaComponent}),
  registrar: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.registrar], component: DentistaFormComponent}),
  atualizar: RouterHelper.obterPathSimples({em: [ROTA_PARAMETRO.id.valorParaRota, ROTA_COMPLEMENTO.atualizar], component: DentistaFormComponent}),

  contrato: {
    index: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.contrato], component: DentistaContratoComponent}),
  },

  faltas: {
    index: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.registroFalta], component: DentistaRegistroFaltasComponent}),
  },

  distrato: {
    index: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.termoDistrato], component: DentistaTermoDistratoComponent}),
  },

  ferias: {
    index: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.ferias], component: DentistaFeriasComponent}),
  },

  folhaPagamento: {
    index: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.folhaDePagamento], component: DentistaFolhaPagamentoComponent}),
  },
}
const routes: Routes = [
  ROTAS_DENTISTA.redirecionamentoIndex,
  ROTAS_DENTISTA.index,
  ROTAS_DENTISTA.registrar,
  ROTAS_DENTISTA.atualizar,
  ROTAS_DENTISTA.ferias.index,
  ROTAS_DENTISTA.contrato.index,
  ROTAS_DENTISTA.faltas.index,
  ROTAS_DENTISTA.distrato.index,
  ROTAS_DENTISTA.folhaPagamento.index,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DentistaRoutingModule {

  constructor() {
  }
 }
