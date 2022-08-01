import { Component, OnInit } from '@angular/core';
import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';

import { DentistaIFolhaPagamentoIndicadoresDTO } from '../../dentista.model';

@Component({
  selector: 'app-folha-pagamento-indicadores',
  templateUrl: './folha-pagamento-indicadores.component.html',
  animations: ANIMAR_ENTRADA
})
export class FolhaPagamentoIndicadoresComponent implements OnInit {

  indicadores?: DentistaIFolhaPagamentoIndicadoresDTO = {valorPagar: 106, comparativoMesPassado: 106};
  constructor() {
   }

  ngOnInit(): void {
  }

}
