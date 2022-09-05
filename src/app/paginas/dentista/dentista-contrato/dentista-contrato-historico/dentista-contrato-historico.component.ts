import { IDrawerComponent } from './../../../../shared/interfaces/i-drawer-compoent';
import { IEntityBasica } from 'src/app/shared/models/entity-basica';
import { DentistaContratoService } from './../dentista-contrato.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dentista-contrato-historico',
  templateUrl: './dentista-contrato-historico.component.html',
  styleUrls: ['./dentista-contrato-historico.component.scss']
})
export class DentistaContratoHistoricoComponent implements IDrawerComponent {

  contratos?: IEntityBasica[];
  dentistaId!: string;
  constructor(private _dentistaContratoService: DentistaContratoService) {
  }
  aoIniciar(model: any): void {
    this.dentistaId = model.dentistaId;

    this._dentistaContratoService.buscarPorDentista(this.dentistaId).subscribe({
      next: contratos => this.contratos = contratos
    });
  }

}
