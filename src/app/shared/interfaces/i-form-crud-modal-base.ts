import { MatDialogRef } from '@angular/material/dialog';

export interface IFormCrudModalBase<TForm> {
  referenciaModal?: MatDialogRef<any>;
  definirModal(referenciaModal: MatDialogRef<any>): TForm;
}
