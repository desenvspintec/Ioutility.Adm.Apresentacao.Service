import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { SharedModule } from './../../../shared/shared.module';
import { DentistaAlterarStatusComponent } from './dentista-alterar-status/dentista-alterar-status.component';
import { ContratoEmailFormComponent } from './dentista-contrato/contrato-email-form/contrato-email-form.component';
import { DentistaContratoComponent } from './dentista-contrato/dentista-contrato.component';
import { DentistaFeriasFormComponent } from './dentista-ferias/dentista-ferias-form/dentista-ferias-form.component';
import {
  DentistaFeriasIndicadoresComponent,
} from './dentista-ferias/dentista-ferias-indicadores/dentista-ferias-indicadores.component';
import { DentistaFeriasComponent } from './dentista-ferias/dentista-ferias.component';
import { FeriasAlterarStatusComponent } from './dentista-ferias/ferias-alterar-status/ferias-alterar-status.component';
import { DentistaFolhaPagamentoComponent } from './dentista-folha-pagamento/dentista-folha-pagamento.component';
import {
  FolhaPagamentoIndicadoresComponent,
} from './dentista-folha-pagamento/folha-pagamento-indicadores/folha-pagamento-indicadores.component';
import {
  FolhaPagamentoPacientesComponent,
} from './dentista-folha-pagamento/folha-pagamento-pacientes/folha-pagamento-pacientes.component';
import { DentistaFormComponent } from './dentista-form/dentista-form.component';
import { DentistaIndicadoresComponent } from './dentista-indicadores/dentista-indicadores.component';
import { AdicionarFaltaFormComponent } from './dentista-registro-faltas/adicionar-falta-form/adicionar-falta-form.component';
import {
  DentistaDetalhesFaltaComponent,
} from './dentista-registro-faltas/dentista-detalhes-falta/dentista-detalhes-falta.component';
import { DentistaRegistroFaltasComponent } from './dentista-registro-faltas/dentista-registro-faltas.component';
import { DentistaRoutingModule } from './dentista-routing.module';
import { DentistaTermoDistratoComponent } from './dentista-termo-distrato/dentista-termo-distrato.component';
import {
  TermoDistratoEmailFormComponent,
} from './dentista-termo-distrato/termo-distrato-email-form/termo-distrato-email-form.component';
import { DentistaComponent } from './dentista.component';
import { DentistaContratoHistoricoComponent } from './dentista-contrato/dentista-contrato-historico/dentista-contrato-historico.component';
import { DentistaTermoDistratoHistoricoComponent } from './dentista-termo-distrato/dentista-termo-distrato-historico/dentista-termo-distrato-historico.component';

@NgModule({
  declarations: [
    DentistaComponent,
    DentistaFormComponent,
    DentistaAlterarStatusComponent,
    DentistaIndicadoresComponent,
    DentistaFolhaPagamentoComponent,
    DentistaFeriasComponent,
    FeriasAlterarStatusComponent,
    DentistaFeriasFormComponent,
    DentistaFeriasIndicadoresComponent,
    DentistaContratoComponent,
    ContratoEmailFormComponent,
    DentistaTermoDistratoComponent,
    TermoDistratoEmailFormComponent,
    DentistaRegistroFaltasComponent,
    AdicionarFaltaFormComponent,
    DentistaDetalhesFaltaComponent,
    FolhaPagamentoPacientesComponent,
    FolhaPagamentoIndicadoresComponent,
    DentistaContratoHistoricoComponent,
    DentistaTermoDistratoHistoricoComponent,

  ],
  imports: [
    SharedModule,
    DentistaRoutingModule,
    MatExpansionModule
  ]
})
export class DentistaModule { }
