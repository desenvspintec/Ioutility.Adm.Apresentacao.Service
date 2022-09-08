import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CadastroCompletoFormComponent,
} from './paginas/paciente/cadastro-completo/cadastro-completo-form/cadastro-completo-form.component';
import { CadastroCompletoComponent } from './paginas/paciente/cadastro-completo/cadastro-completo.component';
import {
  PacientePreCadastroFormComponent,
} from './paginas/paciente/pre-cadastro/paciente-pre-cadastro-form/paciente-pre-cadastro-form.component';
import { PacientePreCadastroComponent } from './paginas/paciente/pre-cadastro/paciente-pre-cadastro.component';
import { RouterHelper } from './shared/cn-helpers/cn-router-helper';
import { ROTA_COMPLEMENTO, ROTA_MODULO, ROTA_PARAMETRO } from './shared/constants/routes-constant';

// para criar rotas SEGUIR ESTE PADRÃO

export const ROTAS = {
  paciente: {
    preCadastro: {
      redirecionarParaPacientePreCadastro:
        RouterHelper.obterPathRedirecionado({ em: [ROTA_MODULO.paciente], irPara: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.preCadastro, ROTA_COMPLEMENTO.indexModulo] })
      , redirecionamentoIndex: RouterHelper.obterPathRedirecionado({ em: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.preCadastro], irPara: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.preCadastro, ROTA_COMPLEMENTO.indexModulo] })
      , index: RouterHelper.obterPathSimples({ em: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.preCadastro, ROTA_COMPLEMENTO.indexModulo], component: PacientePreCadastroComponent })
      , registrar: RouterHelper.obterPathSimples({ em: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.preCadastro, ROTA_COMPLEMENTO.registrar], component: PacientePreCadastroFormComponent })
      , atualizar: RouterHelper.obterPathSimples({ em: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.preCadastro, ROTA_PARAMETRO.id.valorParaRota, ROTA_COMPLEMENTO.atualizar], component: PacientePreCadastroFormComponent })
    },
    cadastroCompleto: {
       redirecionamentoIndex: RouterHelper.obterPathRedirecionado({ em: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.cadastroCompleto], irPara: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.cadastroCompleto, ROTA_COMPLEMENTO.indexModulo] })
      , index: RouterHelper.obterPathSimples({ em: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.cadastroCompleto, ROTA_COMPLEMENTO.indexModulo], component: CadastroCompletoComponent })
      , registrar: RouterHelper.obterPathSimples({ em: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.cadastroCompleto, ROTA_COMPLEMENTO.registrar], component: CadastroCompletoFormComponent })
      , atualizar: RouterHelper.obterPathSimples({ em: [ROTA_MODULO.paciente, ROTA_COMPLEMENTO.cadastroCompleto, ROTA_PARAMETRO.id.valorParaRota, ROTA_COMPLEMENTO.atualizar], component: CadastroCompletoFormComponent })
    }

  },

  fornecedor: {
    index: RouterHelper.obterPathParaModulo([ROTA_MODULO.fornecedor], () => import('./paginas/fornecedor/fornecedor.module').then(m => m.FornecedorModule)),
  },

  dentistas: {
    index: RouterHelper.obterPathParaModulo([ROTA_MODULO.dentista], () => import('./paginas/dentista/dentista.module').then(m => m.DentistaModule)),
  },

  colaborador: {
    index: RouterHelper.obterPathParaModulo([ROTA_MODULO.colaborador], () => import('./paginas/colaborador/colaborador.module').then(m => m.ColaboradorModule))
  },

}

const routes: Routes = [
  ROTAS.paciente.preCadastro.redirecionarParaPacientePreCadastro,
  ROTAS.paciente.preCadastro.redirecionamentoIndex,

  ROTAS.paciente.preCadastro.index,
  ROTAS.paciente.preCadastro.registrar,
  ROTAS.paciente.preCadastro.atualizar,

  ROTAS.paciente.cadastroCompleto.redirecionamentoIndex,
  ROTAS.paciente.cadastroCompleto.index,
  ROTAS.paciente.cadastroCompleto.registrar,
  ROTAS.paciente.cadastroCompleto.atualizar,

  ROTAS.fornecedor.index,

  ROTAS.dentistas.index,

  ROTAS.colaborador.index,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
    //PARA EXIBIR OS CAMINHOS FORMADOS, BASTA DESCOMENTAR ESTA LINHA
    // console.log(ROTAS);
  }
}
