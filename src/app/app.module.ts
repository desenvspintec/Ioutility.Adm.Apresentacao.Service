import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  CadastroCompletoFormComponent,
} from './paginas/cadastros-module/paciente/cadastro-completo/cadastro-completo-form/cadastro-completo-form.component';
import { CadastroCompletoComponent } from './paginas/cadastros-module/paciente/cadastro-completo/cadastro-completo.component';
import {
  PacienteAlterarStatusComponent,
} from './paginas/cadastros-module/paciente/cadastro-completo/paciente-alterar-status/paciente-alterar-status.component';
import { PacienteIndicadoresComponent } from './paginas/cadastros-module/paciente/paciente-indicadores/paciente-indicadores.component';
import {
  PacientePreCadastroFormComponent,
} from './paginas/cadastros-module/paciente/pre-cadastro/paciente-pre-cadastro-form/paciente-pre-cadastro-form.component';
import { PacientePreCadastroComponent } from './paginas/cadastros-module/paciente/pre-cadastro/paciente-pre-cadastro.component';

import { SharedModule } from './shared/shared.module';
import { MenuLateralComponent } from './template/menu-lateral/menu-lateral.component';
import { TipoProcedimentoComponent } from './paginas/cadastros-module/tipo-procedimento/tipo-procedimento.component';
import { TipoProcedimentoFormComponent } from './paginas/cadastros-module/tipo-procedimento/tipo-procedimento-form/tipo-procedimento-form.component';
import { ProcedimentoComponent } from './paginas/cadastros-module/procedimento/procedimento.component';
import { ProcedimentoFormComponent } from './paginas/cadastros-module/procedimento/procedimento-form/procedimento-form.component';

import { FranquiaComponent } from './paginas/franquias-module/franquia/franquia.component';
import { FranquiaFormComponent } from './paginas/franquias-module/franquia/franquia-form/franquia-form.component';
import { TesteproComponent } from './paginas/cadastros-module/procedimento/testepro/testepro.component';
@NgModule({
  declarations: [
    AppComponent,
    PacientePreCadastroComponent,
    PacientePreCadastroFormComponent,
    CadastroCompletoComponent,
    CadastroCompletoFormComponent,
    MenuLateralComponent,
    PacienteIndicadoresComponent,
    PacienteAlterarStatusComponent,
    TipoProcedimentoComponent,
    TipoProcedimentoFormComponent,
    ProcedimentoComponent,
    ProcedimentoFormComponent,
    FranquiaComponent,
    FranquiaFormComponent,
    TesteproComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxDropzoneModule,
    SharedModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
