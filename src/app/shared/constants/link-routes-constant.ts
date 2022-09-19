import { ROTA_MODULO, ROTA_COMPLEMENTO } from 'src/app/shared/constants/routes-constant';
import { RouterHelper } from 'src/app/shared/cn-helpers/cn-router-helper';
export const LINK_ROUTES = {
  paciente: {
    preCadastro: RouterHelper.formarRota([ROTA_MODULO.paciente, ROTA_COMPLEMENTO.preCadastro, ROTA_COMPLEMENTO.indexModulo], true),
    cadastroCompleto: RouterHelper.formarRota([ROTA_MODULO.paciente, ROTA_COMPLEMENTO.cadastroCompleto, ROTA_COMPLEMENTO.indexModulo], true)
  },
  colaborador: {
    inicio: RouterHelper.formarRota([ROTA_MODULO.colaborador, ROTA_COMPLEMENTO.indexModulo], true)
  },
  dentista: {
    inicio: RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.indexModulo], true),
    folhaPagamento: RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.folhaDePagamento], true),
    contrato: RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.contrato], true),
    registroFaltas: RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.registroFalta], true),
    termoDistrato: RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.termoDistrato], true),
    ferias: RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.ferias], true),
  },
  fornecedor: {
    inicio: RouterHelper.formarRota([ROTA_MODULO.fornecedor, ROTA_COMPLEMENTO.indexModulo], true)
  },
  franquia: {
    inicio: RouterHelper.formarRota([ROTA_MODULO.franquia, ROTA_COMPLEMENTO.indexModulo], true),
    preCadastro: RouterHelper.formarRota([ROTA_MODULO.paciente, ROTA_COMPLEMENTO.preCadastro, ROTA_COMPLEMENTO.indexModulo], true),
    cadastroCompleto: RouterHelper.formarRota([ROTA_MODULO.paciente, ROTA_COMPLEMENTO.cadastroCompleto, ROTA_COMPLEMENTO.indexModulo], true)
  },

  franquia: {
    tipoProcedimento: {
      inicio: RouterHelper.formarRota([ROTA_MODULO.franquia, ROTA_MODULO.tipoProcedimento, ROTA_COMPLEMENTO.indexModulo])
    },
    procedimento: {
      inicio: RouterHelper.formarRota([ROTA_MODULO.franquia, ROTA_MODULO.procedimento, ROTA_COMPLEMENTO.indexModulo])
    }
  }

}
