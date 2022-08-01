import { ETipoUpload } from './cv-enums-input-cva';
import { CnControlValueAccessorModelBase } from "../../model/cn-control-value-accessor-model-base.model";

export class CnUploadInputCva extends CnControlValueAccessorModelBase{
    constructor(name: string, label: string, required: boolean, public tipoUpload: ETipoUpload){
        super(name, label, required);
    }
}
