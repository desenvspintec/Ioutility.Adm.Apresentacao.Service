import { IClassComCssStyle } from '../../../interfaces/i-class-com-css-style';
import { CnCampoDetalhe } from '../../model/cn-campo-detalhe';

export class CnGrupoCampoDetalhe implements IClassComCssStyle {
  constructor(public titulo: String, public ehLista: boolean, public campos: CnCampoDetalhe[], public cssClass?: string, public nomePropriedadeRepetir?: string ){}
  static obterComoEntityUnica(titulo: String, campos: CnCampoDetalhe[], cssClass?: string): CnGrupoCampoDetalhe{
    return new CnGrupoCampoDetalhe(titulo, false, campos, cssClass);
  }
  static obterComoEntityLista(titulo: String, nomePropriedadeRepetir: string, campos: CnCampoDetalhe[], cssClass?: string): CnGrupoCampoDetalhe{
    return new CnGrupoCampoDetalhe(titulo, true, campos, cssClass, nomePropriedadeRepetir);
  }
}
