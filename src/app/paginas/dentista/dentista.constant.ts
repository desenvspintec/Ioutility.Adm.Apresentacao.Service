import { LINK_ROUTES } from './../../shared/constants/link-routes-constant';
import { CnSubmenu } from 'src/app/shared/cn-components/model/cn-submenu';

export const IDENTIFICADOR_DE_PESQUISA_DENTISTA = 'dentista';

export const ITENS_DENTISTA_SUBMENU = [
    new CnSubmenu(LINK_ROUTES.dentista.inicio, 'Início'),
    new CnSubmenu(LINK_ROUTES.dentista.folhaPagamento, 'Folha de pagamento'),
    new CnSubmenu(LINK_ROUTES.dentista.contrato, 'Contrato'),
    new CnSubmenu(LINK_ROUTES.dentista.registroFaltas, 'Registro de faltas'),
    new CnSubmenu(LINK_ROUTES.dentista.termoDistrato, 'Termo de distrato'),
    new CnSubmenu(LINK_ROUTES.dentista.ferias, 'Férias'),
]
