import { CnValidationErro } from './../control-value-accessor/validations/i-cn-validation-erro';
import { CN_VALIDATIONS } from './../control-value-accessor/validations/cn-validations';
import { Component, OnInit, ContentChild, Input, ElementRef, ViewChild } from '@angular/core';
import { FormControlName } from '@angular/forms';

import { CnMensagemErroHelper } from '../../cn-helpers/cn-mensagem-erro-helper';
import { ANIMAR_ENTRADA } from './../../constants/animacoes.constant';

@Component({
  selector: 'app-cn-form-control-mensagem-erro',
  templateUrl: './cn-form-control-mensagem-erro.component.html',
  styleUrls: ['./cn-form-control-mensagem-erro.component.css'],
  animations: ANIMAR_ENTRADA,
})
export class CnFormControlMensagemErroComponent implements OnInit {

  readonly mensagemErro = new CnMensagemErroHelper();
  cssClassMensagemErro = CSS_CLASS_MENSAGEM_ERRO_FORM;
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() formControlNameUtilizado?: string;
  validacaoPersonalizadas = CN_VALIDATIONS.mensagens;


  @ContentChild(FormControlName) control?: FormControlName;
  constructor() { }

  ngOnInit(): void {}

  valido(): boolean {
    let valido = false;
    if (this.control?.valid)
      valido = true;
    return valido;
  }

  mensagemErroValidacao(): string {

    if (!this.control) return '';
    if (this.control.hasError('required')) return this.mensagemErro.required();
    if (this.maxLength && this.control.hasError('maxlength')) return this.mensagemErro.maxLength(this.maxLength);
    if (this.minLength && this.control.hasError('minlength')) return this.mensagemErro.minLength(this.minLength);
    if (this.control.hasError('email')) return this.mensagemErro.email();

    const validacaoPersonalizadaPropertysKeys = Object.keys(this.validacaoPersonalizadas);
    for (let posicao = 0; posicao < validacaoPersonalizadaPropertysKeys.length; posicao++) {
      const validacaoPersonalizadaPropertyKey = validacaoPersonalizadaPropertysKeys[posicao];
      const porpriedade = (this.validacaoPersonalizadas as any)[validacaoPersonalizadaPropertyKey];
      const ehCnValidationErro = porpriedade instanceof CnValidationErro;
      if ( ehCnValidationErro ) {
        const propriedadeValidationErro = porpriedade as CnValidationErro;
        if (this.control?.hasError(propriedadeValidationErro.erro)) return propriedadeValidationErro.mensagem;
      }

    }

    return '';
  }

  podeExibirMensagem(): boolean {
    let sujo = false;
    let tocado = false;

    if (this.control?.dirty) sujo = true;
    if (this.control?.touched) tocado = true;

    return sujo || tocado;
  }


}
export const CSS_CLASS_MENSAGEM_ERRO_FORM = 'mensagem-erro-form-control';
