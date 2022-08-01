import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cnDrawer]'
})
export class CnDrawerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
