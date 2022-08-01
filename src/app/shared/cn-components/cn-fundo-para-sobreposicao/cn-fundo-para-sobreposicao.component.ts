import { CnFundoParaSobreposicaoService } from './cn-fundo-para-sobreposicao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-fundo-para-sobreposicao',
  templateUrl: './cn-fundo-para-sobreposicao.component.html',
  styleUrls: ['./cn-fundo-para-sobreposicao.component.scss']
})
export class CnFundoParaSobreposicaoComponent implements OnInit {

  constructor(public service: CnFundoParaSobreposicaoService) { }

  ngOnInit(): void {
  }

}
