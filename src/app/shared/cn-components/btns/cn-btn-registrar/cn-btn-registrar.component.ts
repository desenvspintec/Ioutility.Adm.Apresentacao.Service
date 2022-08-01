import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CnBtnBaseComponent } from '../../model/cn-btn-base-component.model';
import { RouterHelper } from './../../../cn-helpers/cn-router-helper';
import { ROTA_COMPLEMENTO } from './../../../constants/routes-constant';

@Component({
  selector: 'app-cn-btn-registrar',
  templateUrl: './cn-btn-registrar.component.html'
})
export class CnBtnRegistrarComponent  extends CnBtnBaseComponent {

  class = CSS_CLASS_BTN_REGISTRAR;
  constructor(modal: MatDialog, private router: Router) {
    super(modal);
  }

  override redirecionar(): void {
      this.router.navigateByUrl(RouterHelper.formarRota([this.router.url, ROTA_COMPLEMENTO.registrar]))
  }
}
export const CSS_CLASS_BTN_REGISTRAR = 'btn-registrar';

