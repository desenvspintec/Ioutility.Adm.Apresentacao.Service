import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterHelper } from 'src/app/shared/cn-helpers/cn-router-helper';

import { ROTA_COMPLEMENTO, ROTA_PARAMETRO } from './../../../shared/constants/routes-constant';
import { CadastroColaboradorComponent } from './cadastro-colaborador/cadastro-colaborador.component';
import { ColaboradorComponent } from './colaborador.component';

export const ROTAS = {
  redirecionamentoIndex: RouterHelper.obterPathRedirecionado({ em: [''], irPara: [ROTA_COMPLEMENTO.indexModulo] }),
  index: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.indexModulo], component: ColaboradorComponent}),
  registrar: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.registrar], component: CadastroColaboradorComponent}),
  atualizar: RouterHelper.obterPathSimples({em: [ROTA_PARAMETRO.id.valorParaRota, ROTA_COMPLEMENTO.atualizar], component: CadastroColaboradorComponent})
}
const routes: Routes = [
  ROTAS.redirecionamentoIndex,
  ROTAS.index,
  ROTAS.registrar,
  ROTAS.atualizar
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradorRoutingModule {
  constructor() {
  }
 }
