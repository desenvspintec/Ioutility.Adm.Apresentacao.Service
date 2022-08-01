import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ROTA_COMPLEMENTO, ROTA_PARAMETRO } from './../../shared/constants/routes-constant';
import { RouterHelper } from 'src/app/shared/cn-helpers/cn-router-helper';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './produto.component';

export const ROTAS = {
  index: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.indexModulo], component: ProdutoComponent}),
  registrar: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.registrar], component: ProdutoFormComponent}),
  atualizar: RouterHelper.obterPathSimples({em: [ROTA_PARAMETRO.id.valorParaRota, ROTA_COMPLEMENTO.atualizar], component: ProdutoFormComponent})
}
const routes: Routes = [
  ROTAS.index,
  ROTAS.registrar,
  ROTAS.atualizar
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
