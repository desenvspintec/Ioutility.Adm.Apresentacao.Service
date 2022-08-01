import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { Component, OnInit, forwardRef } from '@angular/core';
import { CnControlValueAccessorBaseConponent } from '../../model/cn-control-value-acessor-base-component.model';

@Component({
  selector: 'app-combobox-multi-select-cva',
  templateUrl: './combobox-multi-select-cva.component.html',
  styleUrls: ['./combobox-multi-select-cva.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxMultiSelectCvaComponent),
      multi: true
    }
  ]
})
export class ComboboxMultiSelectCvaComponent extends CnControlValueAccessorBaseConponent {

  constructor(fb: FormBuilder) {
    super(fb);
  }

  protected definirComoExportarValor(): void {
    throw new Error('Method not implemented.');
  }
  protected adequarValorImportado(valor: any): void {
    throw new Error('Method not implemented.');
  }
  protected addControlsNoFormulario(): void {
    throw new Error('Method not implemented.');
  }

}
