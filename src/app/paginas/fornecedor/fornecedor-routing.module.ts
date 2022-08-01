import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterHelper } from 'src/app/shared/cn-helpers/cn-router-helper';
import { ROTA_COMPLEMENTO, ROTA_PARAMETRO } from 'src/app/shared/constants/routes-constant';

import { CadastroFornecedorComponent } from './cadastro-fornecedor/cadastro-fornecedor.component';
import { FornecedorComponent } from './fornecedor.component';

const ROTAS = {
  index: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.indexModulo], component: FornecedorComponent}),
  registrar: RouterHelper.obterPathSimples({em: [ROTA_COMPLEMENTO.registrar], component: CadastroFornecedorComponent}),
  atualizar: RouterHelper.obterPathSimples({em: [ROTA_PARAMETRO.id.valorParaRota, ROTA_COMPLEMENTO.atualizar], component: CadastroFornecedorComponent}),
}

const routes: Routes = [
  ROTAS.index,
  ROTAS.registrar,
  ROTAS.atualizar
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule {
  constructor() {

  }
 }
