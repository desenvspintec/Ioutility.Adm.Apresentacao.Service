import { Directive, OnInit } from '@angular/core';

import { IComponentService } from '../../interfaces/i-component-service';
import { CnCrudModel } from './cn-crud-model';

@Directive()
export abstract class CnCrudBaseComponent implements OnInit {

  model!: CnCrudModel;

  constructor(public service: IComponentService) {
  }

  ngOnInit(): void {
    this.model = this.service.gerarModelComponent();

  }
}
