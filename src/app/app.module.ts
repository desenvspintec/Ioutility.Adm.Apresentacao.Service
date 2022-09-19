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

@NgModule({
  declarations: [
    AppComponent,
    PacientePreCadastroComponent,
    PacientePreCadastroFormComponent,
    CadastroCompletoComponent,
    CadastroCompletoFormComponent,
    MenuLateralComponent,
    PacienteIndicadoresComponent,
    PacienteAlterarStatusComponent
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
