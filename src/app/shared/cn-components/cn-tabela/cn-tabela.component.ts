import { Component, OnInit } from '@angular/core';
import { ANIMAR_ENTRADA } from './../../constants/animacoes.constant';

@Component({
  selector: 'app-cn-tabela',
  templateUrl: './cn-tabela.component.html',
  animations: ANIMAR_ENTRADA
})
export class CnTabelaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
