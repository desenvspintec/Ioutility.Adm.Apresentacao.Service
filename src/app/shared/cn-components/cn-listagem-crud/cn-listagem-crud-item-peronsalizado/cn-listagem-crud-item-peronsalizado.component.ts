import { CnListagemExibicaoModel } from 'src/app/shared/cn-components/model/cn-listagem-exibicao-model';
import { CnListagemPersonalizadaDirective } from './../cn-listagem-personalizada.directive';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'cn-listagem-crud-item-peronsalizado',
  templateUrl: './cn-listagem-crud-item-peronsalizado.component.html',
  styleUrls: ['./cn-listagem-crud-item-peronsalizado.component.scss'],
})
export class CnListagemCrudItemPeronsalizadoComponent
  implements OnInit, AfterViewInit
{
  @Input() model!: CnListagemExibicaoModel;
  @Input() item!: any;

  constructor() {}

  @ViewChild(CnListagemPersonalizadaDirective, { static: false })
  componenteListagemPersonalizada!: CnListagemPersonalizadaDirective;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.definirExibicaoDeListagemPersonalizada();
  }

  private definirExibicaoDeListagemPersonalizada() {
    setTimeout(() => {
      const viewContainerRef = this.componenteListagemPersonalizada.viewContainerRef;
      viewContainerRef.clear();
      const instancia = viewContainerRef.createComponent(this.model.componenteExibicaoPersonalizado!).instance;
      instancia.aoIniciar(this.model, this.item);
    }, 100);
  }
}
