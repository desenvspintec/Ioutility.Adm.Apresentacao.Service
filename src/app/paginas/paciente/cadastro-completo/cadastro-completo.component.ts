import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';
import { DisplayNameService } from './../../../shared/services/display-name.service';
import { PacienteService } from './../paciente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './cadastro-completo.component.html'
})
export class CadastroCompletoComponent extends CnCrudBaseComponent {

  constructor(service: PacienteService) {
    super(service);
    service.definirModoCadastroCompleto();
  }

}
