import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouterHelper } from '../../../shared/cn-helpers/cn-router-helper';
import { ROTA_COMPLEMENTO, ROTA_MODULO, ROTA_PARAMETRO } from '../../../shared/constants/routes-constant';

import { FranquiaFormComponent } from './franquia-form/franquia-form.component';

import { FranquiaComponent } from './franquia.component';


export const ROTAS_FRANQUIA = {
  redirecionamentoIndex: RouterHelper.obterPathRedirecionado({ em: [''], irPara: [ROTA_COMPLEMENTO.indexModulo] }),
  index: RouterHelper.obterPathSimples({ em: [ROTA_COMPLEMENTO.indexModulo], component: FranquiaComponent }),
  registrar: RouterHelper.obterPathSimples({ em: [ROTA_COMPLEMENTO.registrar], component: FranquiaFormComponent }),
  atualizar: RouterHelper.obterPathSimples({ em: [ROTA_PARAMETRO.id.valorParaRota, ROTA_COMPLEMENTO.atualizar], component: FranquiaFormComponent }),

}
const routes: Routes = [
  ROTAS_FRANQUIA.redirecionamentoIndex,
  ROTAS_FRANQUIA.index,
  ROTAS_FRANQUIA.registrar,
  ROTAS_FRANQUIA.atualizar,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranquiaRoutingModule {

  constructor() {
  }
}
