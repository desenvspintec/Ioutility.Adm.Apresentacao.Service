import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { VALOR_PADRAO_CONFIGURACAO_MODAL } from '../../constants/valores-padroes';
import { CnFormModalComponent } from '../modais/cn-form-modal/cn-form-modal.component';
import { CnBtnModel } from './cn-btn-model';

@Directive()
export class CnBtnBaseComponent implements OnInit {
  @Input() model?: CnBtnModel;
  @Output() modalFechou = new EventEmitter();
  constructor(public modal: MatDialog) {}
  ngOnInit(): void {

  }

  executar(): void {
    if (this.model?.abreModal)
      this.abrirModal();
    else  {
      this.redirecionar();
    }

  }
  abrirModal() {

    const modalAberto = this.modal.open(CnFormModalComponent, {
      maxHeight: VALOR_PADRAO_CONFIGURACAO_MODAL.maxHeight,
      minWidth: VALOR_PADRAO_CONFIGURACAO_MODAL.minWidth,
      maxWidth: VALOR_PADRAO_CONFIGURACAO_MODAL.maxWidth,
      data: this.model?.formModel
    });
    modalAberto.afterClosed().subscribe(finalizou => {
      if (finalizou)
        this.modalFechou.emit();
    });
  }

  redirecionar(): void {

  }
}
