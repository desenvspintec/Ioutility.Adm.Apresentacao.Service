import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
      maxHeight: '600px',
      minWidth: '150px',
      maxWidth: '1024px',
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
