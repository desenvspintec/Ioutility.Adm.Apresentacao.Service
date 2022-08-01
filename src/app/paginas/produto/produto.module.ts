import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProdutoComponent,
    ProdutoFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProdutoRoutingModule
  ]
})
export class ProdutoModule { }
