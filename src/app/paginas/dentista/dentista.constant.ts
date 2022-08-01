import { CnSubmenu } from 'src/app/shared/cn-components/model/cn-submenu';
import { RouterHelper } from 'src/app/shared/cn-helpers/cn-router-helper';
import { ROTA_COMPLEMENTO, ROTA_MODULO } from 'src/app/shared/constants/routes-constant';

export const MODO_CADASTRO_DENTISTA = {
    folhaDePagamento: 'folha-de-pagamento',
}

export const ITENS_DENTISTA_SUBMENU = [
    new CnSubmenu('/' + RouterHelper.formarRota([ROTA_MODULO.dentista]), 'Início'),
    new CnSubmenu('/' + RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.folhaDePagamento]), 'Folha de pagamento'),
    new CnSubmenu('/' + RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.contrato]), 'Contrato'),
    new CnSubmenu('/' + RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.registroFalta]), 'Registro de faltas'),
    new CnSubmenu('/' + RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.termoDistrato]), 'Termo de distrato'),
    new CnSubmenu('/' + RouterHelper.formarRota([ROTA_MODULO.dentista, ROTA_COMPLEMENTO.ferias]), 'Férias'),
]