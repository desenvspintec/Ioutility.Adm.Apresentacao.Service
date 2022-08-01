import { NgModule, ModuleWithProviders } from '@angular/core';

import { AngularMaterialModule } from './shared-modulos/angular-material.module';
import { AngularCoreModule } from './shared-modulos/angular-core.module';
import { AppServices } from './shared-modulos/shared-services/app-services';
import { PacotesExternosModule } from './shared-modulos/pacotes-externos.module';
import { CnComponentsModule } from './cn-components/cn-components.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CnComponentsModule,
    PacotesExternosModule
  ],
  exports: [
    AngularMaterialModule,
    CnComponentsModule,
    AngularCoreModule,
    PacotesExternosModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule
      , providers: [
        AppServices.obterTodos()
      ]
    };
  }
}
