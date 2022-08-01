import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CnFormBaseModel } from './../cn-components/model/cn-form-base-model';
import { IHttpErrorResponse } from './../interfaces/i-http-error-response';

@Injectable({
  providedIn: 'root'
})

export class FormHelperService {
  submetendo = false;
  errosValidacao?: string[] = [];
  models: CnFormBaseModel[] = [];
  forms: FormGroup[] = [];
  private dependenciasValidasDelegate: () => boolean = () => true;

  constructor(public toastrService: ToastrService,  private router: Router){}
  setarDadosDeInicializacao(model: CnFormBaseModel, dependenciasValidasDelegate?: () => boolean) {
    this.models.push(model!);
    if (dependenciasValidasDelegate)
      this.dependenciasValidasDelegate = dependenciasValidasDelegate;
  }

  formValido(): boolean {
    if (!this.dependenciasValidasDelegate()) return false;
    return true;
  }

   onSuccess(): void {
    this.submetendo = false;
    this._obterModelPrincipal().onSubmitSuccess(this.toastrService, this.router);
  }
  private _obterModelPrincipal(): CnFormBaseModel {
    return this.models[0];
  }

  onError(erro: IHttpErrorResponse): void {
    this.submetendo = false;
    this.errosValidacao = this._obterModelPrincipal()!.onSubmitError(erro, this.toastrService);
  }

  navegarParaIndex(): void {
    this._obterModelPrincipal()?.navegarParaIndex(this.router);
  }
}
