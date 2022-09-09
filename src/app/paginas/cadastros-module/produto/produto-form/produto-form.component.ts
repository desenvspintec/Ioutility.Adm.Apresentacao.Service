import { ProdutoService } from './../produto.service';
import { Component, OnInit } from '@angular/core';
import { CnStepperFormBaseComponent } from 'src/app/shared/cn-components/model/cn-stepper-form-base-component';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html'

})
export class ProdutoFormComponent extends CnStepperFormBaseComponent {

  constructor(service: ProdutoService) {
    super(service);
  }

}
