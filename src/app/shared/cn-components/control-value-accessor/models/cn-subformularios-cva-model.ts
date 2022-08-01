import { CnGrupoCamposFormulario } from 'src/app/shared/cn-components/model/cn-grupo-campos-formulario';
import { CnControlValueAccessorModelBase } from "../../model/cn-control-value-accessor-model-base.model";

export class CnSubformulariosInputCva extends CnControlValueAccessorModelBase  {
  constructor( name: string, label: string, required: boolean, public exibeContorno: boolean, public exibeTitulo: boolean, public grupoCampos: CnGrupoCamposFormulario[]) {
    super(name, label, required);
    for (const grupoCampo of grupoCampos) {
      for (const campo of grupoCampo.campos) {
          campo.setNameFormularioPai(name);
      }
    }
  }
}
