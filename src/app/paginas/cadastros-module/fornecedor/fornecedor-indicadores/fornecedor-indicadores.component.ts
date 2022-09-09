import { FornecedorService } from './../fornecedor.service';
import { IIndicadoresDTO } from './../fornecedor.models';
import { Component, OnInit } from '@angular/core';
import { ANIMAR_ENTRADA } from 'src/app/shared/constants/animacoes.constant';

@Component({
  selector: 'app-fornecedor-indicadores',
  templateUrl: './fornecedor-indicadores.component.html',
  animations: ANIMAR_ENTRADA
})
export class FornecedorIndicadoresComponent implements OnInit {
  indicadores?: IIndicadoresDTO;
  constructor(service: FornecedorService) {
    service.buscarIndicadores().subscribe({
      next: resultado => {
        this.indicadores = resultado;
        console.log(this.indicadores);
      },
    });
  }

  ngOnInit(): void {}
}
