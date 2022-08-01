import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-carregando',
  templateUrl: './modal-carregando.component.html',
  styleUrls: ['./modal-carregando.component.css']
})
export class ModalCarregandoComponent implements OnInit {

  cssClass = CSS_CLASS_CARREGANDO;
  constructor() { }

  ngOnInit() {
  }

}
export const CSS_CLASS_CARREGANDO = 'carregando';
