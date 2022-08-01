import { CnDrawerModel } from './../model/cn-drawer-model';
import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { ANIMAR_ENTRADA } from './../../constants/animacoes.constant';
import { CnDrawerDirective } from './cn-drawer.directive';
import { CnDrawerService } from './cn-drawer.service';

@Component({
  selector: 'app-cn-drawer',
  templateUrl: './cn-drawer.component.html',
  styleUrls: ['./cn-drawer.component.scss'],
  animations: ANIMAR_ENTRADA,
})
export class CnDrawerComponent implements  AfterViewInit {
  constructor(public service: CnDrawerService) {}
  @ViewChild(CnDrawerDirective, { static: false }) conteudoDrawer!: CnDrawerDirective;


  ngAfterViewInit(): void {
    this.service.observable.subscribe((model: CnDrawerModel) => this.carregar(model));
  }

  carregar(model: CnDrawerModel): void {
    setTimeout(() => {
      const viewContainerRef = this.conteudoDrawer.viewContainerRef;
      viewContainerRef.clear();
      const instancia = viewContainerRef.createComponent(model.component).instance;
      instancia.aoIniciar(model.model);
    }, 100);
  }
}
