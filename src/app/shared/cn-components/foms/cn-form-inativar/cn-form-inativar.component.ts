import { CSS_CLASS_ERRO_VALIDACAO_SUBMIT } from './../cn-form/cn-form.component';
import { IHttpErrorResponse } from './../../../interfaces/i-http-error-response';
import { CnFormInativarModel } from './../../model/cn-form-inativar-model';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EntityBasica } from 'src/app/shared/models/entity-basica';
import { of } from 'rxjs';

@Component({
  selector: 'app-cn-form-inativar',
  templateUrl: './cn-form-inativar.component.html',
  styleUrls: ['./cn-form-inativar.component.css']
})
export class CnFormInativarComponent {

  cssClassTitulo = CSS_CLASS_TITULO_INATIVAR;
  cssClassMensagem = CSS_CLASS_MENSAGEM_INATIVAR;
  cssClassErroValidacao = CSS_CLASS_ERRO_VALIDACAO_SUBMIT;
  errosValidacao: string[] = [];
  @Input() model: CnFormInativarModel;
  submetendo = false;
  constructor(public toastrService: ToastrService) {
    this.model = new CnFormInativarModel('', new EntityBasica('', ''), () => of());
   }


  titulo(): string {
    return 'Inativar ' + this.model.titulo;
  }

  submeter(): void {
    this.submetendo = true;
    this.model.observableSubmeter().subscribe(() => this._onSuccess(), error => this._onError(error));
  }
  private _onSuccess(): void {
    this.submetendo = false;
    this.model.onSubmitSuccess(this.toastrService);
  }
  private _onError(erro: IHttpErrorResponse): void {
    this.submetendo = false;
    this.errosValidacao = this.model.onSubmitError(erro, this.toastrService);
  }
}
export const CSS_CLASS_TITULO_INATIVAR = 'titulo-inativar';
export const CSS_CLASS_MENSAGEM_INATIVAR = 'texto-inativar';
