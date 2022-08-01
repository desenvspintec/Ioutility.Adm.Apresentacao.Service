import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Entity } from '../../models/entity';

export abstract class CnControlValueAccessorModelBase {
  observableSubmitDelegate(entitySubmit: Entity) {
    throw new Error('Method not implemented.');
  }
  onSubmitSuccess(toastrService: any) {
    throw new Error('Method not implemented.');
  }
  name: string;
  label: string;
  required: boolean;
  placeholder: string;
  valorPadrao: any;
  possuiValorPadrao = false;
  referenciaModal: any;
  get cssId(): string { return "cn-control-" + this.name};
  private formControl?: FormControl;
  private formGroup?: FormGroup;
  private _nameFormularioPai?: string;
  get nameId(): string {
    let name = '';
    if (this._nameFormularioPai)
      name += this._nameFormularioPai + '-';
    name += this.name;

    return name;
  }

  constructor(name: string, label: string, required: boolean, placeholder = '') {
    this.name = name;
    this.label = label;
    this.required = required;
    this.placeholder = placeholder;
  }

  obterNameComoCssId(): string {
    return '#' + this.name;
  }
  setNameFormularioPai(name: string): void {
    this._nameFormularioPai = name;
  }
  setFormGroup(formGroup: FormGroup): void {
    this.formGroup = formGroup;
  }

  formularioValido(): boolean {
    return (this.formGroup as FormGroup).valid;
  }

  obterValorDoFormulario(): object {
    return (this.formGroup as FormGroup).value;
  }

  gerarFormControl(formBuilder: FormBuilder, valorPadrao?: any): AbstractControl {
    if (valorPadrao === undefined) valorPadrao = '';

    this.formControl = formBuilder.control(valorPadrao, this.obterValidadoresDoControlPrincipal());
    return this.formControl;
  }

  obterFormControl = (): FormControl => {
    return this.formControl as FormControl;
  }

  obterValidadoresDoControlPrincipal(): any[] {
    return [Validators.required];
  }
  setarValorPadrao(valor: any): void {
    this.possuiValorPadrao = true;
    this.valorPadrao = valor;
  }

}
