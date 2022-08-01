import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [

    // necessario para o menu
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,

    // formularios
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
    MatStepperModule,
    // outros
    MatButtonModule,
    MatDialogModule
  ],
})
export class AngularMaterialModule { }
