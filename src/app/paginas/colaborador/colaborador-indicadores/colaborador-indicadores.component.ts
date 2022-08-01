import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';
import { CnDrawerService } from './../../../shared/cn-components/cn-drawer/cn-drawer.service';
import { ColaboradorService } from './../colaborador.service';
import { ColaboradorIIndicadoresDTO } from './../colaborador.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colaborador-indicadores',
  templateUrl: './colaborador-indicadores.component.html',
  animations: ANIMAR_ENTRADA
})
export class ColaboradorIndicadoresComponent implements OnInit {

  indicadores?: ColaboradorIIndicadoresDTO;
  constructor(service: ColaboradorService, drawerService: CnDrawerService) {
    service.buscarIndicadores().subscribe({next: resultado => {
      this.indicadores = resultado;
    }});
    drawerService.abrir
   }

  ngOnInit(): void {
  }

}
