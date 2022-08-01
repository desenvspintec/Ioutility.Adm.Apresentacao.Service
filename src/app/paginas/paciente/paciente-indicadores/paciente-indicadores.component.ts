import { Component, OnInit } from '@angular/core';

import { ANIMAR_ENTRADA } from './../../../shared/constants/animacoes.constant';
import { PacienteIIndicadoresDTO } from './../paciente.models';
import { PacienteService } from './../paciente.service';

@Component({
  selector: 'app-paciente-indicadores',
  templateUrl: './paciente-indicadores.component.html',
  styleUrls: ['./paciente-indicadores.component.scss'],
  animations: ANIMAR_ENTRADA
})
export class PacienteIndicadoresComponent implements OnInit {

  indicadores?: PacienteIIndicadoresDTO;
  constructor(service: PacienteService) {
    service.buscarIndicadores().subscribe({next: resultado => {
      this.indicadores = resultado;
    }});
  }

  ngOnInit(): void {
  }

}
