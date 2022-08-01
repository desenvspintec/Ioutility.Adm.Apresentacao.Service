import { ISublistagemComponent } from './../../interfaces/i-sublistagem-component';
import { AfterViewInit, Component, Input, ViewChild, Type } from '@angular/core';

import { CnSublistagemCrudDirective } from './cn-sublistagem-crud.directive';

@Component({
  selector: 'app-cn-sublistagem-crud',
  templateUrl: './cn-sublistagem-crud.component.html',
  styleUrls: ['./cn-sublistagem-crud.component.scss']
})
export class CnSublistagemCrudComponent implements AfterViewInit {

  @Input() componenteExibir?: Type<ISublistagemComponent>;
  @Input() entityId: string = '';
  constructor() { }
  @ViewChild(CnSublistagemCrudDirective, {static: false}) conteudoSublistagem!: CnSublistagemCrudDirective;

  ngAfterViewInit(): void {
    this.carregar();
  }

  carregar(): void {
    setTimeout(()=>{
      const viewContainerRef = this.conteudoSublistagem.viewContainerRef;
      viewContainerRef.clear();
      const instancia = viewContainerRef.createComponent(this.componenteExibir!).instance;
      instancia.entityId = this.entityId;
      instancia.aoIniciar();
    }, 100);
  }

}
