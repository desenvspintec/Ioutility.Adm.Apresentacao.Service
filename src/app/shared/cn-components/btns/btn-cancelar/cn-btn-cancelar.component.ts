import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-btn-cancelar',
  templateUrl: './cn-btn-cancelar.component.html',
  styleUrls: ['./cn-btn-cancelar.component.scss']
})
export class CnBtnCancelarComponent implements OnInit {

  @Input() texto =  'Cancelar';
  @Input() icone?: string;
  constructor() { }

  ngOnInit(): void {
  }

}
