import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { ModalCarregandoComponent, CSS_CLASS_CARREGANDO } from './modal-carregando/modal-carregando.component';

@Component({
  selector: 'app-cn-carregando',
  templateUrl: './cn-carregando.component.html',
  styleUrls: ['./cn-carregando.component.css']
})
export class CnCarregandoComponent implements OnInit, OnDestroy {

  @Input() modal = true;
  @Input() tamanhoNaoModal = 70;
  cssClassCarregand = CSS_CLASS_CARREGANDO;
  referenciaModalAberto?: MatDialogRef<ModalCarregandoComponent>;
  constructor(private gerenciadorModal: MatDialog) { }

  ngOnInit(): void {
    if (this.modal)
      this.referenciaModalAberto = this.gerenciadorModal.open(ModalCarregandoComponent, { disableClose: true });
  }

  ngOnDestroy(): void {
    if (this.modal)
      this.referenciaModalAberto!.close();
  }
}
