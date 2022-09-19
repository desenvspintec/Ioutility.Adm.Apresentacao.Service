import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { SharedModule } from '../../../shared/shared.module';
import { FranquiaAlterarStatusComponent } from './franquia-alterar-status/franquia-alterar-status.component';

import { FranquiaFormComponent } from './franquia-form/franquia-form.component';
import { FranquiaIndicadoresComponent } from './franquia-indicadores/franquia-indicadores.component';

import { FranquiaComponent } from './franquia.component';

import { FranquiaRoutingModule } from './franquia-routing.module';


@NgModule({
  declarations: [
    FranquiaComponent,
    FranquiaIndicadoresComponent,
    FranquiaFormComponent,
    FranquiaAlterarStatusComponent
  ],
  imports: [
    SharedModule,
    FranquiaRoutingModule,
    MatExpansionModule
  ]
})
export class FranquiaModule { }
