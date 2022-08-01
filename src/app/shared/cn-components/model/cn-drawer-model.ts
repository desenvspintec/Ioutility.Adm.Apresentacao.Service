import { IDrawerComponent } from '../../interfaces/i-drawer-compoent';
import { Type } from '@angular/core';
export class CnDrawerModel {
  constructor(public component:  Type<IDrawerComponent>, public model: any){}
}
