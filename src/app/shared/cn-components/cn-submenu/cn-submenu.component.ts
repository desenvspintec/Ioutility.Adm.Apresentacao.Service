import { CnSubmenu } from './../model/cn-submenu';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cn-submenu',
  templateUrl: './cn-submenu.component.html',
  styleUrls: ['./cn-submenu.component.scss']
})
export class CnSubmenuComponent implements OnInit {

  @Input() submenus: CnSubmenu[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  possuiSubmenu(): boolean {
    return this.submenus.length > 0;
  }
}
