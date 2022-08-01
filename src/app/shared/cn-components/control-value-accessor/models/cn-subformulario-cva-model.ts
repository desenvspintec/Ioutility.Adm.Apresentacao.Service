import { CnControlValueAccessorModelBase } from '../../model/cn-control-value-accessor-model-base.model';
import { CnGrupoCamposFormulario } from './../../model/cn-grupo-campos-formulario';

export class CnSubformularioInputCva extends CnControlValueAccessorModelBase  {
  constructor( name: string, label: string, required: boolean, public grupoCampos: CnGrupoCamposFormulario[],public exibeMoldura: boolean) {
    super(name, label, required);
  }
}
