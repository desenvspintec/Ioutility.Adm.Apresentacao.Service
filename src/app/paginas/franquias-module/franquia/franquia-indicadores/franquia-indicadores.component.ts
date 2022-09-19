import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';
import { FranquiaService } from './../franquia.service';
import { Component, OnInit } from '@angular/core';
import { FranquiaIIndicadoresDTO } from '../franquia.model';

@Component({
  selector: 'app-franquia-indicadores',
  templateUrl: './franquia-indicadores.component.html',
  animations: ANIMAR_ENTRADA
})
export class FranquiaIndicadoresComponent implements OnInit {

  indicadores?: FranquiaIIndicadoresDTO;
  constructor(service: FranquiaService) {
    service.buscarIndicadores().subscribe({
      next: resultado => {
        this.indicadores = resultado;
      }
    });
  }

  ngOnInit(): void {
  }

}
