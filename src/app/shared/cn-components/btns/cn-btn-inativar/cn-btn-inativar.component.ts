import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CnBtnBaseComponent } from '../../model/cn-btn-base-component.model';

@Component({
  selector: 'app-cn-btn-inativar',
  templateUrl: './cn-btn-inativar.component.html',
  styleUrls: ['./cn-btn-inativar.component.css']
})
export class CnBtnInativarComponent extends CnBtnBaseComponent {

  classCss = CSS_CLASS_BTN_INATIVAR;
  constructor(modal: MatDialog) {
    super(modal);
  }


}
export const CSS_CLASS_BTN_INATIVAR = 'btn-inativar';
