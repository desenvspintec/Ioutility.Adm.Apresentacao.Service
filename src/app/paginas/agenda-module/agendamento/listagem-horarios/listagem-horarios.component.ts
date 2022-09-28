import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listagem-horarios',
  templateUrl: './listagem-horarios.component.html',
  styleUrls: ['./listagem-horarios.component.scss'],
})
export class ListagemHorariosComponent implements OnInit {
  constructor() {}

  dentistas: any[] = [
    {
      nome: 'Dr. Sergio',
      paciente: 'Joao',
      horarioAtendimento: '09:00',
    },
    {
      nome: 'Dr. Maria',
      paciente: 'Larissa',
      horarioAtendimento: '10:00',
    },
    {
      nome: 'Dr. Albertina',
      paciente: 'Cleber',
      horarioAtendimento: '11:00',
    },
  ];

  horariosAtendimento: String[] = [
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
  ];

  ngOnInit(): void {}

  exibirApenasHorarioDoDentistaEspecifico(dentista: any, dentistaHorario: string): boolean {
    if (dentista.horarioAtendimento === dentistaHorario) return true;

    return false;
  }

  verificarHoraDoAtendimento(horario: any): string {
    for (let dentista of this.dentistas) {
      if (dentista.horarioAtendimento === horario) {
        return `${dentista.horarioAtendimento}`;
      }
    }
    return '';
  }
}
