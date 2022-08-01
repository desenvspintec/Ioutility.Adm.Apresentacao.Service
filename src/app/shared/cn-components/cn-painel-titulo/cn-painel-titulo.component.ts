import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cn-painel-titulo',
  templateUrl: './cn-painel-titulo.component.html',
  styleUrls: ['./cn-painel-titulo.component.scss']
})
export class CnPainelTituloComponent implements OnInit {

  @Input() titulo?: string;
  @Input() icone?: string;
  constructor() { }

  ngOnInit(): void {
  }

}
