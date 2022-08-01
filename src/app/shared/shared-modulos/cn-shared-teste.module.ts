import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AppServices } from './shared-services/app-services';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
  ],
  imports: [

  ],
  exports: [
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule
  ]
})
export class CnSharedTestModule {
  static forRoot(): ModuleWithProviders<CnSharedTestModule> {
    return {
      ngModule: SharedModule
      , providers: [
        { provide: MAT_DIALOG_DATA, useValue:  {}},
        {provide: MatDialogRef, useValue: {close: (valor?: any) => {}} },
        AppServices.obterTodos()
      ]
    };
  }
}
