import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CadastroFornecedorComponent } from './cadastro-fornecedor/cadastro-fornecedor.component';
import {
  FornecedorAlterarStatusComponent,
} from './cadastro-fornecedor/fornecedor-alterar-status/fornecedor-alterar-status.component';
import { FornecedorIndicadoresComponent } from './fornecedor-indicadores/fornecedor-indicadores.component';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorComponent } from './fornecedor.component';



@NgModule({
  declarations: [
    FornecedorComponent,
    FornecedorIndicadoresComponent,
    FornecedorAlterarStatusComponent,
    CadastroFornecedorComponent,
  ],
  imports: [
    SharedModule,
    FornecedorRoutingModule,
  ]
})
export class FornecedorModule { }
