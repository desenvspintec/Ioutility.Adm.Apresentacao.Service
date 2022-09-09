import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';
import { DentistaService } from './../dentista.service';
import { Component, OnInit } from '@angular/core';
import { DentistaIIndicadoresDTO } from '../dentista.model';

@Component({
  selector: 'app-dentista-indicadores',
  templateUrl: './dentista-indicadores.component.html',
  animations: ANIMAR_ENTRADA
})
export class DentistaIndicadoresComponent implements OnInit {

  indicadores?: DentistaIIndicadoresDTO;
  constructor(service: DentistaService) {
    service.buscarIndicadores().subscribe({next: resultado => {
      this.indicadores = resultado;
    }});
  }

  ngOnInit(): void {
  }

}
