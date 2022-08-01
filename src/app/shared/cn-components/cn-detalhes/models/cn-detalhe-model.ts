import { Observable } from 'rxjs';

import { IEntity } from '../../../models/entity';
import { CnCampoDetalhe } from '../../model/cn-campo-detalhe';
import { CnSessaoGrupoCamposDetalhe } from './cn-sessao-grupo-campos-detalhe';

export class CnBaseDetalheModel
{
  constructor(public buscarPorIdDelegate: (entityId: string) => Observable<IEntity>, public camposCabecalho: CnCampoDetalhe[], public sessoesGrupoCamposDetalhe: CnSessaoGrupoCamposDetalhe[]) { }
}


export class CnDetalheModel extends CnBaseDetalheModel
{
  constructor(public entityId: string, buscarPorIdDelegate: (entityId: string) => Observable<IEntity>, camposCabecalho: CnCampoDetalhe[], sessoesGrupoCamposDetalhe: CnSessaoGrupoCamposDetalhe[]) {
    super(buscarPorIdDelegate, camposCabecalho, sessoesGrupoCamposDetalhe)
  }
}
