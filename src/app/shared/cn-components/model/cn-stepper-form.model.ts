import { CnGrupoCamposFormulario } from './cn-grupo-campos-formulario';
import { FORM_TITULO_GENERICO, NAME_STEPPER_UNICO } from './../../constants/forms-contante';
import { CnStepperFormItemModel } from "./cn-stepper-form-item.model";

export class CnStepperFormModel {
  constructor(public stepperItens: CnStepperFormItemModel[]){}
  static obterStipperUnico(gruposCamposFormulario: CnGrupoCamposFormulario[]): CnStepperFormModel{
    const model = new CnStepperFormModel(
      [new CnStepperFormItemModel(NAME_STEPPER_UNICO, FORM_TITULO_GENERICO, gruposCamposFormulario)]
    );

    return model;
  }
}
