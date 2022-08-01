import { IClassComCssStyle } from '../../interfaces/i-class-com-css-style';

export class CnCampoDetalhe implements IClassComCssStyle {
  constructor(public propriedade: string, public label: string, public cssClass?: string) {}

  setarClass(cssClass: string): CnCampoDetalhe {
    this.cssClass = cssClass;
    return this;
  }
}
