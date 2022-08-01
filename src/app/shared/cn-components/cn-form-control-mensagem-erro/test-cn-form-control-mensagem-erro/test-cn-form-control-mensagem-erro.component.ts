import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CnInputCvaModel } from './../../control-value-accessor/models/cn-input-cva.model';

@Component({
  selector: 'app-test-cn-form-control-mensagem-erro',
  templateUrl: './test-cn-form-control-mensagem-erro.component.html'
})
export class TestCnFormControlMensagemErroComponent implements OnInit {

  campo?: CnInputCvaModel;
  form?: FormGroup;
  constructor(private _fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this._fb.group({});
    this.form.addControl(this.campo!!.name, this.campo!!.gerarFormControl(this._fb));
  }

}
