import { PacienteService } from './../paciente.service';
import { Component } from '@angular/core';
import { CnCrudBaseComponent } from 'src/app/shared/cn-components/model/cn-crud-base-component';

@Component({
  templateUrl: './paciente-pre-cadastro.component.html'
})
export class PacientePreCadastroComponent extends CnCrudBaseComponent {


  constructor(service: PacienteService) {
    super(service);
    service.definirModoPreCadastro();
  }
}
