import { LINK_ROUTES } from './../../shared/constants/link-routes-constant';
import { MenuService } from './menu.service';
import { Component, OnInit } from '@angular/core';
import { ANIMAR_MENU, ESTADO_MENU } from 'src/app/shared/constants/animacoes.constant';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  animations: ANIMAR_MENU
})
export class MenuLateralComponent implements OnInit {

  linkRotas = LINK_ROUTES;
  get estadoMenu(): string {
    if (this.service.estaAberto)
      return ESTADO_MENU.aberto;
    return ESTADO_MENU.fechado;
  }


  constructor(public service: MenuService) { }

  ngOnInit(): void {
  }

  exibeMenu(): boolean {
    // const estaAutenticado = this.loginService.estaLogado();
    // const menuHabilitado = this.service.exibeMenu();
    // return menuHabilitado && estaAutenticado ;

    return true;
  }

  menuToggle(): void {
    this.service.toggle();
  }

  componentesToggle(): void {
    this.service.toggle();
  }

}
