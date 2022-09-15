import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cn-btn-submit',
  templateUrl: './cn-btn-submit.component.html',
  styleUrls: ['./cn-btn-submit.component.scss']
})
export class CnBtnSubmitComponent implements OnInit {

  @Input() formValido: boolean = true;
  @Input() submetendo: boolean = false;
  @Input() texto = 'Salvar';
  @Input() icone?: string;
  @Input() cssClasses?: string;
  @Output() aoClicar = new EventEmitter();
  cssClassBtn = CSS_CLASS_BTN_SUBMIT;

  constructor() { }

  ngOnInit(): void {
  }


  formHabilitado(): boolean {
    return this.formValido && !this.submetendo;
  }

  submit(): void {
    this.aoClicar.emit();
  }

}
export const CSS_CLASS_BTN_SUBMIT = 'cn-btn-submit';
