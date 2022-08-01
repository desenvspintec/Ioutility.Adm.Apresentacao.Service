import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCnSublistagemCrud]'
})
export class CnSublistagemCrudDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
