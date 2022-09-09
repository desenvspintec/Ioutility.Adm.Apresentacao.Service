import { DentistaFeriasService } from './../dentista-ferias.service';
import { Component, OnInit } from '@angular/core';
import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';
import { DentistaFeriasIIndicadoresDTO } from '../../dentista.model';

@Component({
  selector: 'app-dentista-ferias-indicadores',
  templateUrl: './dentista-ferias-indicadores.component.html',
  animations: ANIMAR_ENTRADA
})
export class DentistaFeriasIndicadoresComponent implements OnInit {

  indicadores?: DentistaFeriasIIndicadoresDTO;
  constructor(service: DentistaFeriasService) { 
    service.buscarIndicadores().subscribe({next: resultado => {
      this.indicadores = resultado;
    }})
  }

  ngOnInit(): void {
  }

}
