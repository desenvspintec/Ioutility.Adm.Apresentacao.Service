import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ETipoOperacaoCrud } from 'src/app/shared/enums/e-tipo-operacao-crud';

import { CnFormComSubmitBaseComponent } from '../../model/cn-form-com-submit-base-component';
import { FormHelperService } from './../../../services/form-helper.service';

@Component({
  selector: 'app-cn-form',
  templateUrl: './cn-form.component.html',
  styleUrls: ['./cn-form.component.scss'],
})
export class CnFormComponent extends CnFormComSubmitBaseComponent
  implements AfterViewChecked {
  cssIdTitulo = CSS_ID_TITULO_FORM;
  cssClassErroAoCarregarEntityEdicao = CSS_CLASS_ERRO_AO_CARREGAR_ENTITY_EDICAO;
  cssClassErroValidacao = CSS_CLASS_ERRO_VALIDACAO_SUBMIT;
  mensagemErroAoCarregarEntityEditar = MENSAGEM_ERRO_AO_CARREGAR_ENTITY_EDICAO;
  @Output() obterFormularioAoCarregarComponent = new EventEmitter();
  constructor(
    fb: FormBuilder,
    formHelperService: FormHelperService,
    private readonly changeDetectorRef: ChangeDetectorRef
    , toastrService: ToastrService
    , rota: Router
  ) {
    super(fb, formHelperService, toastrService, rota);
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  override ngOnInit() {
    super.ngOnInit();
    this.obterFormularioAoCarregarComponent.emit(this.form);
  }

  ehSubformulario(): boolean {
    return this.model?.tipoOperacaoCrud === ETipoOperacaoCrud.Subformulario;
  }

  voltarIndex(): void {
    if (this.model?.possuiModal) {
      this.model.referenciaModal?.close();
      return;
    }
    this.formHelperService.navegarParaIndex();
  }

}
export const CSS_ID_TITULO_FORM = 'tituloForm';
export const CSS_CLASS_ERRO_VALIDACAO_SUBMIT = 'erros-validacao-submit';
export const CSS_CLASS_ERRO_AO_CARREGAR_ENTITY_EDICAO =
  'erro-carregar-entity-edicao';
export const MENSAGEM_ERRO_AO_CARREGAR_ENTITY_EDICAO =
  ' Não foi possivel carregar os valores para edição, verifique sua conexão com a internet ou contate o suporte SGI';
