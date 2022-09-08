import { Component } from '@angular/core';
import { IEntityBasica } from 'src/app/shared/models/entity-basica';

import { IDrawerComponent } from '../../../../../shared/interfaces/i-drawer-compoent';
import { DentistaTermoDistratoService } from '../dentista-termo-distrato.service';

@Component({
  selector: 'app-dentista-termo-distrato-historico',
  templateUrl: './dentista-termo-distrato-historico.component.html',
  styleUrls: ['./dentista-termo-distrato-historico.component.scss']
})
export class DentistaTermoDistratoHistoricoComponent implements IDrawerComponent {

  distratos?: IEntityBasica[];
  dentistaId!: string;
  constructor(private _dentistaTermoDistratoService: DentistaTermoDistratoService) { }

  aoIniciar(model: any): void {
    this.dentistaId = model.dentistaId;
    this._dentistaTermoDistratoService.buscarPorDentista(this.dentistaId).subscribe({
      next: termosDistratos => this.distratos = termosDistratos
    });
  }

}
