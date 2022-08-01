import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CnBtnBaseComponent } from '../../model/cn-btn-base-component.model';

@Component({
  selector: 'app-cn-btn-atualizar',
  templateUrl: './cn-btn-atualizar.component.html',
  styleUrls: ['./cn-btn-atualizar.component.css']
})
export class CnBtnAtualizarComponent extends CnBtnBaseComponent {

  cssClass = CSS_CLASS_BTN_ATUALIZAR;
  constructor(modal: MatDialog) {
    super(modal);
   }

}
export const CSS_CLASS_BTN_ATUALIZAR = 'btn-atualizar';
