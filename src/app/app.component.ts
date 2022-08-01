import { ChangeDetectorRef, Component } from '@angular/core';
import { ANIMAR_MENU, ESTADO_MENU } from 'src/app/shared/constants/animacoes.constant';

import { CnCarregandoService } from './shared/cn-components/cn-carregando/cn-carregando.service';
import { DisplayNameService } from './shared/services/display-name.service';
import { MenuService } from './template/menu-lateral/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: ANIMAR_MENU
})
export class AppComponent {
  title = 'loutility-cadastro-web-client';
  estaCarregando: boolean = false;

  get estadoConteudo(): string {
    if (this.menuService.estaAberto)
      return ESTADO_MENU.aberto;

    return ESTADO_MENU.fechado;
  }

  constructor(public displayNameService: DisplayNameService, public carregandoService: CnCarregandoService, public menuService: MenuService, cdr: ChangeDetectorRef) {
    
    carregandoService.carregandoStatus.subscribe({
      next: response => {
        this.estaCarregando = response;
        cdr.detectChanges();
      }
    });

  }

  menuToggle(): void {
    this.menuService.toggle();
  }


}
