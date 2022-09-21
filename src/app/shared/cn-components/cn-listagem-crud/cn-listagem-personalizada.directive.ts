import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCnListagemPersonalizada]'
})
export class CnListagemPersonalizadaDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
