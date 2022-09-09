import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CadastroColaboradorComponent } from './cadastro-colaborador/cadastro-colaborador.component';
import { ColaboradorComponent } from './colaborador.component';
import { ColaboradorAlterarStatusComponent } from './colaborador-alterar-status/colaborador-alterar-status.component';
import { ColaboradorIndicadoresComponent } from './colaborador-indicadores/colaborador-indicadores.component';
import { ColaboradorRoutingModule } from './colaborador-routing.module';

@NgModule({
  declarations: [
    ColaboradorComponent,
    CadastroColaboradorComponent,
    ColaboradorAlterarStatusComponent,
    ColaboradorIndicadoresComponent,
  ],
  imports: [
    SharedModule,
    ColaboradorRoutingModule
  ]
})
export class ColaboradorModule { }
