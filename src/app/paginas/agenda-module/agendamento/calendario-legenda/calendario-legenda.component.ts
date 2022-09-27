import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario-legenda',
  templateUrl: './calendario-legenda.component.html',
  styleUrls: ['./calendario-legenda.component.scss']
})
export class CalendarioLegendaComponent implements OnInit {

  selected?: Date;
  selected2?: Date;
  constructor() { }

  ngOnInit(): void {
  }

}
